import React from 'react';
import InputFormGroup from '../../../../Components/Adminto/form/InputFormGroup';
import TextareaFormGroup from '../../../../Components/Adminto/form/TextareaFormGroup';
import SelectFormGroup from '../../../../Components/Adminto/form/SelectFormGroup';

const PartnersConfigForm = ({ config, updateConfig }) => {
    return (
        <div className="row">
            {/* Section Configuration */}
            <div className="col-12">
                <h6 className="mb-3">
                    <i className="mdi mdi-cog mr-2"></i>
                    Configuración General
                </h6>
            </div>

            <div className="col-12">
                <InputFormGroup
                    label="Título de la Sección"
                    value={config.title || ''}
                    onChange={(e) => updateConfig('title', e.target.value)}
                    placeholder="¿Dónde comprar con *Casillero Virtual?*"
                    help="Usa *palabra* para resaltar en cyan"
                />
            </div>

            <div className="col-12">
                <TextareaFormGroup
                    label="Descripción"
                    value={config.description || ''}
                    onChange={(e) => updateConfig('description', e.target.value)}
                    rows={3}
                    placeholder="Compra en las mejores tiendas de Estados Unidos como *Amazon, Macy's, Apple Store, Walmart* y muchas más..."
                    help="Usa *palabra* para resaltar en negrita cyan"
                />
            </div>

            <div className="col-md-6">
                <SelectFormGroup
                    label="Estilo del Carrusel"
                    value={config.carousel_style || 'grid'}
                    onChange={(e) => updateConfig('carousel_style', e.target.value)}
                    dropdownParent={$('#section-config-modal-container')}
                >
                    <option value="grid">Grid (con logos)</option>
                    <option value="slider">Slider continuo</option>
                </SelectFormGroup>
            </div>

            <div className="col-md-6">
                <SelectFormGroup
                    label="Partners por fila (Desktop)"
                    value={config.items_per_row || 6}
                    onChange={(e) => updateConfig('items_per_row', parseInt(e.target.value))}
                    dropdownParent={$('#section-config-modal-container')}
                >
                    <option value="4">4 Partners</option>
                    <option value="5">5 Partners</option>
                    <option value="6">6 Partners</option>
                    <option value="8">8 Partners</option>
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
                    <option value="gradient">Gradient</option>
                </SelectFormGroup>
            </div>

            <div className="col-md-6">
                <div className="form-group">
                    <label className="d-flex align-items-center">
                        <input
                            type="checkbox"
                            checked={config.auto_scroll || true}
                            onChange={(e) => updateConfig('auto_scroll', e.target.checked)}
                            className="mr-2"
                        />
                        <span>Auto-scroll del carrusel</span>
                    </label>
                    <small className="form-text text-muted">
                        El carrusel avanza automáticamente cada 3 segundos
                    </small>
                </div>
            </div>

            {/* Info Box */}
            <div className="col-12 mt-3">
                <div className="alert alert-info">
                    <i className="mdi mdi-information mr-2"></i>
                    <strong>Nota importante:</strong> Esta sección mostrará automáticamente todos los partners que estén marcados como <strong>visibles</strong> y <strong>activos</strong> en el módulo de Partners. Los partners se ordenan por fecha de creación (más recientes primero).
                </div>
            </div>

            <div className="col-12">
                <div className="alert alert-warning">
                    <i className="mdi mdi-lightbulb-outline mr-2"></i>
                    <strong>Tip:</strong> Para gestionar los partners (agregar, editar, eliminar), ve al módulo <strong>Partners</strong> en el menú principal del admin.
                </div>
            </div>

            {/* Preview Info */}
            <div className="col-12 mt-3">
                <div className="alert alert-success">
                    <i className="mdi mdi-eye mr-2"></i>
                    <strong>Vista Previa:</strong> Los cambios se verán reflejados automáticamente en la vista previa a la derecha con los partners actuales de tu base de datos.
                </div>
            </div>
        </div>
    );
};

export default PartnersConfigForm;
