import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContactContext } from "../context/ContactContext";
import { fetchContacts } from "../utils/api";
import ContactCard from "./ContactCard";

const ContactList = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useContactContext();

    useEffect(() => {
        const loadContacts = async () => {
            dispatch({ type: "FETCH_CONTACTS_START" });
            try {
                const contactsData = await fetchContacts();
                dispatch({
                    type: "FETCH_CONTACTS_SUCCESS",
                    payload: contactsData.contacts,
                });
            } catch (error) {
                dispatch({
                    type: "FETCH_CONTACTS_ERROR",
                    payload: error.message,
                });
            }
        };

        loadContacts();
    }, [dispatch]);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Lista de Contactos</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/add-contact")}
                >
                    Agregar Contacto
                </button>
            </div>

            {state.loading && (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            )}

            {state.error && <div className="alert alert-danger">{state.error}</div>}

            <div className="row">
                {state.contacts.map((contact) => (
                    <ContactCard key={contact.id} contact={contact} />
                ))}
            </div>
        </div>
    );
};

export default ContactList;
