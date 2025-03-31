import { createContext, useReducer } from "react";

const ContactContext = createContext();


export const initialStore = {
  contacts: [],
};

const contactReducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTACTS":
      return { ...state, contacts: action.payload };
    case "ADD_CONTACT":
      return { ...state, contacts: [...state.contacts, action.payload] };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== action.payload),
      };
    default:
      return state;
  }
};

const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, initialStore); // Usar `initialStore` aquí

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
};

export { ContactContext, ContactProvider };
