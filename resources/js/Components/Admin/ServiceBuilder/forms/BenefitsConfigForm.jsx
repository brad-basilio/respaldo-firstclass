import React, { useState } from 'react';
import InputFormGroup from '../../../../Components/Adminto/form/InputFormGroup';
import TextareaFormGroup from '../../../../Components/Adminto/form/TextareaFormGroup';
import SelectFormGroup from '../../../../Components/Adminto/form/SelectFormGroup';
import SwitchFormGroup from '../../../../Components/Adminto/form/SwitchFormGroup';

const iconOptions = ['CheckCircle', 'Shield', 'Zap', 'Award', 'Globe', 'Lock', 'Clock', 'Star', 'Heart', 'TrendingUp'];

const BenefitsConfigForm = ({ config, updateConfig }) => {
    const [editingIndex, setEditingIndex] = useState(null);

    const addBenefit = () => {
        const benefits = [...(config.benefits || []), {
            icon: 'CheckCircle',
            title: 'Nuevo Beneficio',
            description: 'Descripción del beneficio'
        }];
        updateConfig('benefits', benefits);
        setEditingIndex(benefits.length - 1);
    };

    const updateBenefit = (index, field, value) => {
        const benefits = [...config.benefits];
        benefits[index] = { ...benefits[index], [field]: value };
        updateConfig('benefits', benefits);
    };

    const removeBenefit = (index) => {
        const benefits = config.benefits.filter((_, i) => i !== index);
        updateConfig('benefits', benefits);
        setEditingIndex(null);
    };

    return (
        <div className="row">
            <div className="col-md-6">
                <InputFormGroup
                    label="Título de la Sección"
                    value={config.title || ''}
                    onChange={(e) => updateConfig('title', e.target.value)}
                />
            </div>

            <div className="col-md-6">
                <InputFormGroup
                    label="Subtítulo"
                    value={config.subtitle || ''}
                    onChange={(e) => updateConfig('subtitle', e.target.value)}
                />
            </div>

            <div className="col-md-4">
                <SelectFormGroup
                    label="Columnas (Desktop)"
                    value={config.columns || 3}
                    onChange={(e) => updateConfig('columns', parseInt(e.target.value))}
                    dropdownParent="#section-config-modal-container"
                >
                    <option value="2">2 Columnas</option>
                    <option value="3">3 Columnas</option>
                    <option value="4">4 Columnas</option>
                </SelectFormGroup>
            </div>

            <div className="col-md-4">
                <InputFormGroup
                    label="Color de Iconos"
                    type="color"
                    value={config.icon_color || '#FF6B6B'}
                    onChange={(e) => updateConfig('icon_color', e.target.value)}
                />
            </div>

            <div className="col-md-4">
                <SwitchFormGroup
                    label="Mostrar iconos"
                    checked={config.show_icons !== false}
                    onChange={(e) => updateConfig('show_icons', e.target.checked)}
                />
            </div>

            {/* Beneficios */}
            <div className="col-12 mt-3">
                <hr />
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0">
                        <i className="mdi mdi-star mr-2"></i>
                        Beneficios ({config.benefits?.length || 0})
                    </h6>
                    <button type="button" className="btn btn-sm btn-primary" onClick={addBenefit}>
                        <i className="mdi mdi-plus mr-1"></i>
                        Agregar Beneficio
                    </button>
                </div>

                {config.benefits && config.benefits.length > 0 ? (
                    <div className="benefits-list">
                        {config.benefits.map((benefit, index) => (
                            <div key={index} className="card mb-2 border-left-primary">
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-2">
                                        <div className="benefit-icon mr-3"
                                             style={{
                                                 width: '40px',
                                                 height: '40px',
                                                 borderRadius: '8px',
                                                 background: `${config.icon_color}20`,
                                                 display: 'flex',
                                                 alignItems: 'center',
                                                 justifyContent: 'center'
                                             }}>
                                            <i className={`mdi mdi-${benefit.icon.toLowerCase()}`}
                                               style={{ fontSize: '24px', color: config.icon_color }}></i>
                                        </div>
                                        <div className="flex-1">
                                            <strong>{benefit.title}</strong>
                                            <br />
                                            <small className="text-muted">{benefit.description}</small>
                                        </div>
                                        <div className="btn-group btn-group-sm">
                                            <button
                                                type="button"
                                                className={`btn ${editingIndex === index ? 'btn-info' : 'btn-light'}`}
                                                onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                                            >
                                                <i className="mdi mdi-pencil"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => removeBenefit(index)}
                                            >
                                                <i className="mdi mdi-delete"></i>
                                            </button>
                                        </div>
                                    </div>

                                    {editingIndex === index && (
                                        <div className="card bg-light mt-3">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <SelectFormGroup
                                                            label="Icono"
                                                            value={benefit.icon}
                                                            onChange={(e) => updateBenefit(index, 'icon', e.target.value)}
                                                            dropdownParent="#section-config-modal-container"
                                                        >
                                                            {iconOptions.map(icon => (
                                                                <option key={icon} value={icon}>{icon}</option>
                                                            ))}
                                                        </SelectFormGroup>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <InputFormGroup
                                                            label="Título"
                                                            value={benefit.title}
                                                            onChange={(e) => updateBenefit(index, 'title', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <TextareaFormGroup
                                                            label="Descripción"
                                                            value={benefit.description}
                                                            onChange={(e) => updateBenefit(index, 'description', e.target.value)}
                                                            rows={2}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="alert alert-info">
                        <i className="mdi mdi-information mr-2"></i>
                        No hay beneficios agregados. Haz clic en "Agregar Beneficio" para comenzar.
                    </div>
                )}
            </div>
        </div>
    );
};

export default BenefitsConfigForm;
