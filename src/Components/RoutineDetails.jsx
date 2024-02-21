import { useRoutinesContext } from "../hooks/useRoutinesContext"
import { formatDistanceToNow } from "date-fns"

const RoutineDetails = ({ routine }) => {
    const {dispatch} = useRoutinesContext()

    const handleClick=async()=>{
        const response = await fetch('/api/routines/' + routine._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_ROUTINE', payload: json})
        }
    }

    return (
        <div className="routine-details box">
            <div className="level">
                <p>{routine.title}</p>
                <p>{formatDistanceToNow(new Date(routine.createdAt), {addSuffix: true})}</p>
            </div>
            <div className="block">
                <ul>
                    {routine.exercises.map((exercise) => (
                        <li key={exercise.id}>
                            <strong>{exercise.title}</strong> Sets: {exercise.sets} Reps: {exercise.reps}
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="field is-grouped">
                <p className="control">
                    <button className="button is-info is-outlined">EDIT</button>
                </p>
                <p className="control">
                    <button className="button is-danger is-outlined" onClick={handleClick}>DELETE</button>
                </p>
            </div>
        </div>
    )
}

export default RoutineDetails
