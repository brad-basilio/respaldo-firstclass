import React, { useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import InputFormGroup from '../../../../Components/Adminto/form/InputFormGroup';
import TextareaFormGroup from '../../../../Components/Adminto/form/TextareaFormGroup';
import SelectFormGroup from '../../../../Components/Adminto/form/SelectFormGroup';
import { 
    CheckCircle, Shield, Zap, Award, Globe, Lock, Clock, Star, 
    Heart, TrendingUp, Truck, Package, Users, DollarSign, 
    ThumbsUp, Gift, Sparkles, Target
} from 'lucide-react';

// Available icons for benefits
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
    Target
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
    Target: 'Objetivo'
};

const COLOR_MAP = {
    'bg-primary': '#06b6d4',
    'bg-secondary': '#3b82f6',
    'bg-neutral-dark': '#1f2937',
    'bg-neutral-light': '#6b7280',
    'bg-green-500': '#22c55e',
    'bg-orange-500': '#f97316',
    'bg-purple-500': '#a855f7',
    'bg-red-500': '#ef4444',
    'bg-yellow-500': '#eab308',
    'bg-pink-500': '#ec4899'
};

const BenefitsConfigForm = ({ config, updateConfig }) => {
    const iconSelectRef = useRef();
    const [newBenefit, setNewBenefit] = useState({
        icon: 'CheckCircle',
        title: '',
        description: '',
        color: 'bg-primary'
    });
    const [editingBenefit, setEditingBenefit] = useState(null);

    const handleFieldChange = (field, value) => {
        setNewBenefit(prev => ({
            icon: prev.icon,
            title: prev.title,
            description: prev.description,
            color: prev.color,
            [field]: value
        }));
    };

    const handleAddBenefit = () => {
        if (!newBenefit.title || !newBenefit.description) return;

        if (editingBenefit !== null) {
            // Editar beneficio existente
            const benefits = [...config.benefits];
            benefits[editingBenefit] = {
                icon: newBenefit.icon,
                title: newBenefit.title,
                description: newBenefit.description,
                color: newBenefit.color
            };
            
            updateConfig('benefits', benefits);
            
            setTimeout(() => {
                setEditingBenefit(null);
                setNewBenefit({
                    icon: 'CheckCircle',
                    title: '',
                    description: '',
                    color: 'bg-primary'
                });
            }, 100);
        } else {
            // Agregar nuevo beneficio
            const benefits = [...(config.benefits || []), {
                icon: newBenefit.icon,
                title: newBenefit.title,
                description: newBenefit.description,
                color: newBenefit.color
            }];
            updateConfig('benefits', benefits);
            
            setNewBenefit({
                icon: 'CheckCircle',
                title: '',
                description: '',
                color: 'bg-primary'
            });
        }
    };

    const handleEditBenefit = (index) => {
        const benefit = config.benefits[index];
        
        // Actualizar directamente sin resetear
        setNewBenefit({
            icon: benefit.icon || 'CheckCircle',
            title: benefit.title || '',
            description: benefit.description || '',
            color: benefit.color || 'bg-primary'
        });
        setEditingBenefit(index);
        
        // Scroll hacia el formulario
        setTimeout(() => {
            const formElement = document.querySelector('.card.bg-light');
            if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 100);
    };

    const handleCancelEdit = () => {
        setNewBenefit({
            icon: 'CheckCircle',
            title: '',
            description: '',
            color: 'bg-primary'
        });
        setEditingBenefit(null);
    };

    const handleRemoveBenefit = (index) => {
        const benefits = config.benefits.filter((_, i) => i !== index);
        updateConfig('benefits', benefits);
    };

    const handleMoveBenefit = (index, direction) => {
        const benefits = [...config.benefits];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        
        if (newIndex < 0 || newIndex >= benefits.length) return;
        
        [benefits[index], benefits[newIndex]] = [benefits[newIndex], benefits[index]];
        updateConfig('benefits', benefits);
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
                    placeholder="Beneficios"
                    help="Usa *palabra* para resaltar en cyan"
                />
            </div>

            <div className="col-md-6">
                <InputFormGroup
                    label="Subtítulo"
                    value={config.subtitle || ''}
                    onChange={(e) => updateConfig('subtitle', e.target.value)}
                    placeholder="Por qué elegirnos"
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

            {/* Benefits List */}
            <div className="col-12 mt-4">
                <hr />
                <h6 className="mb-3">
                    <i className="mdi mdi-star mr-2"></i>
                    Lista de Beneficios ({config.benefits?.length || 0})
                </h6>
            </div>

            {/* Existing Benefits */}
            {config.benefits && config.benefits.length > 0 && (
                <div className="col-12 mb-3">
                    <div className="list-group">
                        {config.benefits.map((benefit, index) => {
                            const BenefitIcon = AVAILABLE_ICONS[benefit.icon || 'CheckCircle'];
                            return (
                                <div key={index} className="list-group-item">
                                    <div className="d-flex align-items-start">
                                        <div style={{ 
                                            backgroundColor: COLOR_MAP[benefit.color] || benefit.color || COLOR_MAP['bg-primary'],
                                            padding: '12px',
                                            borderRadius: '8px',
                                            marginRight: '12px',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {BenefitIcon && <BenefitIcon style={{ color: 'white' }} size={24} />}
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="mb-1 font-weight-bold">{benefit.title}</h6>
                                            <p className="mb-0 text-muted small">{benefit.description}</p>
                                            <small className="text-info">
                                                Icono: {benefit.icon} | Color: {benefit.color || 'bg-primary'}
                                            </small>
                                        </div>
                                        <div className="btn-group-vertical ml-2">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-info"
                                                onClick={() => handleEditBenefit(index)}
                                                title="Editar"
                                            >
                                                <i className="mdi mdi-pencil"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => handleMoveBenefit(index, 'up')}
                                                disabled={index === 0}
                                                title="Mover arriba"
                                            >
                                                <i className="mdi mdi-arrow-up"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => handleMoveBenefit(index, 'down')}
                                                disabled={index === config.benefits.length - 1}
                                                title="Mover abajo"
                                            >
                                                <i className="mdi mdi-arrow-down"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleRemoveBenefit(index)}
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

            {/* Add New Benefit Form */}
            <div className="col-12">
                <div className="card bg-light">
                    <div className="card-body">
                        <h6 className="font-weight-bold mb-3">
                            {editingBenefit !== null ? (
                                <>
                                    <i className="mdi mdi-pencil mr-2"></i>
                                    Editando Beneficio #{editingBenefit + 1}
                                </>
                            ) : (
                                <>
                                    <i className="mdi mdi-plus mr-2"></i>
                                    Agregar Nuevo Beneficio
                                </>
                            )}
                        </h6>
                        <div className="row">
                            <div className="col-md-6">
                                <InputFormGroup
                                    label="Título del Beneficio"
                                    value={newBenefit.title}
                                    onChange={(e) => handleFieldChange('title', e.target.value)}
                                    placeholder="Ej: Envíos Rápidos"
                                />
                            </div>
                            <div className="col-md-3">
                                <SelectFormGroup
                                    eRef={iconSelectRef}
                                    label="Icono"
                                    value={newBenefit.icon}
                                    onChange={(e) => handleFieldChange('icon', e.target.value)}
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
                                    <option value="CheckCircle">Check</option>
                                    <option value="Shield">Escudo</option>
                                    <option value="Zap">Rayo</option>
                                    <option value="Award">Premio</option>
                                    <option value="Globe">Globo</option>
                                    <option value="Lock">Candado</option>
                                    <option value="Clock">Reloj</option>
                                    <option value="Star">Estrella</option>
                                    <option value="Heart">Corazón</option>
                                    <option value="TrendingUp">Crecimiento</option>
                                    <option value="Truck">Camión</option>
                                    <option value="Package">Paquete</option>
                                    <option value="Users">Usuarios</option>
                                    <option value="DollarSign">Dólar</option>
                                    <option value="ThumbsUp">Like</option>
                                    <option value="Gift">Regalo</option>
                                    <option value="Sparkles">Brillo</option>
                                    <option value="Target">Objetivo</option>
                                </SelectFormGroup>
                            </div>
                            <div className="col-md-3">
                                <SelectFormGroup
                                    label="Color de Fondo"
                                    value={newBenefit.color}
                                    onChange={(e) => handleFieldChange('color', e.target.value)}
                                    dropdownParent={$('#section-config-modal-container')}
                                >
                                    <option value="bg-primary">Primary (Cyan)</option>
                                    <option value="bg-secondary">Secondary (Azul)</option>
                                    <option value="bg-green-500">Verde</option>
                                    <option value="bg-orange-500">Naranja</option>
                                    <option value="bg-purple-500">Morado</option>
                                    <option value="bg-red-500">Rojo</option>
                                    <option value="bg-yellow-500">Amarillo</option>
                                    <option value="bg-pink-500">Rosa</option>
                                </SelectFormGroup>
                            </div>
                            <div className="col-md-10">
                                <TextareaFormGroup
                                    label="Descripción"
                                    value={newBenefit.description}
                                    onChange={(e) => handleFieldChange('description', e.target.value)}
                                    rows={2}
                                    placeholder="Describe este beneficio"
                                    help="Usa <strong>texto</strong> para negrita o *texto* para bold"
                                />
                            </div>
                            <div className="col-md-2 d-flex align-items-end">
                                {editingBenefit !== null ? (
                                    <div className="btn-group btn-block mb-3">
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={handleAddBenefit}
                                            disabled={!newBenefit.title || !newBenefit.description}
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
                                        onClick={handleAddBenefit}
                                        disabled={!newBenefit.title || !newBenefit.description}
                                        title="Agregar beneficio"
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

export default BenefitsConfigForm;
