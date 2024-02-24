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
        <form onSubmit={handleSubmit} className="auth">
            <div className="field heading">Sign Up</div>

            <div className="field label">Email</div>
            <div className='field'>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </div>
            <div className="field label">Password</div>
            <div className='field'>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </div>

            <div className='field'>
                <button className={(isLoading ? 'is-loading' : '') + 'button colored'}>
                    Sign Up
                </button>
            </div>
            <div className='field error'>
                {error && <p className='error'>{error}</p>}
            </div>
        </form>
    )
}

export default Signup
