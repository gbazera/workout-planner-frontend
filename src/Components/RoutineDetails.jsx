const RoutineDetails = ({ routine }) => {
    return (
        <div className="routine-details">
            <h4>{routine.title}</h4>
            <ul>
                {routine.exercises.map((exercise) => (
                    <li key={exercise.id}>
                        <strong>{exercise.title}</strong> Sets: {exercise.sets} Reps: {exercise.reps}
                    </li>
                ))}
            </ul>
            {routine.createdAt}
        </div>
    )
}

export default RoutineDetails
