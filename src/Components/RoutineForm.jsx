import { useState } from 'react'
import { useRoutinesContext } from '../hooks/useRoutinesContext'
import { useAuthContext } from '../hooks/useAuthContext'

const RoutineForm = () => {
    const { dispatch } = useRoutinesContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [exercises, setExercises] = useState([]);
    const [newExercise, setNewExercise] = useState({
        name: '',
        sets: '',
        reps: '',
    });

    const [error, setError] = useState(null)

    const [titleEmpty, setTitleEmpty] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user){
            setError('You must be logged in.')
            return
        }

        // Validate title
        if (!title.trim()) {
            setTitleEmpty(true);
            setError('Please enter a routine name.');
            return;
        }
    
        // Validate exercises
        if (exercises.length === 0) {
            setError('Please add at least one exercise.');
            return;
        }

        const routine = { title, exercises }

        const response = await fetch('/api/routines', {
            method: 'POST',
            body: JSON.stringify(routine),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setTitleEmpty(true)
        }

        if (response.ok) {
            setTitle('')
            setError(null)
            setTitleEmpty(false)
            setExercises([]); // Clear exercises after successful creation
            console.log('new routine added.')
            dispatch({ type: 'CREATE_ROUTINE', payload: json })
        }
    }

    const handleAddExercise = (e) => {
        e.preventDefault();

        const { name, sets, reps } = newExercise;
        if (!name.trim() || !sets.trim() || !reps.trim()) {
            setError('Please fill in all exercise details.');
            return;
        }

        setExercises([...exercises, newExercise]);
        setNewExercise({ name: '', sets: '', reps: '' });
        setError(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewExercise({ ...newExercise, [name]: value });
    };

    const removeExercise = (index) => {
        setExercises(exercises.filter((_, i) => i !== index));
    };

    return (
        <form className="create section" onSubmit={handleSubmit}>
            <div className="field">
                <h3>Add a new routine</h3>
            </div><br />
            
            <div className="field">
                <label className="label">Routine Name</label>
                <div className="control">
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        className={(titleEmpty ? 'is-danger ' : '') + 'input'}
                    />
                    {error && <p className="help is-danger">{error}</p>}
                </div>
            </div>

            <div className="field"><label className="label">Exercises</label></div>
            {exercises.map((exercise, index) => (
                <div className="field level" key={exercise.name}>
                    <strong style={{fontWeight: 'normal'}}>{exercise.name}</strong> {exercise.sets} sets, {exercise.reps} reps
                    <button className='button is-danger is-small' onClick={() => removeExercise(index)}>Remove</button>
                </div>
            ))}
            <div className="field has-addons">
                <div className="control is-expanded">
                    <input
                        className="input"
                        type="text"
                        placeholder="Exercise name"
                        name="name"
                        value={newExercise.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="control">
                    <input
                        className="input"
                        type="number"
                        placeholder="Sets"
                        name="sets"
                        value={newExercise.sets}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="control">
                    <input
                        className="input"
                        type="number"
                        placeholder="Reps"
                        name="reps"
                        value={newExercise.reps}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="control">
                    <button className="button is-primary" onClick={handleAddExercise}>+</button>
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <button className="button is-primary">Create</button>
                </div>
            </div>
        </form>
    )
}

export default RoutineForm
