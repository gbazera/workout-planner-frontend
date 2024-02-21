import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link to={'/'} className="navbar-item subtitle">
                    Workout Planner
                </Link>
            </div>
        </nav>
    )
}

export default Navbar
