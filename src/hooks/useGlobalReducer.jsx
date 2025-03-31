import { useContext, useReducer, createContext } from "react";
import {storeReducer,  initialStore } from "../store"; // Importa el reducer y el estado inicial

// Crea el contexto global
const StoreContext = createContext();

// Proveedor del contexto
export function StoreProvider({ children }) {
    // Inicializa el reducer con el estado inicial
    const [store, dispatch] = useReducer(storeReducer, initialStore());
    
    return (
        <StoreContext.Provider value={{ store, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
}

// Hook personalizado para acceder al estado global
export function useGlobalReducer() {
    return useContext(StoreContext);
}
