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
        <form onSubmit={handleSubmit} className="auth">
            <div className='field heading'>
                Login
            </div>
            <div className="field label">
                Email
            </div>
            <div className='field'>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </div>
            <div className="field label">
                Password
            </div>
            <div className='field'>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </div>

            <div className='field'>
                <button className={(isLoading ? 'is-loading' : '') + 'button colored'}>
                    Login
                </button>
            </div>
            <div className='field error'>
                {error && <p className='error'>{error}</p>}
            </div>
        </form>
    )
}

export default Login
