import { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e)=>{
        e.preventDefault();

        console.log(email, ':', password)
    }

    return(
        <form onSubmit={handleSubmit} className='section is-flex is-flex-direction-column is-align-items-center'>
            <div className="field">
                <p className="subtitle">Login</p>
            </div>

            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" type="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                </div>
                <p class="help is-danger">Error</p>
            </div>

            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input class="input" type="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
                </div>
                <p class="help is-danger">Error</p>
            </div>

            <div class="field">
                <div class="control">
                    <button class="button is-primary">Login</button>
                </div>
            </div>
        </form>
    )
}

export default Login;