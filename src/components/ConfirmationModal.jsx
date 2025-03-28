import React from "react";

const ConfirmationModal = ({ show, onClose, onConfirm, title, message }) => {
    // Si no está mostrado, no renderizar nada
    if (!show) return null;

    const handleBackgroundClick = (e) => {
        // Evitar que el clic en el fondo del modal cierre el modal
        e.stopPropagation();
    };

    const handleConfirm = () => {
        onConfirm();
        onClose(); // Cerrar el modal después de confirmar
    };

    return (
        <div
            className="modal-backdrop"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1050,
            }}
            onClick={onClose} // Cerrar modal al hacer clic fuera
        >
            <div
                className="modal-dialog"
                onClick={handleBackgroundClick} // Prevenir cierre al hacer clic dentro del modal
                style={{
                    maxWidth: "500px",
                    width: "100%",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    padding: "20px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handleConfirm}
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
