import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContactContext } from "../context/ContactContext";
import { deleteContact } from "../utils/api";
import ConfirmationModal from "./ConfirmationModal";

const ContactCard = ({ contact }) => {
    const navigate = useNavigate();
    const { dispatch } = useContactContext();
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteContact(contact.id);
            dispatch({
                type: "DELETE_CONTACT",
                payload: contact.id,
            });
        } catch (error) {
            console.error("Error al eliminar contacto:", error);
        }
    };

    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{contact.name}</h5>
                    <p className="card-text">
                        <strong>Email:</strong> {contact.email}
                        <br />
                        <strong>Teléfono:</strong> {contact.phone}
                        <br />
                        <strong>Dirección:</strong> {contact.address}
                    </p>
                    <div className="d-flex justify-content-between">
                        <button
                            className="btn btn-warning"
                            onClick={() => navigate(`/edit-contact/${contact.id}`)}
                        >
                            Editar
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => setShowModal(true)}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>

            <ConfirmationModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
                title="Eliminar Contacto"
                message="¿Estás seguro de que deseas eliminar este contacto?"
            />
        </div>
    );
};

export default ContactCard;
