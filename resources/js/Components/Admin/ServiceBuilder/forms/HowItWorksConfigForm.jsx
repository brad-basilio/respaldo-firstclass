import React, { useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import InputFormGroup from '../../../../Components/Adminto/form/InputFormGroup';
import TextareaFormGroup from '../../../../Components/Adminto/form/TextareaFormGroup';
import SelectFormGroup from '../../../../Components/Adminto/form/SelectFormGroup';
import { User, Package, Plane, CheckCircle, Flag, Truck, Globe, Shield, MapPin } from 'lucide-react';

// Available icons for steps
const AVAILABLE_ICONS = {
    User,
    Package,
    Plane,
    CheckCircle,
    Flag,
    Truck,
    Globe,
    Shield,
    MapPin
};

const ICON_LABELS = {
    User: 'Usuario',
    Package: 'Paquete',
    Plane: 'Avión',
    CheckCircle: 'Check',
    Flag: 'Bandera',
    Truck: 'Camión',
    Globe: 'Globo',
    Shield: 'Escudo',
    MapPin: 'GPS'
    
};

const COLOR_MAP = {
    'bg-primary': '#06b6d4',
    'bg-secondary': '#3b82f6',
    'bg-neutral-dark': '#1f2937',
    'bg-neutral-light': '#6b7280',
    'bg-green-500': '#22c55e',
    'bg-orange-500': '#f97316',
    'bg-purple-500': '#a855f7'
};

const HowItWorksConfigForm = ({ config, updateConfig }) => {
    const modalRef = useRef();
    const iconSelectRef = useRef();
    const [newStep, setNewStep] = useState({
        title: '',
        description: '',
        icon: 'User',
        color: 'bg-primary'
    });
    const [editingStep, setEditingStep] = useState(null);

    const handleAddStep = () => {
        if (!newStep.title || !newStep.description) return;

        if (editingStep !== null) {
            // Editar paso existente
            const steps = [...config.steps];
            steps[editingStep] = {
                ...steps[editingStep],
                title: newStep.title,
                description: newStep.description,
                iconName: newStep.icon,
                color: newStep.color
            };
            
            console.log('Editando paso:', editingStep, 'Nuevos valores:', {
                title: newStep.title,
                description: newStep.description,
                iconName: newStep.icon,
                color: newStep.color
            });
            
            updateConfig('steps', steps);
            
            // Resetear después de un pequeño delay para asegurar que la UI se actualice
            setTimeout(() => {
                setEditingStep(null);
                setNewStep({
                    title: '',
                    description: '',
                    icon: 'User',
                    color: 'bg-primary'
                });
            }, 100);
        } else {
            // Agregar nuevo paso
            const steps = [...(config.steps || []), {
                id: (config.steps?.length || 0) + 1,
                ...newStep,
                iconName: newStep.icon
            }];
            updateConfig('steps', steps);
            
            // Resetear formulario inmediatamente para nuevos pasos
            setNewStep({
                title: '',
                description: '',
                icon: 'User',
                color: 'bg-primary'
            });
        }
    };

    const handleEditStep = (index) => {
        const step = config.steps[index];
        // Primero limpiar el estado
        setNewStep({
            title: '',
            description: '',
            icon: 'User',
            color: 'bg-primary'
        });
        
        // Luego establecer los nuevos valores después de un pequeño delay
        setTimeout(() => {
            setNewStep({
                title: step.title || '',
                description: step.description || '',
                icon: step.iconName || 'User',
                color: step.color || 'bg-primary'
            });
            setEditingStep(index);
            
            // Scroll hacia el formulario
            const formElement = document.querySelector('.card.bg-light');
            if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 50);
    };

    const handleCancelEdit = () => {
        setNewStep({
            title: '',
            description: '',
            icon: 'User',
            color: 'bg-primary'
        });
        setEditingStep(null);
    };

    const handleRemoveStep = (index) => {
        const steps = config.steps.filter((_, i) => i !== index);
        // Re-number steps
        const renumbered = steps.map((step, idx) => ({ ...step, id: idx + 1 }));
        updateConfig('steps', renumbered);
    };

    const handleMoveStep = (index, direction) => {
        const steps = [...config.steps];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        
        if (newIndex < 0 || newIndex >= steps.length) return;
        
        [steps[index], steps[newIndex]] = [steps[newIndex], steps[index]];
        // Re-number after swap
        const renumbered = steps.map((step, idx) => ({ ...step, id: idx + 1 }));
        updateConfig('steps', renumbered);
    };

    return (
        <div className="row">
            {/* Section Configuration */}
            <div className="col-12">
                <h6 className="mb-3">
                    <i className="mdi mdi-cog mr-2"></i>
                    Configuración General
                </h6>
            </div>

            <div className="col-md-12">
                <InputFormGroup
                    label="Título"
                    value={config.title || ''}
                    onChange={(e) => updateConfig('title', e.target.value)}
                    placeholder="¿Cómo funciona el servicio de *Casillero Virtual*?"
                    help="Usa *palabra* para resaltar en cyan. Ejemplo: *Casillero Virtual*"
                />
            </div>

            <div className="col-12">
                <TextareaFormGroup
                    label="Descripción"
                    value={config.description || ''}
                    onChange={(e) => updateConfig('description', e.target.value)}
                    rows={2}
                    help="Usa <strong>texto</strong> para negrita"
                />
            </div>

            <div className="col-md-4">
                <SelectFormGroup
                    label="Dirección del Vuelo (Animación del vuelo)"
                    value={config.direction || 'usa-peru'}
                    onChange={(e) => updateConfig('direction', e.target.value)}
                    dropdownParent={$('#section-config-modal-container')}
                >
                    <option value="usa-peru">USA → Perú</option>
                    <option value="peru-usa">Perú → USA</option>
                </SelectFormGroup>
            </div>

            <div className="col-md-4">
                <SelectFormGroup
                    label="Color de Fondo"
                    value={config.bgColor || 'bg-accent'}
                    onChange={(e) => updateConfig('bgColor', e.target.value)}
                    dropdownParent={$('#section-config-modal-container')}
                >
                    <option value="bg-accent">Accent (Beige)</option>
                    <option value="bg-white">Blanco</option>
                    <option value="bg-gray-50">Gris Claro</option>
                </SelectFormGroup>
            </div>

            {/* Country Configuration */}
            <div className="col-12 mt-4">
                <hr />
                <h6 className="mb-3">
                    <i className="mdi mdi-flag mr-2"></i>
                    Configuración de Países
                </h6>
            </div>

            <div className="col-md-6">
                <div className="card bg-light">
                    <div className="card-body">
                        <h6 className="font-weight-bold mb-3">País de Origen</h6>
                        <InputFormGroup
                            label="Emoji/Bandera"
                            value={config.originCountry?.flag || '🇺🇸'}
                            onChange={(e) => updateConfig('originCountry', { 
                                ...(config.originCountry || {}), 
                                flag: e.target.value 
                            })}
                            placeholder="🇺🇸"
                        />
                        <InputFormGroup
                            label="Nombre"
                            value={config.originCountry?.name || ''}
                            onChange={(e) => updateConfig('originCountry', { 
                                ...(config.originCountry || {}), 
                                name: e.target.value 
                            })}
                            placeholder="Miami, FL"
                        />
                        <InputFormGroup
                            label="Subtítulo"
                            value={config.originCountry?.subtitle || ''}
                            onChange={(e) => updateConfig('originCountry', { 
                                ...(config.originCountry || {}), 
                                subtitle: e.target.value 
                            })}
                            placeholder="Tu dirección"
                        />
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card bg-light">
                    <div className="card-body">
                        <h6 className="font-weight-bold mb-3">País de Destino</h6>
                        <InputFormGroup
                            label="Emoji/Bandera"
                            value={config.destinationCountry?.flag || '🇵🇪'}
                            onChange={(e) => updateConfig('destinationCountry', { 
                                ...(config.destinationCountry || {}), 
                                flag: e.target.value 
                            })}
                            placeholder="🇵🇪"
                        />
                        <InputFormGroup
                            label="Nombre"
                            value={config.destinationCountry?.name || ''}
                            onChange={(e) => updateConfig('destinationCountry', { 
                                ...(config.destinationCountry || {}), 
                                name: e.target.value 
                            })}
                            placeholder="Perú"
                        />
                        <InputFormGroup
                            label="Subtítulo"
                            value={config.destinationCountry?.subtitle || ''}
                            onChange={(e) => updateConfig('destinationCountry', { 
                                ...(config.destinationCountry || {}), 
                                subtitle: e.target.value 
                            })}
                            placeholder="Tu hogar"
                        />
                    </div>
                </div>
            </div>

            {/* Steps Configuration */}
            <div className="col-12 mt-4">
                <hr />
                <h6 className="mb-3">
                    <i className="mdi mdi-format-list-numbered mr-2"></i>
                    Pasos del Proceso ({config.steps?.length || 0})
                </h6>
            </div>

            {/* Existing Steps */}
            {config.steps && config.steps.length > 0 && (
                <div className="col-12 mb-3">
                    <div className="list-group">
                        {config.steps.map((step, index) => {
                            const StepIcon = AVAILABLE_ICONS[step.iconName || 'User'];
                            return (
                                <div key={index} className="list-group-item">
                                    <div className="d-flex align-items-start">
                                        <span className="badge badge-primary badge-pill mr-3 mt-1" style={{ fontSize: '14px' }}>
                                            {step.id}
                                        </span>
                                        <div style={{ 
                                            backgroundColor: COLOR_MAP[step.color] || step.color,
                                            padding: '8px',
                                            borderRadius: '4px',
                                            marginRight: '12px',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {StepIcon && <StepIcon style={{ color: 'white' }} size={20} />}
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="mb-1 font-weight-bold">{step.title}</h6>
                                            <p className="mb-0 text-muted small">{step.description}</p>
                                            <small className="text-info">
                                                Icono: {step.iconName} | Color: {step.color}
                                            </small>
                                        </div>
                                        <div className="btn-group-vertical ml-2">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-info"
                                                onClick={() => handleEditStep(index)}
                                                title="Editar"
                                            >
                                                <i className="mdi mdi-pencil"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => handleMoveStep(index, 'up')}
                                                disabled={index === 0}
                                                title="Mover arriba"
                                            >
                                                <i className="mdi mdi-arrow-up"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => handleMoveStep(index, 'down')}
                                                disabled={index === config.steps.length - 1}
                                                title="Mover abajo"
                                            >
                                                <i className="mdi mdi-arrow-down"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleRemoveStep(index)}
                                                title="Eliminar"
                                            >
                                                <i className="mdi mdi-delete"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Add New Step Form */}
            <div className="col-12">
                <div className="card bg-light">
                    <div className="card-body">
                        <h6 className="font-weight-bold mb-3">
                            {editingStep !== null ? (
                                <>
                                    <i className="mdi mdi-pencil mr-2"></i>
                                    Editando Paso #{editingStep + 1}
                                </>
                            ) : (
                                <>
                                    <i className="mdi mdi-plus mr-2"></i>
                                    Agregar Nuevo Paso
                                </>
                            )}
                        </h6>
                        <div className="row" key={editingStep !== null ? `edit-${editingStep}` : 'new'}>
                            <div className="col-md-6">
                                <InputFormGroup
                                    label="Título del Paso"
                                    value={newStep.title}
                                    onChange={(e) => setNewStep({ ...newStep, title: e.target.value })}
                                    placeholder="Ej: Regístrate Gratis"
                                />
                            </div>
                            <div className="col-md-3">
                                <SelectFormGroup
                                    eRef={iconSelectRef}
                                    label="Icono"
                                    value={newStep.icon}
                                    onChange={(e) => setNewStep({ ...newStep, icon: e.target.value })}
                                    dropdownParent={$('#section-config-modal-container')}
                                    templateResult={(state) => {
                                        if (!state.id) return state.text;
                                        const IconComponent = AVAILABLE_ICONS[state.id];
                                        const $state = $(
                                            `<span><span class="icon-preview" style="display:inline-flex;align-items:center;margin-right:8px;"></span> ${ICON_LABELS[state.id] || state.text}</span>`
                                        );
                                        if (IconComponent) {
                                            const iconWrapper = $state.find('.icon-preview')[0];
                                            const root = createRoot(iconWrapper);
                                            root.render(React.createElement(IconComponent, { size: 16 }));
                                        }
                                        return $state;
                                    }}
                                    templateSelection={(state) => {
                                        if (!state.id) return state.text;
                                        const IconComponent = AVAILABLE_ICONS[state.id];
                                        const $state = $(
                                            `<span><span class="icon-preview" style="display:inline-flex;align-items:center;margin-right:8px;"></span> ${ICON_LABELS[state.id] || state.text}</span>`
                                        );
                                        if (IconComponent) {
                                            const iconWrapper = $state.find('.icon-preview')[0];
                                            const root = createRoot(iconWrapper);
                                            root.render(React.createElement(IconComponent, { size: 16 }));
                                        }
                                        return $state;
                                    }}
                                >
                                    <option value="User">Usuario</option>
                                    <option value="Package">Paquete</option>
                                    <option value="Plane">Avión</option>
                                    <option value="CheckCircle">Check</option>
                                    <option value="Flag">Bandera</option>
                                    <option value="Truck">Camión</option>
                                    <option value="Globe">Globo</option>
                                    <option value="Shield">Escudo</option>
                                    <option value="MapPin">GPS</option>
                                </SelectFormGroup>
                            </div>
                            <div className="col-md-3">
                                <SelectFormGroup
                                    label="Color"
                                    value={newStep.color}
                                    onChange={(e) => setNewStep({ ...newStep, color: e.target.value })}
                                    dropdownParent={$('#section-config-modal-container')}
                                >
                                    <option value="bg-primary">Primary (Cyan)</option>
                                    <option value="bg-secondary">Secondary (Azul)</option>
                                    <option value="bg-neutral-dark">Negro</option>
                                    <option value="bg-neutral-light">Gris</option>
                                    <option value="bg-green-500">Verde</option>
                                    <option value="bg-orange-500">Naranja</option>
                                    <option value="bg-purple-500">Morado</option>
                                </SelectFormGroup>
                            </div>
                            <div className="col-md-10">
                                <TextareaFormGroup
                                    label="Descripción"
                                    value={newStep.description}
                                    onChange={(e) => setNewStep({ ...newStep, description: e.target.value })}
                                    rows={2}
                                    placeholder="Describe este paso del proceso"
                                />
                            </div>
                            <div className="col-md-2 d-flex align-items-end">
                                {editingStep !== null ? (
                                    <div className="btn-group btn-block mb-3">
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={handleAddStep}
                                            disabled={!newStep.title || !newStep.description}
                                            title="Guardar cambios"
                                        >
                                            <i className="mdi mdi-check"></i>
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={handleCancelEdit}
                                            title="Cancelar"
                                        >
                                            <i className="mdi mdi-close"></i>
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-success btn-block mb-3"
                                        onClick={handleAddStep}
                                        disabled={!newStep.title || !newStep.description}
                                        title="Agregar paso"
                                    >
                                        <i className="mdi mdi-plus mr-1"></i>
                                        Agregar
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Button Configuration */}
            <div className="col-12 mt-4">
                <hr />
                <h6 className="mb-3">
                    <i className="mdi mdi-cursor-pointer mr-2"></i>
                    Botón de Acción (CTA)
                </h6>
            </div>

            <div className="col-md-4">
                <SelectFormGroup
                    label="Tipo de Botón"
                    value={config.ctaButton?.type || 'link'}
                    onChange={(e) => updateConfig('ctaButton', { 
                        ...(config.ctaButton || {}), 
                        type: e.target.value,
                        text: e.target.value === 'lockerButton' ? 'Abrir mi casillero' : (config.ctaButton?.text || '')
                    })}
                    dropdownParent={$('#section-config-modal-container')}
                >
                    <option value="link">Enlace Normal</option>
                    <option value="lockerButton">Abrir Casillero (con funcionalidad)</option>
                </SelectFormGroup>
            </div>

            <div className="col-md-4">
                <InputFormGroup
                    label="Texto del Botón"
                    value={config.ctaButton?.text || ''}
                    onChange={(e) => updateConfig('ctaButton', { 
                        ...(config.ctaButton || {}), 
                        text: e.target.value 
                    })}
                    placeholder="Comenzar ahora"
                    disabled={config.ctaButton?.type === 'lockerButton'}
                    help={config.ctaButton?.type === 'lockerButton' ? 'Texto fijo para botón de casillero' : ''}
                />
            </div>

            <div className="col-md-4">
                <InputFormGroup
                    label="Enlace (URL)"
                    value={config.ctaButton?.link || ''}
                    onChange={(e) => updateConfig('ctaButton', { 
                        ...(config.ctaButton || {}), 
                        link: e.target.value 
                    })}
                    placeholder="/registro"
                    disabled={config.ctaButton?.type === 'lockerButton'}
                    help={config.ctaButton?.type === 'lockerButton' ? 'El botón de casillero tiene su propia funcionalidad' : ''}
                />
            </div>

            {config.ctaButton?.type === 'lockerButton' && (
                <div className="col-12">
                    <div className="alert alert-info">
                        <i className="mdi mdi-information mr-2"></i>
                        <strong>Botón de Casillero:</strong> Este botón tiene diseño y funcionalidad especial para abrir/registrar casillero virtual. No requiere URL personalizada.
                    </div>
                </div>
            )}

            {/* Preview Info */}
            <div className="col-12 mt-3">
                <div className="alert alert-info">
                    <i className="mdi mdi-information mr-2"></i>
                    <strong>Vista Previa:</strong> Los cambios se verán reflejados automáticamente en la vista previa a la derecha.
                </div>
            </div>
        </div>
    );
};

export default HowItWorksConfigForm;
