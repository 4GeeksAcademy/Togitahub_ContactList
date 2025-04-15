const BASE_URL =
    "https://playground.4geeks.com/contact/agendas/oscar/contacts";

const checkAgendaExists = async () => {
    try {
        const response = await fetch(BASE_URL);
        return response.ok;
    } catch (error) {
        console.error("Error al verificar la agenda:", error);
        return false;
    }
}

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
    if (await checkAgendaExists()) {
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
    }else {
        console.error('La agenda no existe');
    }
};

export const updateContact = async (contactId, contactData) => {
    if (await checkAgendaExists()) {
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
    }else {
        console.error('La agenda ya existe');
    }
};

export const deleteContact = async (contactId) => {
    if (await checkAgendaExists()) {
        try {
            const response = await fetch(`${BASE_URL}/${contactId}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Error al eliminar contacto");
            return true;
        } catch (error) {
            throw error;
        }
    }else {
        console.error('La agenda no existe');
    }
};
