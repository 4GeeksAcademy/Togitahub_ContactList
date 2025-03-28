import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContactContext } from "../context/ContactContext";
import { createContact } from "../utils/api";

const AddContact = () => {
    const navigate = useNavigate();
    const { dispatch } = useContactContext();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "El nombre es requerido";
        if (!formData.email) newErrors.email = "El email es requerido";
        if (!formData.phone) newErrors.phone = "El teléfono es requerido";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const newContact = await createContact(formData);
                dispatch({
                    type: "ADD_CONTACT",
                    payload: newContact,
                });
                navigate("/");
            } catch (error) {
                console.error("Error al crear contacto:", error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Agregar Nuevo Contacto</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Nombre
                    </label>
                    <input
                        type="text"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                        Teléfono
                    </label>
                    <input
                        type="tel"
                        className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    {errors.phone && (
                        <div className="invalid-feedback">{errors.phone}</div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                        Dirección
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Guardar Contacto
                </button>
                <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => navigate("/")}
                >
                    Cancelar
                </button>
            </form>
        </div>
    );
};

export default AddContact;
