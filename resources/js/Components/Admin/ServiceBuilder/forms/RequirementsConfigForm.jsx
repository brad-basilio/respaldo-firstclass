import React, { useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
    CheckCircle, Shield, Zap, Award, Globe, Lock, Clock, Star, 
    Heart, TrendingUp, Truck, Package, Users, DollarSign, ThumbsUp, 
    Gift, Sparkles, Target, Building2, Warehouse, Camera, NotebookPen,
    FileText, AlertCircle, Info, ClipboardCheck, FileCheck, 
    Scissors, Scale, Ruler, Box
} from 'lucide-react';
import InputFormGroup from '../../../Adminto/form/InputFormGroup';
import SelectFormGroup from '../../../Adminto/form/SelectFormGroup';
import TextareaFormGroup from '../../../Adminto/form/TextareaFormGroup';

// Available icons for requirements
const AVAILABLE_ICONS = {
    CheckCircle,
    Shield,
    Zap,
    Award,
    Globe,
    Lock,
    Clock,
    Star,
    Heart,
    TrendingUp,
    Truck,
    Package,
    Users,
    DollarSign,
    ThumbsUp,
    Gift,
    Sparkles,
    Target,
    Building2,
    Warehouse,
    Camera,
    NotebookPen,
    FileText,
    AlertCircle,
    Info,
    ClipboardCheck,
    FileCheck,
    Scissors,
    Scale,
    Ruler,
    Box
};

const ICON_LABELS = {
    CheckCircle: 'Check',
    Shield: 'Escudo',
    Zap: 'Rayo',
    Award: 'Premio',
    Globe: 'Globo',
    Lock: 'Candado',
    Clock: 'Reloj',
    Star: 'Estrella',
    Heart: 'Corazón',
    TrendingUp: 'Crecimiento',
    Truck: 'Camión',
    Package: 'Paquete',
    Users: 'Usuarios',
    DollarSign: 'Dólar',
    ThumbsUp: 'Like',
    Gift: 'Regalo',
    Sparkles: 'Brillo',
    Target: 'Objetivo',
    Building2: 'Edificio',
    Warehouse: 'Almacén',
    Camera: 'Cámara',
    NotebookPen: 'Lista',
    FileText: 'Documento',
    AlertCircle: 'Alerta',
    Info: 'Información',
    ClipboardCheck: 'Checklist',
    FileCheck: 'Archivo Check',
    Scissors: 'Tijeras',
    Scale: 'Balanza',
    Ruler: 'Regla',
    Box: 'Caja'
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

const RequirementsConfigForm = ({ config, updateConfig }) => {
    const iconSelectRef = useRef();
    const [newRequirement, setNewRequirement] = useState({
        icon: 'FileText',
        title: '',
        description: '',
        color: 'bg-primary',
        limit: '',
        isSpecial: false
    });
    const [editingRequirement, setEditingRequirement] = useState(null);

    const handleFieldChange = (field, value) => {
        setNewRequirement(prev => ({
            icon: prev.icon,
            title: prev.title,
            description: prev.description,
            color: prev.color,
            limit: prev.limit,
            isSpecial: prev.isSpecial,
            [field]: value
        }));
    };

    const handleAddRequirement = () => {
        if (!newRequirement.title || !newRequirement.description) return;

        if (editingRequirement !== null) {
            // Editar requisito existente
            const requirements = [...config.requirements];
            requirements[editingRequirement] = {
                icon: newRequirement.icon,
                title: newRequirement.title,
                description: newRequirement.description,
                color: newRequirement.color,
                limit: newRequirement.limit,
                isSpecial: newRequirement.isSpecial
            };
            
            updateConfig('requirements', requirements);
            
            // Limpiar inmediatamente el formulario
            setNewRequirement({
                icon: 'FileText',
                title: '',
                description: '',
                color: 'bg-primary',
                limit: '',
                isSpecial: false
            });
            setEditingRequirement(null);
            
        } else {
            // Agregar nuevo requisito
            const requirements = config.requirements || [];
            updateConfig('requirements', [
                ...requirements,
                {
                    icon: newRequirement.icon,
                    title: newRequirement.title,
                    description: newRequirement.description,
                    color: newRequirement.color,
                    limit: newRequirement.limit,
                    isSpecial: newRequirement.isSpecial
                }
            ]);
            
            // Limpiar formulario inmediatamente para nuevos requisitos
            setNewRequirement({
                icon: 'FileText',
                title: '',
                description: '',
                color: 'bg-primary',
                limit: '',
                isSpecial: false
            });
        }
    };

    const handleEditRequirement = (index) => {
        const requirement = config.requirements[index];
        
        // Cancelar cualquier edición previa primero
        setEditingRequirement(null);
        
        // Limpiar completamente el formulario
        setNewRequirement({
            icon: 'FileText',
            title: '',
            description: '',
            color: 'bg-primary',
            limit: '',
            isSpecial: false
        });
        
        // Forzar re-render esperando 2 ciclos de React
        setTimeout(() => {
            setNewRequirement({
                icon: requirement.icon || 'FileText',
                title: requirement.title || '',
                description: requirement.description || '',
                color: requirement.color || 'bg-primary',
                limit: requirement.limit || '',
                isSpecial: requirement.isSpecial || false
            });
            setEditingRequirement(index);
            
            // Re-inicializar select2 después de establecer valores
            if (iconSelectRef.current) {
                $(iconSelectRef.current).val(requirement.icon || 'FileText').trigger('change');
            }
            
            // Scroll hacia el formulario
            const formElement = document.querySelector('.card.bg-light');
            if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 100);
    };

    const handleCancelEdit = () => {
        setNewRequirement({
            icon: 'FileText',
            title: '',
            description: '',
            color: 'bg-primary',
            limit: '',
            isSpecial: false
        });
        setEditingRequirement(null);
    };

    const handleRemoveRequirement = (index) => {
        const requirements = config.requirements.filter((_, i) => i !== index);
        updateConfig('requirements', requirements);
    };

    const handleMoveRequirement = (index, direction) => {
        const requirements = [...config.requirements];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        
        if (newIndex < 0 || newIndex >= requirements.length) return;
        
        [requirements[index], requirements[newIndex]] = [requirements[newIndex], requirements[index]];
        updateConfig('requirements', requirements);
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

            <div className="col-md-6">
                <InputFormGroup
                    label="Título de la Sección"
                    value={config.title || ''}
                    onChange={(e) => updateConfig('title', e.target.value)}
                    placeholder="Requisitos por envío"
                    help="Usa *palabra* para resaltar en cyan"
                />
            </div>

            <div className="col-md-6">
                <InputFormGroup
                    label="Subtítulo"
                    value={config.subtitle || ''}
                    onChange={(e) => updateConfig('subtitle', e.target.value)}
                    placeholder="Según norma de aduana"
                />
            </div>

            <div className="col-12">
                <TextareaFormGroup
                    label="Descripción de la Sección (Opcional)"
                    value={config.description || ''}
                    onChange={(e) => updateConfig('description', e.target.value)}
                    rows={2}
                    placeholder="Descripción adicional para la sección..."
                    help="Usa <strong>texto</strong> para negrita o *texto* para resaltar en cyan"
                />
            </div>

            <div className="col-md-6">
                <SelectFormGroup
                    label="Columnas (Desktop)"
                    value={config.columns || 3}
                    onChange={(e) => updateConfig('columns', parseInt(e.target.value))}
                    dropdownParent={$('#section-config-modal-container')}
                >
                    <option value="2">2 Columnas</option>
                    <option value="3">3 Columnas</option>
                    <option value="4">4 Columnas</option>
                </SelectFormGroup>
            </div>

            <div className="col-md-6">
                <SelectFormGroup
                    label="Color de Fondo"
                    value={config.background || 'white'}
                    onChange={(e) => updateConfig('background', e.target.value)}
                    dropdownParent={$('#section-config-modal-container')}
                >
                    <option value="white">Blanco</option>
                    <option value="gray-50">Gris Claro</option>
                    <option value="accent">Accent (Beige)</option>
                </SelectFormGroup>
            </div>

            {/* Requirements List */}
            <div className="col-12 mt-4">
                <hr />
                <h6 className="mb-3">
                    <i className="mdi mdi-file-document mr-2"></i>
                    Lista de Requisitos ({config.requirements?.length || 0})
                </h6>
            </div>

            {/* Existing Requirements */}
            {config.requirements && config.requirements.length > 0 && (
                <div className="col-12 mb-3">
                    <div className="list-group">
                        {config.requirements.map((requirement, index) => {
                            const RequirementIcon = AVAILABLE_ICONS[requirement.icon || 'FileText'];
                            return (
                                <div key={index} className="list-group-item">
                                    <div className="d-flex align-items-start">
                                        <span className="badge badge-primary badge-pill mr-3 mt-1" style={{ fontSize: '14px' }}>
                                            {index + 1}
                                        </span>
                                        <div 
                                            style={{ 
                                                backgroundColor: COLOR_MAP[requirement.color] || requirement.color,
                                                padding: '8px',
                                                borderRadius: '4px',
                                                marginRight: '12px',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            {RequirementIcon && <RequirementIcon style={{ color: 'white' }} size={20} />}
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="mb-1 font-weight-bold">{requirement.title}</h6>
                                            <p className="mb-0 text-muted small">{requirement.description}</p>
                                            <small className="text-info">
                                                Icono: {requirement.icon} | Color: {requirement.color}
                                                {requirement.limit && ` | Límite: ${requirement.limit}`}
                                                {requirement.isSpecial && ' | ¡Importante!'}
                                            </small>
                                        </div>
                                        <div className="btn-group-vertical ml-2">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-info"
                                                onClick={() => handleEditRequirement(index)}
                                                title="Editar"
                                            >
                                                <i className="mdi mdi-pencil"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => handleMoveRequirement(index, 'up')}
                                                disabled={index === 0}
                                                title="Mover arriba"
                                            >
                                                <i className="mdi mdi-arrow-up"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => handleMoveRequirement(index, 'down')}
                                                disabled={index === config.requirements.length - 1}
                                                title="Mover abajo"
                                            >
                                                <i className="mdi mdi-arrow-down"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleRemoveRequirement(index)}
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

            {/* Add/Edit Form */}
            <div className="col-12">
                <div className="card bg-light">
                    <div className="card-body">
                        <h6 className="font-weight-bold mb-3">
                            {editingRequirement !== null ? (
                                <>
                                    <i className="mdi mdi-pencil mr-2"></i>
                                    Editando Requisito #{editingRequirement + 1}
                                </>
                            ) : (
                                <>
                                    <i className="mdi mdi-plus mr-2"></i>
                                    Agregar Nuevo Requisito
                                </>
                            )}
                        </h6>
                        <div className="row">
                            <div className="col-md-6">
                                <InputFormGroup
                                    label="Título del Requisito"
                                    value={newRequirement.title}
                                    onChange={(e) => handleFieldChange('title', e.target.value)}
                                    placeholder="Ej: Factura comercial"
                                />
                            </div>
                            <div className="col-md-3">
                                <SelectFormGroup
                                    eRef={iconSelectRef}
                                    label="Icono"
                                    value={newRequirement.icon}
                                    onChange={(e) => handleFieldChange('icon', e.target.value)}
                                    dropdownParent={$('#section-config-modal-container')}
                                    templateResult={(state) => {
                                        if (!state.id) return state.text;
                                        const IconComponent = AVAILABLE_ICONS[state.id];
                                        const $state = $(
                                            `<span><span class="icon-preview" style="display:inline-flex;align-items:center;margin-right:8px;" /></span> ${ICON_LABELS[state.id] || state.text}</span>`
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
                                            `<span><span class="icon-preview" style="display:inline-flex;align-items:center;margin-right:8px;" /></span> ${ICON_LABELS[state.id] || state.text}</span>`
                                        );
                                        if (IconComponent) {
                                            const iconWrapper = $state.find('.icon-preview')[0];
                                            const root = createRoot(iconWrapper);
                                            root.render(React.createElement(IconComponent, { size: 16 }));
                                        }
                                        return $state;
                                    }}
                                >
                                    <option value="FileText">Documento</option>
                                    <option value="ClipboardCheck">Checklist</option>
                                    <option value="FileCheck">Archivo Check</option>
                                    <option value="AlertCircle">Alerta</option>
                                    <option value="Info">Información</option>
                                    <option value="Package">Paquete</option>
                                    <option value="Box">Caja</option>
                                    <option value="Scale">Balanza</option>
                                    <option value="Ruler">Regla</option>
                                    <option value="Scissors">Tijeras</option>
                                    <option value="CheckCircle">Check</option>
                                    <option value="Shield">Escudo</option>
                                    <option value="Lock">Candado</option>
                                    <option value="Globe">Globo</option>
                                    <option value="Truck">Camión</option>
                                    <option value="Camera">Cámara</option>
                                    <option value="NotebookPen">Lista</option>
                                    <option value="Star">Estrella</option>
                                    <option value="Award">Premio</option>
                                    <option value="Target">Objetivo</option>
                                    <option value="Building2">Edificio</option>
                                    <option value="Warehouse">Almacén</option>
                                </SelectFormGroup>
                            </div>
                            <div className="col-md-3">
                                <SelectFormGroup
                                    label="Color"
                                    value={newRequirement.color}
                                    onChange={(e) => handleFieldChange('color', e.target.value)}
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
                                    value={newRequirement.description}
                                    onChange={(e) => handleFieldChange('description', e.target.value)}
                                    rows={2}
                                    placeholder="Describe este requisito"
                                    help="Usa <strong>texto</strong> para negrita o *texto* para bold"
                                />
                            </div>
                            <div className="col-md-6">
                                <InputFormGroup
                                    label="Límite/Valor (Opcional)"
                                    value={newRequirement.limit}
                                    onChange={(e) => handleFieldChange('limit', e.target.value)}
                                    placeholder="Ej: $2,000 USD, 110 lbs, 1.50 metros"
                                    help="Se mostrará como badge en el card"
                                />
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="d-block mb-2">Opciones</label>
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="isSpecialCheck"
                                            checked={newRequirement.isSpecial}
                                            onChange={(e) => handleFieldChange('isSpecial', e.target.checked)}
                                        />
                                        <label className="custom-control-label" htmlFor="isSpecialCheck">
                                            Marcar como importante
                                        </label>
                                    </div>
                                    <small className="form-text text-muted">Mostrará badge "¡Importante!"</small>
                                </div>
                            </div>
                            <div className="col-md-2 d-flex align-items-end">
                                {editingRequirement !== null ? (
                                    <div className="btn-group btn-block mb-3">
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={handleAddRequirement}
                                            disabled={!newRequirement.title || !newRequirement.description}
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
                                        onClick={handleAddRequirement}
                                        disabled={!newRequirement.title || !newRequirement.description}
                                        title="Agregar requisito"
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

            {/* Help Text */}
            <div className="col-12 mt-3">
                <div className="alert alert-info">
                    <i className="mdi mdi-information mr-2"></i>
                    <strong>Vista Previa:</strong> Los cambios se verán reflejados automáticamente en la vista previa a la derecha.
                </div>
            </div>
        </div>
    );
};

export default RequirementsConfigForm;
