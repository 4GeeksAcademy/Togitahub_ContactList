import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ContactProvider } from "./context/ContactContext";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";

function App() {
    // async function createAgenda(slug) {
    //     try {
    //         const response = await fetch(
    //             `https://playground.4geeks.com/contact/agendas/${slug}`,
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify(),
    //             }
    //         );
    //         if (!response.ok) {
    //             throw new Error("Error al crear la agenda: " + response.status);
    //         }
    //         const agenda = await response.json();
    //         console.log("Agenda creada correctamente: " + agenda);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // createAgenda('oscar');

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
