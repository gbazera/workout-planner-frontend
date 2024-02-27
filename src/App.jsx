import { BrowserRouter, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './Components/Navbar'

import RouteWithTitle from './Components/RouteWithTitle'

function App() {
    const { user } = useAuthContext()

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />

                <div className="pages">
                    <Routes>
                        <RouteWithTitle title='Workout Planner' path="/" element={user ? <Home /> : <Navigate to='/login' />} />
                        <RouteWithTitle title='Login - Workout Planner' path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
                        <RouteWithTitle title='Signup - Workout Planner' path="/signup" element={!user ? <Signup /> : <Navigate to='/' />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App
