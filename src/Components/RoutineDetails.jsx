import { useRef, useState } from 'react'
import { useRoutinesContext } from '../hooks/useRoutinesContext'
import { formatDistanceToNow } from 'date-fns'
import { useAuthContext } from '../hooks/useAuthContext'

const RoutineDetails = ({ routine }) => {
    const { dispatch } = useRoutinesContext()
    const { user } = useAuthContext()

    const [editMode, setEditMode] = useState(false); // Control edit mode
    const [title, setTitle] = useState(routine.title); // Control title input
    const [routineData, setRoutineData] = useState({
        _id: routine._id,
        title: routine.title,
        exercises: [...routine.exercises], // Create a copy to edit
        createdAt: routine.createdAt,
    });

    const modalRef = useRef(null)

    const openModal = () => {
        modalRef.current.classList.add('is-active')
        document.documentElement.classList.add('is-clipped')
    }

    const closeModal = () => {
        modalRef.current.classList.remove('is-active')
        document.documentElement.classList.remove('is-clipped')
    }

    // editing

    const handleEdit = () => {
        setEditMode(true);
        openModal();
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setRoutineData({ ...routineData, title: e.target.value });
    };

    const handleExerciseChange = (e, exerciseIndex) => {
        const updatedExercises = [...routineData.exercises];
        updatedExercises[exerciseIndex][e.target.name] = e.target.value;
        setRoutineData({ ...routineData, exercises: updatedExercises });
        console.log(routine._id)
    };

    const [tempExercise, setTempExercise] = useState({ name: '', sets: 0, reps: 0 });
    const handleTempExerciseChange = (e) => {
        setTempExercise({
        ...tempExercise,
        [e.target.name]: e.target.value,
        });
    };

    const [error, setError] = useState(null);

    const addExercise = (e) => {
        e.preventDefault()

        if (!tempExercise.name || !tempExercise.sets || !tempExercise.reps) return setError('Please fill out all fields');

        setRoutineData({
            ...routineData,
            exercises: [
            ...routineData.exercises,
            tempExercise, // Add new exercise
            ],
        });

        setTempExercise({ name: '', sets: 0, reps: 0 });
    };

    const removeExercise = (e, exerciseIndex) => {
        e.preventDefault()
        e.stopPropagation()

        const updatedExercises = routineData.exercises.filter(
            (_, index) => index !== exerciseIndex
        );
        setRoutineData({ ...routineData, exercises: updatedExercises });
    };

    const handleSave = async (e) => {
        e.preventDefault()

        if (!user) return;

        console.log(routine._id)

        const response = await fetch('https://polar-plains-02584-00b5f84bf725.herokuapp.com/api/routines/' + routine._id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
            body: JSON.stringify(routineData),
        })

        if (response.ok) {
            const editAction = {
                type: 'EDIT_ROUTINE',
                payload: {
                    json: routineData
                }
            };

            dispatch(editAction); 
            
            setEditMode(false);
            closeModal();
        }
    };

    let timeAgo = 'Unknown'; 
    if (routine.createdAt) {  
        try { 
            timeAgo = formatDistanceToNow(new Date(routine.createdAt), { addSuffix: true }); 
        } catch (error) {
            console.error("Error formatting date:", error); 
        }
    } 

    //

    const handleDelete = async (e) => {
        e.preventDefault()

        if (!user) return

        const response = await fetch('https://polar-plains-02584-00b5f84bf725.herokuapp.com/api/routines/' + routine._id, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${user.token}` },
        })

        const json = await response.json()

        if (response.ok) dispatch({ type: 'DELETE_ROUTINE', payload: json })
    }

    return (
        <>
            <div className="routine-details">
                <div className='top'>
                    <p className='title'>{routine.title}</p>
                    <p>{timeAgo}</p>
                </div>
                <div className='exercises'>
                    <ul>
                        {routine.exercises.map((exercise, index) => (
                            <li key={index}>
                                <strong>{exercise.name}</strong> - {exercise.sets} sets, {exercise.reps} reps
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='buttons'>
                    <button className="is-info button outlined colored" onClick={handleEdit}>
                        EDIT
                    </button>
                    <button className="is-danger button" onClick={handleDelete}>
                        DELETE
                    </button>
                </div>
            </div>
            <div className={"modal " + (editMode ? 'active' : '')} ref={modalRef}>
                <p className='close' onClick={closeModal}><i className="bx bx-x"></i></p>
                <div className='box'>
                    <div>
                        <form>
                            <div className="field heading">Edit Routine</div>
                            <div className="field label">Routine Name</div>
                            <div className='field'>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => handleTitleChange(e)}
                                />
                            </div>
                            <div className="field label">Exercises</div>
                            {routineData.exercises.map((exercise, exerciseIndex) => (
                                <div className='field inputs' key={exerciseIndex}>
                                    <input
                                        type="text"
                                        value={exercise.name}
                                        name="name"
                                        onChange={(e) => handleExerciseChange(e, exerciseIndex)}
                                    />
                                    <input
                                        type="number"
                                        value={exercise.sets}
                                        name="sets"
                                        onChange={(e) => handleExerciseChange(e, exerciseIndex)}
                                    />
                                    <input
                                        type="number"
                                        value={exercise.reps}
                                        name="reps"
                                        onChange={(e) => handleExerciseChange(e, exerciseIndex)}
                                    />
                                    <button className='button icon' onClick={(e) => removeExercise(e, exerciseIndex)}>
                                        <i className='bx bx-x'></i>
                                    </button>
                                </div>
                            ))}
                            <div className='field inputs'>
                                <input
                                    type="text"
                                    placeholder="Exercise name"
                                    value={tempExercise.name}
                                    name="name"
                                    onChange={(e) => handleTempExerciseChange(e)}
                                />
                                <input
                                    type="number"
                                    placeholder="Sets"
                                    value={tempExercise.sets}
                                    name="sets"
                                    onChange={(e) => handleTempExerciseChange(e)}
                                />
                                <input
                                    type="number"
                                    placeholder="Reps"
                                    value={tempExercise.reps}
                                    name="reps"
                                    onChange={(e) => handleTempExerciseChange(e)}
                                />
                                <button className='button icon' onClick={addExercise}>
                                    <i className='bx bx-plus'></i>
                                </button>
                            </div>
                            <div>
                                <button className='button colored' onClick={handleSave}>Save</button>
                            </div>
                            <div>
                                {error && <p>{error}</p>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RoutineDetails

/*
[
    {"id": 0, "title": "Situps", "sets": 3, "reps": 10}
  ]
  */
