import React, { useState, useEffect } from "react";

export const Contact = () => {
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [contacts, setContacts] = useState([]);
  const [agendaName, setAgendaName] = useState("pedro"); // Cambiar según el usuario
  const [errorMessage, setErrorMessage] = useState(""); // Para manejar mensajes de error

  // Cargar los contactos desde la API cuando el componente se monta
  useEffect(() => {
    fetchContacts();
  }, [agendaName]);

  const fetchContacts = async () => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/${agendaName}`
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Contactos cargados:", data.contacts); // Verificar los contactos que se están obteniendo
        setContacts(data.contacts); // Establecer contactos si la solicitud fue exitosa
      } else {
        console.error("Error al cargar los contactos:", data);
        setErrorMessage(data.detail || "Hubo un error al cargar los contactos.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setErrorMessage("Error en la solicitud. Intenta nuevamente.");
    }
  };

  const handleInputChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    console.log("Datos del nuevo contacto:", newContact); // Depuración para verificar si los datos son correctos

    // Validar los campos antes de enviar
    if (!newContact.name || !newContact.phone || !newContact.email || !newContact.address) {
      alert("Por favor, rellena todos los campos.");
      return;
    }

    const requestBody = { ...newContact };

    try {
      // Verificar si la agenda ya existe
      const agendaCheckResponse = await fetch(
        `https://playground.4geeks.com/contact/agendas/${agendaName}`
      );
      const agendaCheckData = await agendaCheckResponse.json();

      if (!agendaCheckResponse.ok) {
        alert(`La agenda "${agendaName}" no existe.`);
        return;
      }

      // Si la agenda existe, agregamos el contacto
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

      const data = await response.json(); // Obtener la respuesta como JSON

      if (response.ok) {
        console.log("Contacto agregado:", data);
        // Agregar contacto directamente al estado sin hacer una nueva solicitud
        setContacts([...contacts, data.contact]);
        setNewContact({ name: "", phone: "", email: "", address: "" });
      } else {
        console.error("Error al agregar el contacto:", data); // Mostrar el error de la API
        alert("Hubo un error al agregar el contacto: " + data.detail); // Mostrar el detalle del error
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

      const data = await response.json(); // Agregar también await response.json() aquí para manejar errores

      if (response.ok) {
        console.log("Contacto eliminado:", data);
        // Eliminar contacto directamente del estado
        setContacts(contacts.filter((contact) => contact.id !== id));
      } else {
        console.error("Error al eliminar el contacto:", data); // Usar 'data' aquí también
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

      {/* Mostrar mensaje de error si la agenda no existe */}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

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
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <li key={contact.id}>
              <strong>{contact.name.split(" ")[0]}</strong> - {contact.phone} - {contact.email} - {contact.address}
              <button
                onClick={() => handleDeleteContact(contact.id)}
                className="btn btn-danger ml-2"
              >
                Eliminar
              </button>
            </li>
          ))
        ) : (
          <p>No hay contactos disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default Contact;
