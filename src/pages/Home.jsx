import { useEffect, useState } from 'react'

import RoutineDetails from '../Components/RoutineDetails'

const Home = () => {
    const [routines, setRoutines] = useState(null)

    useEffect(() => {
        const fetchRoutines = async () => {
            const response = await fetch('/api/routines/')
            const json = await response.json()

            if (response.ok) {
                setRoutines(json)
            }
        }

        fetchRoutines()
    }, [])

    return (
        <div className="home">
            <div className="routines">
                {routines &&
                    routines.map((r) => (
                        <RoutineDetails key={r._id} routine={r} />
                    ))}
            </div>
        </div>
    )
}

export default Home
