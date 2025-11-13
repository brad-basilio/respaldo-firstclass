import React, { useState } from 'react';
import InputFormGroup from '../../../../Components/Adminto/form/InputFormGroup';
import TextareaFormGroup from '../../../../Components/Adminto/form/TextareaFormGroup';
import SelectFormGroup from '../../../../Components/Adminto/form/SelectFormGroup';

const iconOptions = ['User', 'Package', 'Plane', 'CheckCircle', 'MapPin', 'Truck', 'Mail', 'Shield', 'Clock', 'Star'];

const StepsConfigForm = ({ config, updateConfig }) => {
    const [editingIndex, setEditingIndex] = useState(null);

    const addStep = () => {
        const steps = [...(config.steps || []), {
            icon: 'Package',
            title: 'Nuevo Paso',
            description: 'Descripción del paso'
        }];
        updateConfig('steps', steps);
    };

    const updateStep = (index, field, value) => {
        const steps = [...config.steps];
        steps[index] = { ...steps[index], [field]: value };
        updateConfig('steps', steps);
    };

    const removeStep = (index) => {
        const steps = config.steps.filter((_, i) => i !== index);
        updateConfig('steps', steps);
    };

    const moveStep = (index, direction) => {
        const steps = [...config.steps];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= steps.length) return;
        [steps[index], steps[newIndex]] = [steps[newIndex], steps[index]];
        updateConfig('steps', steps);
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

            <div className="col-md-6">
                <div className="custom-control custom-switch">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="autoAdvanceSwitch"
                        checked={config.auto_advance || false}
                        onChange={(e) => updateConfig('auto_advance', e.target.checked)}
                    />
                    <label className="custom-control-label" htmlFor="autoAdvanceSwitch">
                        Auto-avance automático
                    </label>
                </div>
            </div>

            {config.auto_advance && (
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Intervalo (ms)</label>
                        <input
                            type="number"
                            className="form-control"
                            value={config.interval || 3000}
                            onChange={(e) => updateConfig('interval', parseInt(e.target.value))}
                        />
                    </div>
                </div>
            )}

            <div className="col-md-6">
                <div className="custom-control custom-switch">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="showNumbersSwitch"
                        checked={config.show_numbers !== false}
                        onChange={(e) => updateConfig('show_numbers', e.target.checked)}
                    />
                    <label className="custom-control-label" htmlFor="showNumbersSwitch">
                        Mostrar números de pasos
                    </label>
                </div>
            </div>

            {/* Pasos */}
            <div className="col-12 mt-3">
                <hr />
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6>Pasos ({config.steps?.length || 0})</h6>
                    <button type="button" className="btn btn-sm btn-primary" onClick={addStep}>
                        <i className="mdi mdi-plus mr-1"></i>
                        Agregar Paso
                    </button>
                </div>

                {config.steps && config.steps.map((step, index) => (
                    <div key={index} className="card mb-2">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-2">
                                <span className="badge badge-primary mr-2">{index + 1}</span>
                                <strong className="flex-1">{step.title}</strong>
                                <div className="btn-group btn-group-sm">
                                    <button
                                        type="button"
                                        className="btn btn-light"
                                        onClick={() => moveStep(index, 'up')}
                                        disabled={index === 0}
                                    >
                                        <i className="mdi mdi-arrow-up"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-light"
                                        onClick={() => moveStep(index, 'down')}
                                        disabled={index === config.steps.length - 1}
                                    >
                                        <i className="mdi mdi-arrow-down"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-info"
                                        onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                                    >
                                        <i className="mdi mdi-pencil"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => removeStep(index)}
                                    >
                                        <i className="mdi mdi-delete"></i>
                                    </button>
                                </div>
                            </div>

                            {editingIndex === index && (
                                <div className="row mt-2">
                                    <div className="col-md-4">
                                        <label className="small">Icono</label>
                                        <select
                                            className="form-control form-control-sm"
                                            value={step.icon}
                                            onChange={(e) => updateStep(index, 'icon', e.target.value)}
                                        >
                                            {iconOptions.map(icon => (
                                                <option key={icon} value={icon}>{icon}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-8">
                                        <label className="small">Título</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            value={step.title}
                                            onChange={(e) => updateStep(index, 'title', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-12 mt-2">
                                        <label className="small">Descripción</label>
                                        <textarea
                                            className="form-control form-control-sm"
                                            rows="2"
                                            value={step.description}
                                            onChange={(e) => updateStep(index, 'description', e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StepsConfigForm;
