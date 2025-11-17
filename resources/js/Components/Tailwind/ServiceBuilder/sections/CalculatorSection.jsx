import React, { useState } from 'react';
import { 
    Calculator, DollarSign, Scale, Plane, Package, ShieldCheck, 
    FileText, CheckCircle, Info, AlertTriangle, ArrowRight
} from 'lucide-react';

const CalculatorSection = ({ config, generals = [] }) => {
    // Obtener valores de generals (igual que TarifasNormativas.jsx)
    const fleteRate = Number(generals?.find(x => x.correlative === 'importation_flete')?.description || 3.86);
    const servicioFijo = Number(generals?.find(x => x.correlative === 'importation_servicio')?.description || 10);
    const seguroRate = Number(generals?.find(x => x.correlative === 'importation_seguro')?.description || 0);
    const derechoArancelarioRate = Number(generals?.find(x => x.correlative === 'importation_derecho_arancelario')?.description || 0);
    
    // Obtener descripciones de generals
    const fleteDescription = generals?.find(x => x.correlative === 'importation_flete_descripcion')?.description || 'Recepción, almacenaje, consolidación, preparación y transporte internacional';
    const derechoArancelarioDescription = generals?.find(x => x.correlative === 'importation_derecho_arancelario_descripcion')?.description || 'ADV: 4%\nIGV: 16%\nIPM: 2%';
    
    const cargosFijosIncluye = [
        `Seguro con cobertura hasta $200 USD`,
        'Proceso y trámite de importación postal',
        'Entrega en cualquier parte de Perú'
    ];

    const {
        title = '*Calcula* tu Tarifa',
        subtitle = 'Usa nuestra calculadora para estimar el costo de tu envío',
        pasos = [
            { numero: 1, titulo: "Pesa tu Paquete", descripcion: "Calcula el peso real o volumétrico en kilogramos", icon: "Scale" },
            { numero: 2, titulo: "Calcula el Flete", descripcion: `Multiplica el peso por $${fleteRate.toFixed(2)} USD por kg`, icon: "Calculator" },
            { numero: 3, titulo: "Suma Cargos Fijos", descripcion: "Agrega $10 USD de servicio por envío", icon: "DollarSign" },
            { numero: 4, titulo: "Total a Pagar", descripcion: "Obtén el costo total de tu envío", icon: "CheckCircle" }
        ],
        showBreakdown = true,
        showSteps = true,
        bgColor = 'bg-accent'
    } = config;

    const [selectedWeight, setSelectedWeight] = useState(2.5);
    const [productValue, setProductValue] = useState(100);
    const [useSlider, setUseSlider] = useState(true);
    const [showWithProduct, setShowWithProduct] = useState(false);

    const ICON_MAP = { Scale, Calculator, DollarSign, CheckCircle, Plane, Package, ShieldCheck, FileText, Info, AlertTriangle, ArrowRight };

    const calcularTarifa = (pesoKg, valorProducto) => {
        const flete = pesoKg * fleteRate;
        const cargosFijos = servicioFijo;
        const aplicaImpuestos = valorProducto > 200;
        
        let seguro = 0;
        let derechoArancelario = 0;
        
        if (aplicaImpuestos && seguroRate > 0) {
            seguro = valorProducto * (seguroRate / 100);
        }
        
        if (aplicaImpuestos && derechoArancelarioRate > 0) {
            const cif = valorProducto + flete + seguro;
            derechoArancelario = cif * (derechoArancelarioRate / 100);
        }
        
        const totalEnvio = flete + cargosFijos + seguro + derechoArancelario;
        const total = valorProducto + totalEnvio;
        
        return {
            flete: flete.toFixed(2),
            cargosFijos: cargosFijos.toFixed(2),
            seguro: seguro.toFixed(2),
            derechoArancelario: derechoArancelario.toFixed(2),
            totalEnvio: totalEnvio.toFixed(2),
            total: total.toFixed(2),
            aplicaImpuestos
        };
    };

    const tarifa = calcularTarifa(selectedWeight, productValue);

    const processTitle = (text) => {
        if (!text) return null;
        const parts = text.split(/(\*[^*]+\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('*') && part.endsWith('*')) {
                return <span key={index} className="customtext-primary">{part.slice(1, -1)}</span>;
            }
            return <span key={index}>{part}</span>;
        });
    };

    return (
        <>
            {/* Calculadora */}
            <section className={`py-16 ${bgColor}`}>
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                {processTitle(title)}
                            </h2>
                            {subtitle && <p className="text-xl customtext-secondary">{subtitle}</p>}
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            {/* Valor del producto */}
                            <div className="mb-8">
                                <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                                    <DollarSign className="w-5 h-5 text-primary" />
                                    Valor del producto (USD)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="5000"
                                    value={productValue}
                                    onChange={(e) => setProductValue(Number(e.target.value))}
                                    className="w-full px-6 py-4 border-2 border-primary/20 rounded-xl text-center text-3xl font-bold text-primary focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                                    placeholder="100"
                                />
                                <div className="text-sm mt-3 text-center">
                                    {productValue <= 200 ? (
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 inline-flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                            <span className="text-green-700 font-semibold">Solo pagas flete + servicio de importación</span>
                                        </div>
                                    ) : (
                                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 inline-flex items-center gap-2">
                                            <AlertTriangle className="w-4 h-4 text-orange-600" />
                                            <span className="text-orange-700 font-semibold">Se aplicarán impuestos adicionales</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Peso del envío */}
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-4">
                                    <label className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        <Scale className="w-5 h-5 text-primary" />
                                        Peso de tu envío (kilogramos)
                                    </label>
                                    <button
                                        onClick={() => setUseSlider(!useSlider)}
                                        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-primary/20 rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
                                    >
                                        {useSlider ? (
                                            <>
                                                <Calculator className="w-4 h-4 text-primary" />
                                                <span className="text-sm font-medium text-gray-700">Ingresar peso</span>
                                            </>
                                        ) : (
                                            <>
                                                <Scale className="w-4 h-4 text-primary" />
                                                <span className="text-sm font-medium text-gray-700">Usar selector</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                {useSlider ? (
                                    <div>
                                        <input
                                            type="range"
                                            min="1"
                                            max="100"
                                            step="0.5"
                                            value={selectedWeight}
                                            onChange={(e) => setSelectedWeight(Number(e.target.value))}
                                            className="w-full h-3 bg-primary rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                        <div className="flex justify-between items-center text-sm text-gray-600 mt-3">
                                            <span className="text-gray-500">1 kg</span>
                                            <div className="text-center">
                                                <div className="text-4xl font-bold text-primary">{selectedWeight}</div>
                                                <div className="text-xs text-gray-500 mt-1">kilogramos</div>
                                            </div>
                                            <span className="text-gray-500">100 kg</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <input
                                            type="number"
                                            min="1"
                                            max="100"
                                            step="0.1"
                                            value={selectedWeight}
                                            onChange={(e) => setSelectedWeight(Number(e.target.value))}
                                            className="w-full px-6 py-4 border-2 border-primary/20 rounded-xl text-center text-3xl font-bold text-secondary focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all"
                                            placeholder="0.0"
                                        />
                                        <div className="text-center mt-3 text-xs text-gray-500">
                                            Ingresa el peso de tu paquete en kilogramos
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Resultados */}
                            <div className="bg-white rounded-xl p-6 shadow-md">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <FileText className="w-6 h-6 text-primary" />
                                    Desglose de tu envío
                                </h3>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-accent rounded-lg border border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center border border-gray-300">
                                                <Plane className="w-5 h-5 customtext-primary" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">Flete de Envío Internacional</div>
                                                <div className="text-sm text-gray-600">{selectedWeight} kg × ${fleteRate.toFixed(2)}</div>
                                            </div>
                                        </div>
                                        <div className="text-2xl font-bold customtext-primary">${tarifa.flete}</div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-accent rounded-lg border border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center border border-gray-300">
                                                <Package className="w-5 h-5 customtext-secondary" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">Servicio de Importación</div>
                                                <div className="text-sm text-gray-600">Gestión aduanera completa</div>
                                            </div>
                                        </div>
                                        <div className="text-2xl font-bold customtext-secondary">${tarifa.cargosFijos}</div>
                                    </div>

                                    {tarifa.aplicaImpuestos && Number(tarifa.seguro) > 0 && (
                                        <div className="flex items-center justify-between p-4 bg-accent rounded-lg border border-gray-200">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center border border-gray-300">
                                                    <ShieldCheck className="w-5 h-5 customtext-neutral-dark" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">Seguro Adicional</div>
                                                    <div className="text-sm text-gray-600">{seguroRate}% sobre valor producto</div>
                                                </div>
                                            </div>
                                            <div className="text-2xl font-bold customtext-neutral-dark">${tarifa.seguro}</div>
                                        </div>
                                    )}

                                    {tarifa.aplicaImpuestos && Number(tarifa.derechoArancelario) > 0 && (
                                        <div className="flex items-center justify-between p-4 bg-accent rounded-lg border border-gray-200">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center border border-gray-300">
                                                    <FileText className="w-5 h-5 customtext-neutral-light" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900 flex items-center gap-2">
                                                        Impuestos Perú ({derechoArancelarioRate}%)
                                                        <div className="relative group">
                                                            <Info className="w-4 h-4 customtext-primary cursor-help" />
                                                            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg z-10">
                                                                <div className="whitespace-pre-line">{derechoArancelarioDescription}</div>
                                                                <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-sm text-gray-600">{derechoArancelarioRate}% sobre valor CIF</div>
                                                </div>
                                            </div>
                                            <div className="text-2xl font-bold customtext-neutral-light">${tarifa.derechoArancelario}</div>
                                        </div>
                                    )}

                                    <div className="border-t-2 border-dashed border-gray-300 my-3"></div>

                                    <div className="w-1/2 ml-auto bg-primary rounded-xl p-6 text-white shadow-lg">
                                        <div className="flex flex-row items-center justify-between">
                                            <div>
                                                <div className="text-sm opacity-90 mb-1">Total Costo de Envío</div>
                                                <div className="text-lg font-semibold mb-2">FirstClass</div>
                                            </div>
                                            <div className="text-5xl font-bold">${tarifa.totalEnvio}</div>
                                        </div>
                                    </div>

                                    <div className="w-1/2 ml-auto bg-accent rounded-xl p-4 border-2 border-gray-200">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={showWithProduct}
                                                onChange={(e) => setShowWithProduct(e.target.checked)}
                                                className="w-6 h-6 rounded border-gray-300 cursor-pointer"
                                            />
                                            <div className="font-semibold text-sm text-gray-900">
                                                ¿Quieres saber cuánto sería con tu producto incluido?
                                            </div>
                                        </label>
                                    </div>

                                    {showWithProduct && (
                                        <div className="w-1/2 bg-primary ml-auto rounded-xl p-6 text-white shadow-lg">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="text-sm opacity-90">TOTAL COMPLETO</div>
                                                    <div className="text-base font-medium">Producto + Envío</div>
                                                </div>
                                                <div className="text-5xl font-bold">${tarifa.total}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 bg-accent border border-gray-200 rounded-xl p-5">
                                <div className="flex items-start gap-3">
                                    <ShieldCheck className="w-6 h-6 customtext-primary flex-shrink-0 mt-1" />
                                    <div className="text-sm text-gray-900">
                                        <strong className="block mb-2">💡 Importante:</strong> 
                                        <p className="mb-2">El costo mostrado arriba es el <strong>servicio de envío de FirstClass</strong>. El precio del producto lo pagas directamente a la tienda donde compras.</p>
                                        {productValue <= 200 ? (
                                            <p>✓ <strong className="text-green-700">Sin impuestos adicionales</strong> para productos hasta $200 USD.</p>
                                        ) : (
                                            <p>⚠️ Productos mayores a $200 USD incluyen seguro adicional ({seguroRate}%) y derecho arancelario ({derechoArancelarioRate}%).</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Desglose */}
            {showBreakdown && (
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    <span className="customtext-primary">Desglose</span> de Tarifas
                                </h2>
                                <p className="text-xl customtext-secondary">Transparencia total en nuestros costos</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-accent rounded-2xl p-8 shadow-lg border border-gray-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                                            <Plane className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">Flete</h3>
                                            <p className="customtext-primary font-semibold">${fleteRate.toFixed(2)} USD por kilogramo</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                                        <div className="font-semibold text-gray-900 mb-2">Rango de peso:</div>
                                        <div className="text-gray-700">1kg hasta 100kg</div>
                                    </div>
                                    <div className="text-gray-600">
                                        <strong className="text-gray-900">Incluye:</strong>
                                        <p className="mt-2">{fleteDescription}</p>
                                    </div>
                                </div>

                                <div className="bg-accent rounded-2xl p-8 shadow-lg border border-gray-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                                            <FileText className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">Cargos Fijos</h3>
                                            <p className="customtext-secondary font-semibold">${servicioFijo.toFixed(2)} USD</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                                        <div className="font-semibold text-gray-900 mb-2">Aplicación:</div>
                                        <div className="text-gray-700">Se calcula por envío</div>
                                    </div>
                                    <div className="space-y-2">
                                        <strong className="text-gray-900">Incluye:</strong>
                                        {cargosFijosIncluye.map((item, index) => (
                                            <div key={index} className="flex items-start gap-2">
                                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Pasos */}
            {showSteps && (
                <section className="py-16 bg-accent">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    ¿Cómo <span className="customtext-primary">Calcular</span> tu Envío?
                                </h2>
                                <p className="text-xl customtext-secondary">Sigue estos simples pasos</p>
                            </div>

                            <div className="grid md:grid-cols-4 gap-6">
                                {pasos.map((paso, index) => {
                                    const IconComponent = ICON_MAP[paso.icon] || CheckCircle;
                                    return (
                                        <div key={index} className="relative">
                                            <div className="bg-white rounded-xl p-6 h-full border border-gray-200 shadow-lg">
                                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                                                    {paso.numero}
                                                </div>
                                                <IconComponent className="w-8 h-8 customtext-primary mb-3" />
                                                <h3 className="font-bold text-lg text-gray-900 mb-2">{paso.titulo}</h3>
                                                <p className="text-gray-600 text-sm">{paso.descripcion}</p>
                                            </div>
                                            {index < pasos.length - 1 && (
                                                <ArrowRight className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 w-6 h-6 text-primary" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default CalculatorSection;
