import { createContext, useReducer } from 'react'

export const RoutinesContext = createContext()

export const routinesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ROUTINES':
            return {
                routines: action.payload,
            }
        case 'CREATE_ROUTINE':
            return {
                routines: [action.payload, ...state.routines],
            }
        case 'DELETE_ROUTINE':
            return {
                routines: state.routines.filter(
                    (r) => r._id !== action.payload._id
                ),
            }
        // case 'EDIT_ROUTINE':
        //     return {
        //         ...state, 
        //         routines: state.routines.map(routine => routine._id === action.payload._id ? action.payload.json : routine)
        //     }
        case 'EDIT_ROUTINE':
            return {
                ...state,
                routines: state.routines.map((r) =>
                    r._id === action.payload.json._id ? action.payload.json : r
                ),
            }
        
        default:
            return state
    }
}

export const RoutinesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(routinesReducer, {
        routines: null,
    })

    return (
        <RoutinesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </RoutinesContext.Provider>
    )
}
