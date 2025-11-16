import React from 'react';
import InputFormGroup from '../../../Adminto/form/InputFormGroup';
import SelectFormGroup from '../../../Adminto/form/SelectFormGroup';
import TextareaFormGroup from '../../../Adminto/form/TextareaFormGroup';

const CtaConfigForm = ({ config, updateConfig }) => {
    const handleButtonChange = (index, field, value) => {
        const buttons = [...(config.buttons || [])];
        buttons[index] = { ...buttons[index], [field]: value };
        updateConfig('buttons', buttons);
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
                <SelectFormGroup
                    label="Estilo de CTA"
                    value={config.style || 'simple'}
                    onChange={(e) => updateConfig('style', e.target.value)}
                    dropdownParent={$('#section-config-modal-container')}
                >
                    <option value="simple">Simple (Card con borde)</option>
                    <option value="primary">Primary (Fondo Cyan con animaciones)</option>
                </SelectFormGroup>
                <small className="form-text text-muted">
                    <strong>Simple:</strong> Fondo beige (accent) con borde primary - Estilo minimalista<br />
                    <strong>Primary:</strong> Fondo cyan/primary con círculos animados - Estilo llamativo
                </small>
            </div>

            <div className="col-md-12 mt-3">
                <InputFormGroup
                    label="Título del CTA"
                    value={config.title || ''}
                    onChange={(e) => updateConfig('title', e.target.value)}
                    placeholder="¿Listo para comenzar?"
                />
            </div>

            <div className="col-12">
                <TextareaFormGroup
                    label="Descripción"
                    value={config.description || ''}
                    onChange={(e) => updateConfig('description', e.target.value)}
                    rows={3}
                    placeholder="Únete a miles de clientes satisfechos..."
                />
            </div>

            {/* Buttons Configuration */}
            <div className="col-12 mt-4">
                <hr />
                <h6 className="mb-3">
                    <i className="mdi mdi-cursor-pointer mr-2"></i>
                    Botones de Acción
                </h6>
            </div>

            {config.buttons && config.buttons.map((button, index) => (
                <div key={index} className="col-12 mb-3">
                    <div className="card bg-light">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-md-3">
                                    <div className="form-group mb-0">
                                        <label className="font-weight-bold">
                                            {button.type === 'advisor' ? '💬 Botón Asesor' : '📦 Botón Casillero'}
                                        </label>
                                        <p className="text-muted small mb-0">
                                            {button.type === 'advisor' 
                                                ? 'Abre chat con asesor' 
                                                : 'Abre/Registra casillero virtual'}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <InputFormGroup
                                        label="Texto del Botón"
                                        value={button.text || ''}
                                        onChange={(e) => handleButtonChange(index, 'text', e.target.value)}
                                        placeholder={button.type === 'advisor' ? 'Consultar con asesor' : 'Abrir mi casillero gratis'}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="d-block">&nbsp;</label>
                                        <div className="custom-control custom-switch">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id={`button-show-${index}`}
                                                checked={button.show !== false}
                                                onChange={(e) => handleButtonChange(index, 'show', e.target.checked)}
                                            />
                                            <label className="custom-control-label" htmlFor={`button-show-${index}`}>
                                                {button.show !== false ? 'Visible' : 'Oculto'}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Preview Info */}
            <div className="col-12 mt-4">
                <div className="alert alert-info">
                    <i className="mdi mdi-information mr-2"></i>
                    <strong>Nota:</strong> Los botones tienen funcionalidades fijas:
                    <ul className="mb-0 mt-2">
                        <li><strong>Botón Asesor:</strong> Abre el chat/contacto con asesor especializado</li>
                        <li><strong>Botón Casillero:</strong> Abre o registra casillero virtual del usuario</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CtaConfigForm;
