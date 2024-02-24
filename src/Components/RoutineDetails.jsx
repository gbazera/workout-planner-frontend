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

        const response = await fetch('https://workout-planner-backend-12oe.onrender.com/api/routines/' + routine._id, {
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

        const response = await fetch('https://workout-planner-backend-12oe.onrender.com/api/routines/' + routine._id, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${user.token}` },
        })

        const json = await response.json()

        if (response.ok) dispatch({ type: 'DELETE_ROUTINE', payload: json })
    }

    return (
        <>
            <div className="routine-details box">
                <div
                    className="level"
                    onClick={openModal}
                    style={{ cursor: 'pointer' }}
                >
                    <p>{routine.title}</p>
                    <p>
                        {timeAgo}
                    </p>
                </div>
                <div className="block">
                    <ul>
                        {routine.exercises.map((exercise, index) => (
                            <li key={index} className='notification' style={{backgroundColor: 'transparent'}}>
                                <strong>{exercise.name}</strong> - {exercise.sets} sets, {exercise.reps} reps
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="field is-grouped">
                    <p className="control">
                        <button
                            className="button is-info is-outlined"
                            onClick={handleEdit}
                        >
                            EDIT
                        </button>
                    </p>
                    <p className="control">
                        <button
                            className="button is-danger is-outlined"
                            onClick={handleDelete}
                        >
                            DELETE
                        </button>
                    </p>
                </div>
            </div>
            <div className={`modal ${editMode ? 'is-active' : ''}`} ref={modalRef}>
                <div className="modal-background" onClick={closeModal}></div>
                <div className="modal-content">
                    <div className="box">
                        <p className="subtitle">Edit Routine</p>
                        <form>
                            <div className="field">
                                <label className="label">Routine Name</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={title}
                                        onChange={(e) => handleTitleChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Exercises</label>
                            </div>
                            {routineData.exercises.map((exercise, exerciseIndex) => (
                                <div className="field has-addons" key={exerciseIndex}>
                                    <div className="control is-expanded">
                                        <input
                                            className="input"
                                            type="text"
                                            value={exercise.name}
                                            name="name"
                                            onChange={(e) => handleExerciseChange(e, exerciseIndex)} 
                                        />
                                    </div>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="number"
                                            value={exercise.sets}
                                            name="sets"
                                            onChange={(e) => handleExerciseChange(e, exerciseIndex)} 
                                        />
                                    </div>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="number"
                                            value={exercise.reps}
                                            name="reps"
                                            onChange={(e) => handleExerciseChange(e, exerciseIndex)} 
                                        />
                                    </div>
                                    <div className="control">
                                        <button
                                        className="button is-danger"
                                        onClick={(e) => removeExercise(e, exerciseIndex)}
                                        >
                                            <i className='bx bx-minus'></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="field has-addons">
                                <div className="control is-expanded">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Exercise name"
                                        value={tempExercise.name}
                                        name="name"
                                        onChange={(e) => handleTempExerciseChange(e)} 
                                    />
                                </div>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="number"
                                        placeholder="Sets"
                                        value={tempExercise.sets}
                                        name="sets"
                                        onChange={(e) => handleTempExerciseChange(e)} 
                                    />
                                </div>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="number"
                                        placeholder="Reps"
                                        value={tempExercise.reps}
                                        name="reps"
                                        onChange={(e) => handleTempExerciseChange(e)} 
                                    />
                                </div>
                                <div className="control">
                                    <button className="button is-primary" onClick={addExercise}>
                                        <i className='bx bx-plus'></i>
                                    </button>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button className="button is-primary" onClick={handleSave}>
                                    Save
                                    </button>
                                </div>
                            </div>
                            <div className="field">
                                {error && <p className="help is-danger">{error}</p>}
                            </div>
                        </form>
                    </div>
                </div>
                <button
                    className="modal-close is-large"
                    aria-label="close"
                    onClick={closeModal}
                ></button>
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
