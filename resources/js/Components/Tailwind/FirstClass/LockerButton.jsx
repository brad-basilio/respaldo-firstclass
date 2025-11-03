import { useState } from "react";
import LockerRequestModal from "./LockerRequestModal";

/**
 * Componente reutilizable para botones de apertura de casillero
 * Similar a AdvisorButton pero abre el modal de solicitud de casillero
 * 
 * @param {Object} props
 * @param {string} props.className - Clases CSS personalizadas para el botón
 * @param {React.ReactNode} props.children - Contenido personalizado del botón
 * @param {Function} props.onClick - Función adicional onClick (opcional)
 */
const LockerButton = ({ className = "", children, onClick }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = (e) => {
        // Si hay onClick personalizado, ejecutarlo primero
        if (onClick) {
            onClick(e);
        }
        
        // Abrir modal
        setIsModalOpen(true);
    };

    return (
        <>
            <button
                onClick={handleClick}
                className={className}
                aria-label="Abrir casillero virtual"
            >
                {children}
            </button>
            
            <LockerRequestModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </>
    );
};

export default LockerButton;
