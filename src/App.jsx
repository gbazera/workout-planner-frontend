import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './Components/Navbar'

function App() {
    const { user } = useAuthContext()

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />

                <div className="pages">
                    <Routes>
                        <Route path="/" element={user ? (user.verified ? <Home /> : <div className='notification is-warning'>Your email is not verified.</div>) : <Navigate to='/login' />} />
                        <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
                        <Route path="/signup" element={!user ? <Signup /> : <Navigate to='/' />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App
