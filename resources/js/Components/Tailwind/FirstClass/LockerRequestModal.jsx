import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, User, Mail, Phone, CreditCard, MapPin, MessageSquare, CheckCircle, Loader } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LockerRequestsRest from "../../../Actions/LockerRequestsRest";

const lockerRequestsRest = new LockerRequestsRest();

/**
 * Modal para solicitar apertura de Casillero Virtual
 * Estilo similar a ContactGrid con formulario completo
 */
const LockerRequestModal = ({ isOpen, onClose }) => {
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const documentNumberRef = useRef();
    const addressRef = useRef();
    const cityRef = useRef();
    const departmentRef = useRef();
    const messageRef = useRef();

    const [sending, setSending] = useState(false);
    const [phoneValue, setPhoneValue] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [documentType, setDocumentType] = useState("DNI");
    const [successMessage, setSuccessMessage] = useState(false);

    // Departamentos del Perú
    const departments = [
        "Lima", "Arequipa", "Cusco", "La Libertad", "Piura", "Lambayeque", 
        "Cajamarca", "Junín", "Puno", "Ica", "Ancash", "Huánuco", "Ayacucho",
        "San Martín", "Loreto", "Ucayali", "Amazonas", "Tacna", "Tumbes",
        "Apurímac", "Huancavelica", "Moquegua", "Pasco", "Madre de Dios", "Callao"
    ];

    // Formatea el teléfono en formato 999 999 999
    const formatPhone = (value) => {
        const cleaned = value.replace(/\D/g, "");
        const limited = cleaned.substring(0, 9);
        
        if (limited.length <= 3) return limited;
        if (limited.length <= 6) return `${limited.slice(0, 3)} ${limited.slice(3)}`;
        return `${limited.slice(0, 3)} ${limited.slice(3, 6)} ${limited.slice(6)}`;
    };

    // Valida el teléfono peruano (9 dígitos)
    const validatePhone = (phone) => {
        const cleaned = phone.replace(/\D/g, "");
        if (cleaned.length === 0) return { valid: true, message: "" };
        if (cleaned.length !== 9) return { valid: false, message: "El teléfono debe tener 9 dígitos" };
        if (!cleaned.startsWith("9")) return { valid: false, message: "El teléfono debe comenzar con 9" };
        return { valid: true, message: "" };
    };

    const handlePhoneChange = (e) => {
        const formatted = formatPhone(e.target.value);
        setPhoneValue(formatted);
        
        const validation = validatePhone(formatted);
        setPhoneError(validation.message);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        // Validaciones
        const name = nameRef.current.value.trim();
        const email = emailRef.current.value.trim();
        const phone = phoneValue.replace(/\s/g, "");
        const documentNumber = documentNumberRef.current.value.trim();
        const address = addressRef.current.value.trim();
        const city = cityRef.current.value.trim();
        const department = departmentRef.current.value;
        const message = messageRef.current.value.trim();

        if (!name) {
            nameRef.current.focus();
            return;
        }

        if (!phone) {
            phoneRef.current.focus();
            setPhoneError("El teléfono es obligatorio");
            return;
        }

        const phoneValidation = validatePhone(phone);
        if (!phoneValidation.valid) {
            phoneRef.current.focus();
            setPhoneError(phoneValidation.message);
            return;
        }

        if (!documentNumber) {
            documentNumberRef.current.focus();
            return;
        }

        setSending(true);

        try {
            const result = await lockerRequestsRest.save({
                name,
                email: email || null,
                phone,
                document_type: documentType,
                document_number: documentNumber,
                address: address || null,
                city: city || null,
                department: department || null,
                message: message || null,
            });

            if (result) {
                // Limpiar formulario
                nameRef.current.value = "";
                emailRef.current.value = "";
                setPhoneValue("");
                documentNumberRef.current.value = "";
                addressRef.current.value = "";
                cityRef.current.value = "";
                departmentRef.current.value = "";
                messageRef.current.value = "";
                setDocumentType("DNI");

                // Mostrar mensaje de éxito
                setSuccessMessage(true);

                // Cerrar modal después de 3 segundos
                setTimeout(() => {
                    setSuccessMessage(false);
                    onClose();
                }, 3000);
            }
        } catch (error) {
            console.error("Error al enviar solicitud:", error);
        } finally {
            setSending(false);
        }
    };

    // Cerrar con ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    // Prevenir scroll del body cuando el modal está abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Success Message Overlay */}
                            <AnimatePresence>
                                {successMessage && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="absolute inset-0 bg-white rounded-2xl z-10 flex flex-col items-center justify-center p-8"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                        >
                                            <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
                                        </motion.div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                            ¡Solicitud Enviada!
                                        </h3>
                                        <p className="text-gray-600 text-center max-w-md">
                                            Hemos recibido tu solicitud. Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Header - Fixed */}
                            <div className="bg-primary p-6 rounded-t-2xl flex-shrink-0">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-1">
                                            Abrir Casillero Virtual
                                        </h2>
                                        <p className="text-white/90 text-sm">
                                            Completa el formulario y empieza a importar
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Body - Scrollable */}
                            <form onSubmit={onSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                                {/* Nombre Completo */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Nombre Completo <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            ref={nameRef}
                                            type="text"
                                            required
                                            className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
                                            placeholder="Ej: Juan Pérez García"
                                        />
                                    </div>
                                </div>

                                {/* Email y Teléfono */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Correo Electrónico
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                ref={emailRef}
                                                type="email"
                                                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
                                                placeholder="correo@ejemplo.com"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Teléfono <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                ref={phoneRef}
                                                type="text"
                                                required
                                                value={phoneValue}
                                                onChange={handlePhoneChange}
                                                className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                                                    phoneError
                                                        ? "border-red-500 focus:border-red-500"
                                                        : "border-gray-200 focus:border-primary"
                                                }`}
                                                placeholder="999 999 999"
                                            />
                                        </div>
                                        {phoneError && (
                                            <p className="text-red-500 text-xs mt-1">{phoneError}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Tipo y Número de Documento */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Tipo de Documento <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <select
                                                value={documentType}
                                                onChange={(e) => setDocumentType(e.target.value)}
                                                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors appearance-none bg-white"
                                            >
                                                <option value="DNI">DNI</option>
                                                <option value="CE">Carné de Extranjería</option>
                                                <option value="Pasaporte">Pasaporte</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            N° de Documento <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            ref={documentNumberRef}
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
                                            placeholder={documentType === "DNI" ? "12345678" : "Número de documento"}
                                        />
                                    </div>
                                </div>

                                {/* Dirección */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Dirección
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <textarea
                                            ref={addressRef}
                                            rows={2}
                                            className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors resize-none"
                                            placeholder="Ej: Av. Principal 123, Distrito"
                                        />
                                    </div>
                                </div>

                                {/* Ciudad y Departamento */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Ciudad
                                        </label>
                                        <input
                                            ref={cityRef}
                                            type="text"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
                                            placeholder="Ej: Miraflores"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Departamento
                                        </label>
                                        <select
                                            ref={departmentRef}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors appearance-none bg-white"
                                        >
                                            <option value="">Seleccionar...</option>
                                            {departments.map((dept) => (
                                                <option key={dept} value={dept}>
                                                    {dept}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Mensaje adicional */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Mensaje Adicional (Opcional)
                                    </label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <textarea
                                            ref={messageRef}
                                            rows={3}
                                            className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors resize-none"
                                            placeholder="¿Tienes alguna pregunta o comentario?"
                                        />
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        disabled={sending}
                                        className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={sending}
                                        className="flex-1 px-6 py-3 bg-primary hover:opacity-90 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {sending ? (
                                            <>
                                                <Loader className="w-5 h-5 animate-spin" />
                                                Enviando...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="w-5 h-5" />
                                                Enviar Solicitud
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Nota legal */}
                                <p className="text-xs text-gray-500 text-center pt-2">
                                    Al enviar esta solicitud, aceptas nuestros{" "}
                                    <a href="/terminos" className="text-primary hover:underline">
                                        Términos y Condiciones
                                    </a>
                                </p>
                            </form>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );

    // Usar createPortal para renderizar el modal fuera del DOM del componente padre
    return typeof document !== 'undefined' 
        ? createPortal(modalContent, document.body)
        : null;
};

export default LockerRequestModal;
