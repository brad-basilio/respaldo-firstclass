import React, { useState } from 'react';
import InputFormGroup from '../../../../Components/Adminto/form/InputFormGroup';
import TextareaFormGroup from '../../../../Components/Adminto/form/TextareaFormGroup';
import SelectFormGroup from '../../../../Components/Adminto/form/SelectFormGroup';

const FaqConfigForm = ({ config, updateConfig }) => {
    const [editingIndex, setEditingIndex] = useState(null);

    const addQuestion = () => {
        const questions = [...(config.questions || []), {
            question: 'Nueva pregunta',
            answer: 'Respuesta a la pregunta'
        }];
        updateConfig('questions', questions);
    };

    const updateQuestion = (index, field, value) => {
        const questions = [...config.questions];
        questions[index] = { ...questions[index], [field]: value };
        updateConfig('questions', questions);
    };

    const removeQuestion = (index) => {
        const questions = config.questions.filter((_, i) => i !== index);
        updateConfig('questions', questions);
    };

    const moveQuestion = (index, direction) => {
        const questions = [...config.questions];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= questions.length) return;
        [questions[index], questions[newIndex]] = [questions[newIndex], questions[index]];
        updateConfig('questions', questions);
    };

    return (
        <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label>Título de la Sección</label>
                    <input
                        type="text"
                        className="form-control"
                        value={config.title || ''}
                        onChange={(e) => updateConfig('title', e.target.value)}
                    />
                </div>
            </div>

            <div className="col-md-6">
                <div className="form-group">
                    <label>Subtítulo</label>
                    <input
                        type="text"
                        className="form-control"
                        value={config.subtitle || ''}
                        onChange={(e) => updateConfig('subtitle', e.target.value)}
                    />
                </div>
            </div>

            <div className="col-md-4">
                <div className="form-group">
                    <label>Primer ítem abierto</label>
                    <input
                        type="number"
                        className="form-control"
                        min="0"
                        value={config.default_open || 0}
                        onChange={(e) => updateConfig('default_open', parseInt(e.target.value))}
                    />
                    <small className="text-muted">0 = primero, -1 = ninguno</small>
                </div>
            </div>

            <div className="col-md-4">
                <div className="custom-control custom-switch mt-4">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="allowMultipleSwitch"
                        checked={config.allow_multiple || false}
                        onChange={(e) => updateConfig('allow_multiple', e.target.checked)}
                    />
                    <label className="custom-control-label" htmlFor="allowMultipleSwitch">
                        Permitir múltiples abiertos
                    </label>
                </div>
            </div>

            <div className="col-md-4">
                <div className="form-group">
                    <label>Color de Acento</label>
                    <input
                        type="color"
                        className="form-control"
                        value={config.accent_color || '#FF6B6B'}
                        onChange={(e) => updateConfig('accent_color', e.target.value)}
                    />
                </div>
            </div>

            {/* Preguntas */}
            <div className="col-12 mt-3">
                <hr />
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6>Preguntas Frecuentes ({config.questions?.length || 0})</h6>
                    <button type="button" className="btn btn-sm btn-primary" onClick={addQuestion}>
                        <i className="mdi mdi-plus mr-1"></i>
                        Agregar Pregunta
                    </button>
                </div>

                {config.questions && config.questions.map((item, index) => (
                    <div key={index} className="card mb-2">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-2">
                                <span className="badge badge-primary mr-2">{index + 1}</span>
                                <strong className="flex-1">{item.question}</strong>
                                <div className="btn-group btn-group-sm">
                                    <button
                                        type="button"
                                        className="btn btn-light"
                                        onClick={() => moveQuestion(index, 'up')}
                                        disabled={index === 0}
                                    >
                                        <i className="mdi mdi-arrow-up"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-light"
                                        onClick={() => moveQuestion(index, 'down')}
                                        disabled={index === config.questions.length - 1}
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
                                        onClick={() => removeQuestion(index)}
                                    >
                                        <i className="mdi mdi-delete"></i>
                                    </button>
                                </div>
                            </div>

                            {editingIndex === index && (
                                <div className="row mt-2">
                                    <div className="col-12">
                                        <label className="small">Pregunta</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            value={item.question}
                                            onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-12 mt-2">
                                        <label className="small">Respuesta</label>
                                        <textarea
                                            className="form-control form-control-sm"
                                            rows="3"
                                            value={item.answer}
                                            onChange={(e) => updateQuestion(index, 'answer', e.target.value)}
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

export default FaqConfigForm;
