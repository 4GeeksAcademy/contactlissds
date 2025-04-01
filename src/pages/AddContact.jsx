import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const AddContact = () => {
  const { dispatch } = useGlobalReducer(); // Acceder a dispatch desde el contexto global
  const [contact, setContact] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    fetch("https://playground.4geeks.com/contact/agendas/pedro", {
      method: "PUT",  
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "ADD_CONTACT", payload: data });  // Actualiza el estado global
      })
      .catch((error) => {
        console.error("Error al actualizar el contacto:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default AddContact;
