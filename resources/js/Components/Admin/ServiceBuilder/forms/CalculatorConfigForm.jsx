import React from 'react';

const CalculatorConfigForm = ({ config, updateConfig }) => {
    return (
        <div className="row">
            <div className="col-12">
                <div className="alert alert-info">
                    <i className="mdi mdi-information mr-2"></i>
                    El componente Calculadora utiliza el componente <code>TarifasNormativas</code> existente.
                    Esta sección no requiere configuración adicional ya que hereda toda la lógica y diseño del componente principal.
                </div>
            </div>

            <div className="col-md-6">
                <div className="form-group">
                    <label>Título de la Sección</label>
                    <input
                        type="text"
                        className="form-control"
                        value={config.title || ''}
                        onChange={(e) => updateConfig('title', e.target.value)}
                        placeholder="Calcula tus tarifas"
                    />
                    <small className="text-muted">Opcional: título personalizado para esta sección</small>
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
                        placeholder="Obtén una cotización instantánea"
                    />
                </div>
            </div>

            <div className="col-md-4">
                <div className="custom-control custom-switch">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="showTitleSwitch"
                        checked={config.show_title !== false}
                        onChange={(e) => updateConfig('show_title', e.target.checked)}
                    />
                    <label className="custom-control-label" htmlFor="showTitleSwitch">
                        Mostrar título
                    </label>
                </div>
            </div>

            <div className="col-md-4">
                <div className="custom-control custom-switch">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="fullWidthSwitch"
                        checked={config.full_width || false}
                        onChange={(e) => updateConfig('full_width', e.target.checked)}
                    />
                    <label className="custom-control-label" htmlFor="fullWidthSwitch">
                        Ancho completo
                    </label>
                </div>
            </div>

            <div className="col-md-4">
                <div className="form-group">
                    <label>Color de Fondo</label>
                    <input
                        type="color"
                        className="form-control"
                        value={config.background_color || '#F8F9FA'}
                        onChange={(e) => updateConfig('background_color', e.target.value)}
                    />
                </div>
            </div>

            <div className="col-12 mt-3">
                <div className="card bg-light">
                    <div className="card-body">
                        <h6 className="mb-2">
                            <i className="mdi mdi-lightbulb-on-outline mr-2"></i>
                            Consejos de Uso
                        </h6>
                        <ul className="mb-0 small">
                            <li>La calculadora es completamente funcional y reutilizable</li>
                            <li>Puedes incluir esta sección en múltiples servicios</li>
                            <li>Los cálculos se realizan en tiempo real basados en las tarifas configuradas</li>
                            <li>El componente maneja automáticamente las conversiones de peso y dimensiones</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalculatorConfigForm;
