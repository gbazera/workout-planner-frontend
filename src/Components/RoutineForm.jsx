import { useState } from 'react'
import { useRoutinesContext } from '../hooks/useRoutinesContext'
import { useAuthContext } from '../hooks/useAuthContext'

const RoutineForm = () => {
    const { dispatch } = useRoutinesContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [exercises, setExercises] = useState([])
    const [newExercise, setNewExercise] = useState({
        name: '',
        sets: '',
        reps: '',
    })

    const [error, setError] = useState(null)

    const [titleEmpty, setTitleEmpty] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in.')
            return
        }

        // Validate title
        if (!title.trim()) {
            setTitleEmpty(true)
            setError('Please enter a routine name.')
            return
        }

        // Validate exercises
        if (exercises.length === 0) {
            setError('Please add at least one exercise.')
            return
        }

        const routine = { title, exercises }

        const response = await fetch(
            'https://polar-plains-02584-00b5f84bf725.herokuapp.com/api/routines',
            {
                method: 'POST',
                body: JSON.stringify(routine),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            }
        )

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setTitleEmpty(true)
        }

        if (response.ok) {
            setTitle('')
            setError(null)
            setTitleEmpty(false)
            setExercises([]) // Clear exercises after successful creation
            console.log('new routine added.')
            dispatch({ type: 'CREATE_ROUTINE', payload: json })
        }
    }

    const handleAddExercise = (e) => {
        e.preventDefault()

        const { name, sets, reps } = newExercise
        if (!name.trim() || !sets.trim() || !reps.trim()) {
            setError('Please fill in all exercise details.')
            return
        }

        setExercises([...exercises, newExercise])
        setNewExercise({ name: '', sets: '', reps: '' })
        setError(null)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewExercise({ ...newExercise, [name]: value })
    }

    const removeExercise = (index) => {
        setExercises(exercises.filter((_, i) => i !== index))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='field heading'>
                Add a new routine
            </div>

            <div className="field label">
                Routine Name
            </div>
            <div className='field'>
                <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className={titleEmpty ? 'is-danger' : ''}
                />
            </div>
            <div className="field.error">
                <p className="error">{error && <p>{error}</p>}</p>
            </div>

            <div className='field label'>
                Exercises
            </div>

            {exercises.map((exercise, index) => (
                <div key={exercise.name} className='field preview'>
                    <strong style={{ fontWeight: 'normal' }}>
                        {exercise.name}
                    </strong>{' '}
                    {exercise.sets} sets, {exercise.reps} reps
                    <button onClick={() => removeExercise(index)}>
                        Remove
                    </button>
                </div>
            ))}

            <div className='field inputs'>
                <input
                    type="text"
                    placeholder="Exercise name"
                    name="name"
                    value={newExercise.name}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    placeholder="Sets"
                    name="sets"
                    value={newExercise.sets}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    placeholder="Reps"
                    name="reps"
                    value={newExercise.reps}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddExercise}>+</button>
            </div>

            <div className='field'>
                <button className='button colored'>Create</button>
            </div>
        </form>
    )
}

export default RoutineForm
