import { RoutinesContext } from "../context/RoutinesContext";
import { useContext } from "react";

export const useRoutinesContext = ()=>{
    const context = useContext(RoutinesContext)

    if(!context){
        throw Error('useRoutinesContext must be used inside a RoutinesContextProvider')
    }

    return context
}