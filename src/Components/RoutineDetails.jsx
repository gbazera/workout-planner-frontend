import { useEffect, useRef, useState } from 'react'
import { useRoutinesContext } from '../hooks/useRoutinesContext'
import { formatDistanceToNow } from 'date-fns'
import { useAuthContext } from '../hooks/useAuthContext'

const RoutineDetails = ({ routine }) => {
    const { dispatch } = useRoutinesContext()
    const { user } = useAuthContext()

    const modalRef = useRef(null)

    const openModal = () => {
        modalRef.current.classList.add('is-active')
        document.documentElement.classList.add('is-clipped')
    }

    const closeModal = () => {
        modalRef.current.classList.remove('is-active')
        document.documentElement.classList.remove('is-clipped')
    }

    const handleDelete = async () => {
        if (!user) return

        const response = await fetch('/api/routines/' + routine._id, {
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
                        {formatDistanceToNow(new Date(routine.createdAt), {
                            addSuffix: true,
                        })}
                    </p>
                </div>
                <div className="block">
                    <ul>
                        {routine.exercises.map((exercise) => (
                            <li key={exercise.name}>
                                <strong>{exercise.name}</strong> - {exercise.sets} sets, {exercise.reps} reps
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="field is-grouped">
                    <p className="control">
                        <button
                            className="button is-info is-outlined"
                            onClick={openModal}
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
            <div className="modal" ref={modalRef}>
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
                                        defaultValue={routine.title}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Exercises</label>
                            </div>
                            {routine.exercises.map((exercise) => (
                                <div className="field" key={exercise.id}>
                                    <div className="control is-expanded">
                                        <input
                                            className="input"
                                            type="text"
                                            value={exercise.name}
                                        />
                                    </div>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="number"
                                            value={exercise.sets}
                                        />
                                    </div>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="number"
                                            value={exercise.reps}
                                        />
                                    </div>
                                </div>
                            ))}
                            <div className="field has-addons">
                                <div className="control is-expanded">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Exercise name"
                                    />
                                </div>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="number"
                                        placeholder="Sets"
                                    />
                                </div>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="number"
                                        placeholder="Reps"
                                    />
                                </div>
                                <div className="control">
                                    <button className="button is-primary">+</button>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button className="button is-primary">
                                        Save
                                    </button>
                                </div>
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
