import { useState } from 'react'
import { useRoutinesContext } from '../hooks/useRoutinesContext'

const RoutineForm = () => {
    const { dispatch } = useRoutinesContext()
    const [title, setTitle] = useState('')
    const exercises = []

    const [error, setError] = useState(null)

    const [titleEmpty, setTitleEmpty] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const routine = { title, exercises }

        const response = await fetch('/api/routines', {
            method: 'POST',
            body: JSON.stringify(routine),
            headers: {
                'Content-Type': 'application/json',
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
            console.log('new routine added.')
            dispatch({ type: 'CREATE_ROUTINE', payload: json })
        }
    }

    return (
        <form className="create section" onSubmit={handleSubmit}>
            <h3>Add a new routine</h3><br />

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

            <div className="control">
                <button className="button is-primary">Create</button>
            </div>
        </form>
    )
}

export default RoutineForm
