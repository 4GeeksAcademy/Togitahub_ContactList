import React, { createContext, useReducer, useContext } from "react";
import { contactReducer, initialState } from "./ContactReducer";

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
    const [state, dispatch] = useReducer(contactReducer, initialState);

    return (
        <ContactContext.Provider value={{ state, dispatch }}>
            {children}
        </ContactContext.Provider>
    );
};

export const useContactContext = () => useContext(ContactContext);
