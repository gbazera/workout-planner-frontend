import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <nav>
            <Link to={'/'} className="logo">
                Workout Planner
            </Link>
            <div className="end">
                {user && (
                    <div className='item'>
                        <Link className='link'>{user.email}</Link>
                        <button onClick={handleClick}>Log out</button>
                    </div>
                )}
                {!user && (
                    <div className='item'>
                        <Link to={'/login'} className='button outlined'>Login</Link>
                        <Link to={'/signup'} className='button'>Sign up</Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
