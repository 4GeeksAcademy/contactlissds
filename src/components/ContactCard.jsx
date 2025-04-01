// ContactCard.jsx
import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const ContactCard = ({ contact }) => {
  const { dispatch } = useGlobalReducer();  // Acceder a dispatch desde el contexto global

  const handleDelete = () => {
    if (window.confirm("¿Seguro que quieres eliminar este contacto?")) {
      fetch(`https://playground.4geeks.com/contact/agendas/pedro`, {
        method: "DELETE",
      }).then(() => dispatch({ type: "DELETE_CONTACT", payload: contact.id }));
    }
  };

  return (
    <div>
      <h3>{contact.name}</h3>
      <p>{contact.email}</p>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
};

export default ContactCard;
