import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import ContactCard from "../components/ContactCard";

const Contact = () => {
  const { state, dispatch } = useGlobalReducer();

  useEffect(() => {
    fetch("https://playground.4geeks.com/contact")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "SET_CONTACTS", payload: data }));
  }, [dispatch]);

  return (
    <div>
      <h1>Lista de Contactos</h1>
      {state.contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
};

export default Contact;
