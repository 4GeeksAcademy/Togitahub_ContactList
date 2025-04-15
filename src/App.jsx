import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ContactProvider } from "./context/ContactContext";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";

function App() {
    useEffect(() => {
        const createAgenda = async () => {
            try {
                const response = await fetch("https://playground.4geeks.com/contact/agendas/oscar");
                if (response.ok) {
                    console.log("La agenda ya existe")
                } else if (response.status === 404) {
                    const createResponse = await fetch(
                        `https://playground.4geeks.com/contact/agendas/oscar`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(),
                        }
                    );
                    if (createResponse.ok) {
                        console.log('Agenda creada correctamente');
                    } else {
                        console.error(`Error al crear la agenda: ${createResponse.statusText}`);
                    }
                } else {
                    console.error(`Erro al verificar agenda: ${response.statusText}`)
                }
            } catch (error) {
                console.error(`Error en la solicitud: ${error.message}`)
            }
        }
        createAgenda();
    }, [])

    return (
        <ContactProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<ContactList />} />
                    <Route path="/add-contact" element={<AddContact />} />
                    <Route path="/edit-contact/:id" element={<EditContact />} />
                </Routes>
            </Router>
        </ContactProvider>
    );
}

export default App;
