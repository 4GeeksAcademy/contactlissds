// useGlobalReducer.jsx
import { useContext } from "react";
import { ContactContext } from "../store"; // Asegúrate de que importes el contexto correcto

export function useGlobalReducer() {
  return useContext(ContactContext); // Usamos el contexto para acceder al estado y al dispatch
}
