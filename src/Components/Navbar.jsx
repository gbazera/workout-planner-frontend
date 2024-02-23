import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
    const { logout } = useLogout()

    const handleClick = () => {
        logout()
    }

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-start">
                <div className="navbar-brand">
                    <Link to={'/'} className="navbar-item subtitle">
                        Workout Planner
                    </Link>
                </div>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    <button
                        className="button is-danger is-outlined"
                        onClick={handleClick}
                    >
                        Log out
                    </button>
                </div>
                <div className="navbar-item">
                    <div className="buttons">
                        <Link to={'/login'} className="button is-light">
                            Login
                        </Link>
                        <Link to={'/signup'} className="button is-primary">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
