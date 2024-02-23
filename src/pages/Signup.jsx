import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, isLoading, error } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="section is-flex is-flex-direction-column is-align-items-center auth"
        >
            <div className="field">
                <p className="subtitle">Sign Up</p>
            </div>

            <div className="field">
                <label className="label">Email</label>
                <div className="control">
                    <input
                        className="input"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Password</label>
                <div className="control">
                    <input
                        className="input"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <button
                        className={
                            (isLoading ? 'is-loading ' : '') +
                            'button is-primary'
                        }
                    >
                        Sign Up
                    </button>
                </div>
            </div>
            <div className="field">
                {error && <p className="help is-danger">{error}</p>}
            </div>
        </form>
    )
}

export default Signup
