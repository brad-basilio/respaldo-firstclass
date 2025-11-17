import React from 'react';
import InputFormGroup from '../../../Adminto/form/InputFormGroup';
import TextareaFormGroup from '../../../Adminto/form/TextareaFormGroup';
import SwitchFormGroup from '../../../Adminto/form/SwitchFormGroup';
import SelectFormGroup from '../../../Adminto/form/SelectFormGroup';

const CalculatorConfigForm = ({ config, updateConfig }) => {
    const handleChange = (field, value) => {
        updateConfig(field, value);
    };

    return (
        <div className="row">
            {/* Títulos y Descripción */}
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
                    onChange={(e) => handleChange('subtitle', e.target.value)}
                    placeholder="Tarifas y cotizaciones"
                    help="Texto pequeño sobre el título"
                />
            </div>

            <div className="col-md-8">
                <InputFormGroup
                    label="Título Principal"
                    value={config.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="Calcula tu *envío*"
                    help="Usa *palabra* para resaltar en cyan"
                />
            </div>

            <div className="col-md-12">
                <TextareaFormGroup
                    label="Descripción"
                    value={config.description || ''}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Calcula el costo de tu envío de manera rápida y sencilla"
                    rows={2}
                    help="Usa *palabra* para negrita"
                />
            </div>

            <div className="col-12"><hr className="mt-4 mb-4" /></div>

            {/* Configuración de la Calculadora */}
            <div className="col-md-12">
                <h5 className="mb-3">
                    <i className="mdi mdi-tune mr-2"></i>
                    Opciones de la Calculadora
                </h5>
            </div>

            <div className="col-md-3">
                <InputFormGroup
                    label="Peso Inicial (kg)"
                    type="number"
                    step="0.5"
                    value={config.defaultWeight || 2.5}
                    onChange={(e) => handleChange('defaultWeight', parseFloat(e.target.value))}
                    placeholder="2.5"
                />
            </div>

            <div className="col-md-3">
                <InputFormGroup
                    label="Peso Mínimo (kg)"
                    type="number"
                    step="0.1"
                    value={config.minWeight || 0.5}
                    onChange={(e) => handleChange('minWeight', parseFloat(e.target.value))}
                    placeholder="0.5"
                />
            </div>

            <div className="col-md-3">
                <InputFormGroup
                    label="Peso Máximo (kg)"
                    type="number"
                    step="1"
                    value={config.maxWeight || 70}
                    onChange={(e) => handleChange('maxWeight', parseFloat(e.target.value))}
                    placeholder="70"
                />
            </div>

            <div className="col-md-3">
                <InputFormGroup
                    label="Valor Producto Inicial (USD)"
                    type="number"
                    step="10"
                    value={config.defaultProductValue || 100}
                    onChange={(e) => handleChange('defaultProductValue', parseFloat(e.target.value))}
                    placeholder="100"
                />
            </div>

            <div className="col-md-4">
                <SwitchFormGroup
                    label="Mostrar Toggle Valor Producto"
                    checked={config.showProductValueToggle !== false}
                    onChange={(checked) => handleChange('showProductValueToggle', checked)}
                    help="Permitir incluir valor del producto"
                />
            </div>

            <div className="col-md-4">
                <SwitchFormGroup
                    label="Mostrar Pasos de Cotización"
                    checked={config.showSteps !== false}
                    onChange={(checked) => handleChange('showSteps', checked)}
                    help="Sección ¿Cómo Calcular?"
                />
            </div>

            <div className="col-md-4">
                <SwitchFormGroup
                    label="Mostrar Desglose de Tarifas"
                    checked={config.showBreakdown !== false}
                    onChange={(checked) => handleChange('showBreakdown', checked)}
                    help="Sección desglose detallado"
                />
            </div>

            <div className="col-md-4">
                <SelectFormGroup
                    label="Fondo"
                    value={config.bgColor || 'bg-accent'}
                    onChange={(e) => handleChange('bgColor', e.target.value)}
                    options={[
                        { value: 'bg-white', label: 'Blanco' },
                        { value: 'bg-accent', label: 'Beige (Accent)' },
                        { value: 'bg-gray-50', label: 'Gris Claro' }
                    ]}
                    dropdownParent="body"
                />
            </div>

            <div className="col-12 mt-3">
                <div className="alert alert-info">
                    <i className="mdi mdi-information mr-2"></i>
                    <strong>Calculadora Completa:</strong> Incluye calculadora interactiva, desglose de tarifas y pasos de cotización (opcional).
                </div>
                <div className="alert alert-warning mt-2">
                    <i className="mdi mdi-alert mr-2"></i>
                    <strong>Nota:</strong> Las tarifas (flete, servicio, seguro, derecho arancelario) se cargan desde la configuración de Generals del sistema.
                </div>
            </div>
        </div>
    );
};

export default CalculatorConfigForm;
