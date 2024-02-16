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
        <div className="routine-details" style={{padding: '20px', border: '1px black solid', margin: '20px'}}>
            <h4>{routine.title}</h4>
            <ul>
                {routine.exercises.map((exercise) => (
                    <li key={exercise.id}>
                        <strong>{exercise.title}</strong> Sets: {exercise.sets} Reps: {exercise.reps}
                    </li>
                ))}
            </ul>
            <p>{formatDistanceToNow(new Date(routine.createdAt), {addSuffix: true})}</p>
            <button onClick={handleClick}>DELETE</button>
        </div>
    )
}

export default RoutineDetails
