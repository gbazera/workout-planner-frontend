import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-start">
                <div className="navbar-brand">
                    <Link to={'/'} className="navbar-item subtitle">
                        Workout Planner
                    </Link>
                </div>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
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
