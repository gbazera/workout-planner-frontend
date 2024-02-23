import { useAuthContext } from './useAuthContext'
import { useRoutinesContext } from './useRoutinesContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useRoutinesContext()

    const logout = () => {
        localStorage.removeItem('user')

        dispatch({ type: 'LOGOUT' })
        workoutsDispatch({
            type: 'SET_ROUTINES',
            payload: null,
        })
    }

    return { logout }
}
