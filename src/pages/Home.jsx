import { useEffect } from 'react'
import { useRoutinesContext } from '../hooks/useRoutinesContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { Helmet } from 'react-helmet'

import RoutineDetails from '../Components/RoutineDetails'
import RoutineForm from '../Components/RoutineForm'

const Home = () => {
    const { routines, dispatch } = useRoutinesContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchRoutines = async () => {
            const response = await fetch('https://workout-planner-backend-12oe.onrender.com/api/routines/', {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })
            const json = await response.json()

            if (response.ok) dispatch({ type: 'SET_ROUTINES', payload: json })
        }

        if (user) fetchRoutines()
    }, [dispatch, user])

    return (
        <div className="home">
            <Helmet>
                <title>Workout Planner</title>
            </Helmet>
            <RoutineForm />
            <div className="routines">
                {routines &&
                    routines.map((r, i) => (
                        <RoutineDetails key={i} routine={r} />
                    ))}
            </div>
        </div>
    )
}

export default Home
