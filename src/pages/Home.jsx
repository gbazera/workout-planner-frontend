import { useEffect } from 'react'
import { useRoutinesContext } from '../hooks/useRoutinesContext'

import RoutineDetails from '../Components/RoutineDetails'
import RoutineForm from '../Components/RoutineForm'

const Home = () => {
    const {routines, dispatch} = useRoutinesContext()

    useEffect(() => {
        const fetchRoutines = async () => {
            const response = await fetch('/api/routines/')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_ROUTINES', payload: json})
            }
        }

        fetchRoutines()
    }, [dispatch])

    return (
        <div className="home">
            <RoutineForm />
            <div className="routines section">
                {routines &&
                    routines.map((r) => (
                        <RoutineDetails key={r._id} routine={r} />
                    ))}
            </div>
        </div>
    )
}

export default Home
