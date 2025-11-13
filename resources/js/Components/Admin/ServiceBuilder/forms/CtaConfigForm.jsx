import React, { useState } from 'react';
import InputFormGroup from '../../../../Components/Adminto/form/InputFormGroup';
import TextareaFormGroup from '../../../../Components/Adminto/form/TextareaFormGroup';
import SelectFormGroup from '../../../../Components/Adminto/form/SelectFormGroup';

const CtaConfigForm = ({ config, updateConfig }) => {
    const [newButton, setNewButton] = useState({ text: '', link: '', style: 'primary' });

    const addButton = () => {
        if (!newButton.text || !newButton.link) return;
        const buttons = [...(config.buttons || []), newButton];
        updateConfig('buttons', buttons);
        setNewButton({ text: '', link: '', style: 'primary' });
    };

    const removeButton = (index) => {
        const buttons = config.buttons.filter((_, i) => i !== index);
        updateConfig('buttons', buttons);
    };

    return (
        <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label>Título Principal *</label>
                    <input
                        type="text"
                        className="form-control"
                        value={config.title || ''}
                        onChange={(e) => updateConfig('title', e.target.value)}
                        required
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

            <div className="col-12">
                <div className="form-group">
                    <label>Descripción</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={config.description || ''}
                        onChange={(e) => updateConfig('description', e.target.value)}
                    />
                </div>
            </div>

            <div className="col-md-4">
                <div className="form-group">
                    <label>Color de Fondo</label>
                    <input
                        type="color"
                        className="form-control"
                        value={config.background_color || '#FF6B6B'}
                        onChange={(e) => updateConfig('background_color', e.target.value)}
                    />
                </div>
            </div>

            <div className="col-md-4">
                <div className="form-group">
                    <label>Color de Texto</label>
                    <input
                        type="color"
                        className="form-control"
                        value={config.text_color || '#FFFFFF'}
                        onChange={(e) => updateConfig('text_color', e.target.value)}
                    />
                </div>
            </div>

            <div className="col-md-4">
                <div className="custom-control custom-switch mt-4">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="showContactSwitch"
                        checked={config.show_contact || false}
                        onChange={(e) => updateConfig('show_contact', e.target.checked)}
                    />
                    <label className="custom-control-label" htmlFor="showContactSwitch">
                        Mostrar info de contacto
                    </label>
                </div>
            </div>

            {/* Información de Contacto */}
            {config.show_contact && (
                <>
                    <div className="col-12">
                        <hr />
                        <h6>Información de Contacto</h6>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Teléfono</label>
                            <input
                                type="text"
                                className="form-control"
                                value={config.contact_phone || ''}
                                onChange={(e) => updateConfig('contact_phone', e.target.value)}
                                placeholder="+51 999 999 999"
                            />
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={config.contact_email || ''}
                                onChange={(e) => updateConfig('contact_email', e.target.value)}
                                placeholder="contacto@firstclass.pe"
                            />
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group">
                            <label>WhatsApp</label>
                            <input
                                type="text"
                                className="form-control"
                                value={config.contact_whatsapp || ''}
                                onChange={(e) => updateConfig('contact_whatsapp', e.target.value)}
                                placeholder="51999999999"
                            />
                        </div>
                    </div>
                </>
            )}

            {/* Botones de Acción */}
            <div className="col-12">
                <hr />
                <h6>Botones de Acción</h6>
            </div>

            <div className="col-12">
                {config.buttons && config.buttons.map((button, index) => (
                    <div key={index} className="card mb-2">
                        <div className="card-body p-2 d-flex align-items-center">
                            <span className="badge badge-primary mr-2">{index + 1}</span>
                            <span className="flex-1">{button.text} → {button.link}</span>
                            <span className={`badge badge-${button.style === 'primary' ? 'primary' : 'secondary'} mr-2`}>
                                {button.style}
                            </span>
                            <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                onClick={() => removeButton(index)}
                            >
                                <i className="mdi mdi-delete"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="col-md-4">
                <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Texto del botón"
                    value={newButton.text}
                    onChange={(e) => setNewButton({ ...newButton, text: e.target.value })}
                />
            </div>
            <div className="col-md-4">
                <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="URL (ej: /registro)"
                    value={newButton.link}
                    onChange={(e) => setNewButton({ ...newButton, link: e.target.value })}
                />
            </div>
            <div className="col-md-2">
                <select
                    className="form-control form-control-sm"
                    value={newButton.style}
                    onChange={(e) => setNewButton({ ...newButton, style: e.target.value })}
                >
                    <option value="primary">Principal</option>
                    <option value="secondary">Secundario</option>
                </select>
            </div>
            <div className="col-md-2">
                <button
                    type="button"
                    className="btn btn-sm btn-success btn-block"
                    onClick={addButton}
                >
                    <i className="mdi mdi-plus"></i>
                </button>
            </div>
        </div>
    );
};

export default CtaConfigForm;
