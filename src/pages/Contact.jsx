import React, { useState, useEffect } from "react";

export const Contact = () => {
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [contacts, setContacts] = useState([]);
  const [agendaName, setAgendaName] = useState("pedro"); 
  
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/${agendaName}`
      );
      const data = await response.json();
      if (response.ok) {
        setContacts(data.contacts); // Establecer contactos si la solicitud fue exitosa
      } else {
        console.error("Error al cargar los contactos:", data);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    // Validar los campos antes de enviar
    if (!newContact.name || !newContact.phone || !newContact.email || !newContact.address) {
      alert("Por favor, rellena todos los campos.");
      return;
    }

    const requestBody = { ...newContact };

    try {
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/${agendaName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Contacto agregado:", data);
        // Agregar contacto directamente al estado sin hacer una nueva solicitud
        setContacts([...contacts, data.contact]);
        setNewContact({ name: "", phone: "", email: "", address: "" });
      } else {
        console.error("Error al agregar el contacto:", await response.text());
        alert("Hubo un error al agregar el contacto.");
      }
    } catch (error) {
      console.error("Error al agregar contacto:", error);
      alert("Hubo un error al agregar el contacto.");
    }
  };

  const handleDeleteContact = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este contacto?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/${agendaName}/contacts/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Contacto eliminado");
        // Eliminar contacto directamente del estado
        setContacts(contacts.filter((contact) => contact.id !== id));
      } else {
        console.error("Error al eliminar el contacto:", await response.text());
        alert("Hubo un error al eliminar el contacto.");
      }
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
      alert("Hubo un error al eliminar el contacto.");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Agenda de Contactos</h1>

      {/* Formulario para agregar un nuevo contacto */}
      <form onSubmit={handleAddContact}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={newContact.name}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={newContact.phone}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={newContact.email}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={newContact.address}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-success">
          Agregar Contacto
        </button>
      </form>

      {/* Mostrar la lista de contactos */}
      <h2>Lista de Contactos</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <strong>{contact.name.split(" ")[0]}</strong> - {contact.phone} - {contact.email} - {contact.address}
            <button onClick={() => handleDeleteContact(contact.id)} className="btn btn-danger ml-2">
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contact;
