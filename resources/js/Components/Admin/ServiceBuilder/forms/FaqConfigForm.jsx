import React from 'react';
import InputFormGroup from '../../../Adminto/form/InputFormGroup';
import TextareaFormGroup from '../../../Adminto/form/TextareaFormGroup';
import SelectFormGroup from '../../../Adminto/form/SelectFormGroup';

const FaqConfigForm = ({ config, updateConfig }) => {
    return (
        <div className="row">
            {/* Header */}
            <div className="col-md-12">
                <h5 className="mb-3">
                    <i className="mdi mdi-format-text mr-2"></i>
                    Textos de la Sección
                </h5>
            </div>

            <div className="col-md-4">
                <InputFormGroup
                    label="Subtítulo"
                    value={config.subtitle || ''}
                    onChange={(e) => updateConfig('subtitle', e.target.value)}
                    placeholder="Soporte"
                    help="Texto pequeño sobre el título"
                />
            </div>

            <div className="col-md-8">
                <InputFormGroup
                    label="Título Principal"
                    value={config.title || ''}
                    onChange={(e) => updateConfig('title', e.target.value)}
                    placeholder="Preguntas *Frecuentes*"
                    help="Usa *palabra* para resaltar en cyan"
                />
            </div>

            <div className="col-md-12">
                <TextareaFormGroup
                    label="Descripción"
                    value={config.description || ''}
                    onChange={(e) => updateConfig('description', e.target.value)}
                    placeholder="Encuentra respuestas rápidas a las preguntas más comunes"
                    rows={2}
                />
            </div>

            <div className="col-md-6">
                <SelectFormGroup
                    label="Fondo"
                    value={config.background || 'white'}
                    onChange={(e) => updateConfig('background', e.target.value)}
                    dropdownParent={$('#section-config-modal-container')}
                >
                    <option value="white">Blanco</option>
                    <option value="accent">Beige (Accent)</option>
                    <option value="gray-50">Gris Claro</option>
                </SelectFormGroup>
            </div>

            <div className="col-md-6">
                <div className="form-group mb-2">
                    <label className="mb-1 form-label">Mostrar Barra de Búsqueda</label>
                    <div className="custom-control custom-switch">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="showSearchSwitch"
                            checked={config.showSearch !== false}
                            onChange={(e) => updateConfig('showSearch', e.target.checked)}
                        />
                        <label className="custom-control-label" htmlFor="showSearchSwitch">
                            {config.showSearch !== false ? 'Activado' : 'Desactivado'}
                        </label>
                    </div>
                </div>
            </div>

            <div className="col-12 mt-3">
                <div className="alert alert-info">
                    <i className="mdi mdi-information mr-2"></i>
                    <strong>Nota:</strong> Las preguntas frecuentes se administran desde el módulo <strong>"Preguntas Frecuentes"</strong> en el menú principal. Esta sección mostrará automáticamente todas las FAQs activas.
                </div>
            </div>
        </div>
    );
};

export default FaqConfigForm;
