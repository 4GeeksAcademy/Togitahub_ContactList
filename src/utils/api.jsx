const BASE_URL =
    "https://playground.4geeks.com/contact/agendas/oscar/contacts";

export const fetchContacts = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) throw new Error("Error al obtener contactos");
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const createContact = async (contactData) => {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contactData),
        });
        if (!response.ok) throw new Error("Error al crear contacto");
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const updateContact = async (contactId, contactData) => {
    try {
        const response = await fetch(`${BASE_URL}/${contactId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contactData),
        });
        if (!response.ok) throw new Error("Error al actualizar contacto");
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const deleteContact = async (contactId) => {
    try {
        const response = await fetch(`${BASE_URL}/${contactId}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Error al eliminar contacto");
        return true;
    } catch (error) {
        throw error;
    }
};
