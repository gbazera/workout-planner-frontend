import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading, error } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="section is-flex is-flex-direction-column is-align-items-center auth"
        >
            <div className="field">
                <p className="subtitle">Login</p>
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
                        Login
                    </button>
                </div>
            </div>
            <div className="field">
                {error && <p className="help is-danger">{error}</p>}
            </div>
        </form>
    )
}

export default Login
