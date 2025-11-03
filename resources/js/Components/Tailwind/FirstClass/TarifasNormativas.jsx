import React, { useState, useEffect, useRef } from "react";
import {
    Package,
    DollarSign,
    Scale,
    ShieldCheck,
    AlertTriangle,
    FileText,
    Truck,
    CheckCircle,
    XCircle,
    ArrowRight,
    Calculator,
    Globe,
    Box,
    Plane,
    Clock,
    Ban,
    AlertCircle,
    TrendingUp,
    Home,
    Headphones,
    ChevronDown,
    Info
} from "lucide-react";
import Breadcrumbs from "./Breadcrumbs";
import AdvisorButton from "./AdvisorButton";

const TarifasNormativas = ({ data, items, generals = [], cart, setCart, pages, isUser, contacts }) => {
    const [selectedWeight, setSelectedWeight] = useState(2.5); // Peso en kg (equivalente a ~5 lb)
    const [productValue, setProductValue] = useState(100); // Valor del producto en USD
    const [useSlider, setUseSlider] = useState(true); // Switch entre slider e input
    const [showWithProduct, setShowWithProduct] = useState(false); // Switch para mostrar total con producto
    const [isVisible, setIsVisible] = useState({});
    const observerRef = useRef(null);

    // Obtener valores de generals
    const fleteRate = Number(generals?.find(x => x.correlative === 'importation_flete')?.description || 3.86); // USD por kg
    const servicioFijo = Number(generals?.find(x => x.correlative === 'importation_servicio')?.description || 10);
    const seguroRate = Number(generals?.find(x => x.correlative === 'importation_seguro')?.description || 0);
    const derechoArancelarioRate = Number(generals?.find(x => x.correlative === 'importation_derecho_arancelario')?.description || 0);

    // Agregar estilos personalizados para el slider
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            input[type="range"].slider-thumb::-webkit-slider-thumb {
                appearance: none;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: linear-gradient(135deg, #1e3a8a 0%, #0ea5e9 100%);
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(30, 58, 138, 0.4);
                transition: all 0.3s ease;
            }
            input[type="range"].slider-thumb::-webkit-slider-thumb:hover {
                transform: scale(1.2);
                box-shadow: 0 6px 16px rgba(30, 58, 138, 0.6);
            }
            input[type="range"].slider-thumb::-moz-range-thumb {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: linear-gradient(135deg, #1e3a8a 0%, #0ea5e9 100%);
                cursor: pointer;
                border: none;
                box-shadow: 0 4px 12px rgba(30, 58, 138, 0.4);
                transition: all 0.3s ease;
            }
            input[type="range"].slider-thumb::-moz-range-thumb:hover {
                transform: scale(1.2);
                box-shadow: 0 6px 16px rgba(30, 58, 138, 0.6);
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    // Intersection Observer for animations
    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({
                            ...prev,
                            [entry.target.id]: true
                        }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('[data-animate]');
        elements.forEach(el => observerRef.current?.observe(el));

        return () => observerRef.current?.disconnect();
    }, []);

    // Cálculo de tarifas según la lógica de ShippingStepPidelo
    const calcularTarifa = (pesoKg, valorProducto) => {
        const flete = pesoKg * fleteRate; // Calcular directamente en kg
        const cargosFijos = servicioFijo;
        
        // Solo aplicar seguro y derecho arancelario si el producto cuesta más de $200
        let seguro = 0;
        let derechoArancelario = 0;
        
        if (valorProducto > 200) {
            // Calcular valor CIF (Costo + Seguro + Flete)
            seguro = valorProducto * (seguroRate / 100);
            const valorCIF = valorProducto + seguro + flete;
            derechoArancelario = valorCIF * (derechoArancelarioRate / 100);
        }
        
        const totalEnvio = flete + cargosFijos + seguro + derechoArancelario;
        const granTotal = valorProducto + totalEnvio;
        
        return {
            flete: flete.toFixed(2),
            cargosFijos: cargosFijos.toFixed(2),
            seguro: seguro.toFixed(2),
            derechoArancelario: derechoArancelario.toFixed(2),
            totalEnvio: totalEnvio.toFixed(2), // Solo costo de envío
            total: granTotal.toFixed(2), // Producto + envío
            aplicaImpuestos: valorProducto > 200
        };
    };

    const tarifa = calcularTarifa(selectedWeight, productValue);

    const pasosCotizacion = [
        {
            numero: 1,
            titulo: "Pesa tu Paquete",
            descripcion: "Calcula el peso real o volumétrico en kilogramos",
            icon: Scale
        },
        {
            numero: 2,
            titulo: "Calcula el Flete",
            descripcion: `Multiplica el peso por $${fleteRate.toFixed(2)} USD por kg`,
            icon: Calculator
        },
        {
            numero: 3,
            titulo: "Suma Cargos Fijos",
            descripcion: "Agrega $10 USD de servicio por envío",
            icon: DollarSign
        },
        {
            numero: 4,
            titulo: "Total a Pagar",
            descripcion: "Obtén el costo total de tu envío",
            icon: CheckCircle
        }
    ];

    const tarifasInfo = {
        flete: {
            precio: `$${fleteRate.toFixed(2)} USD`,
            unidad: "por kilogramo",
            rango: "1kg hasta 100kg",
            descripcion: generals?.find(x => x.correlative === 'importation_flete_descripcion')?.description || "Recepción, almacenaje, consolidación, preparación y transporte internacional"
        },
        cargosFijos: {
            precio: `$${servicioFijo.toFixed(2)} USD`,
            descripcion: "Se calcula por envío",
            incluye: [
                `Seguro con cobertura hasta $200 USD`,
                "Proceso y trámite de importación postal",
                "Entrega en cualquier parte de Perú"
            ]
        },
        seguro: {
            tasa: seguroRate,
            descripcion: generals?.find(x => x.correlative === 'importation_seguro_descripcion')?.description || "Aplica solo para envíos mayores a $200 USD"
        },
        derechoArancelario: {
            tasa: derechoArancelarioRate,
            descripcion: generals?.find(x => x.correlative === 'importation_derecho_arancelario_descripcion')?.description || "Aplica solo para envíos mayores a $200 USD"
        }
    };

    const requisitosAduana = [
        {
            categoria: "Envíos hasta $200 USD",
            icon: "📦",
            requisitos: [
                "Valor máximo: $200 USD FOB",
                "Peso máximo: 50 kg",
                "Solo artículos de uso personal",
                "Documentación simplificada"
            ],
            color: "from-green-500 to-emerald-500"
        },
        {
            categoria: "Envíos de $200 a $2000 USD",
            icon: "📋",
            requisitos: [
                "Valor: $200 - $2000 USD FOB",
                "Requiere factura comercial",
                "RUC activo obligatorio",
                "Declaración aduanera detallada"
            ],
            color: "from-blue-500 to-cyan-500"
        },
        {
            categoria: "Envíos superiores a $2000 USD",
            icon: "⚠️",
            requisitos: [
                "Cambio de modalidad necesario",
                "Importación formal requerida",
                "Agente de aduanas obligatorio",
                "Proceso completo de desaduanaje"
            ],
            color: "from-orange-500 to-red-500"
        }
    ];

    const mercanciaProhibida = [
        {
            icon: "🔫",
            titulo: "Armas y Explosivos",
            items: ["Armas de fuego", "Municiones", "Explosivos", "Artículos bélicos", "Fuegos artificiales"]
        },
        {
            icon: "💊",
            titulo: "Sustancias Reguladas",
            items: ["Drogas ilegales", "Medicamentos controlados sin receta", "Precursores químicos", "Sustancias psicotrópicas"]
        },
        {
            icon: "🐾",
            titulo: "Materiales Biológicos",
            items: ["Animales vivos", "Plantas sin certificado", "Materiales biológicos", "Productos de origen animal"]
        },
        {
            icon: "💰",
            titulo: "Valores y Joyas",
            items: ["Dinero en efectivo", "Billetes de banco", "Joyas de alto valor", "Metales preciosos sin declarar"]
        },
        {
            icon: "📱",
            titulo: "Electrónicos Usados",
            items: ["Celulares usados o remanufacturados", "Equipos electrónicos de segunda mano", "Baterías de litio sin embalaje"]
        },
        {
            icon: "🍾",
            titulo: "Sustancias Restringidas",
            items: ["Bebidas alcohólicas", "Tabaco y cigarrillos", "Productos falsificados", "Material obsceno o inmoral"]
        },
        {
            icon: "🚗",
            titulo: "Autopartes Usadas",
            items: ["Repuestos usados de vehículos", "Partes de motor usadas", "Neumáticos de segunda mano"]
        },
        {
            icon: "⚖️",
            titulo: "Productos Falsificados",
            items: ["Mercancía pirateada", "Copias no autorizadas", "Imitaciones de marcas", "Productos con violación de derechos"]
        }
    ];

    const consecuenciasIncumplimiento = [
        {
            titulo: "Reajuste de Valor",
            descripcion: "Si el valor declarado no corresponde al valor real de la mercancía, será objeto de propuesta de valor, generando un ajuste en el pago de tributos aduaneros.",
            icon: Calculator,
            color: "text-yellow-600",
            bgColor: "bg-yellow-50"
        },
        {
            titulo: "Cambio de Modalidad",
            descripcion: "Cuando no se cumplen los requisitos de tráfico postal, se debe cambiar la modalidad de importación, trasladando el envío a un depósito aduanero.",
            icon: TrendingUp,
            color: "text-orange-600",
            bgColor: "bg-orange-50"
        },
        {
            titulo: "Abandono",
            descripcion: "Si pasan 30 días sin nacionalizar el envío, se considera abandonado. Puedes recuperarlo en el siguiente mes pagando impuestos y 10% adicional. Después pasa a propiedad del Estado.",
            icon: Clock,
            color: "text-red-600",
            bgColor: "bg-red-50"
        },
        {
            titulo: "Aprehensión o Decomiso",
            descripcion: "Mercancía prohibida, no descrita o que no está amparada en el documento de transporte será aprehendida o decomisada directamente por la aduana.",
            icon: Ban,
            color: "text-red-700",
            bgColor: "bg-red-100"
        }
    ];

    const beneficiosServicio = [
        {
            icon: ShieldCheck,
            titulo: "Seguro Incluido",
            descripcion: "Cobertura hasta $200 USD sin costo adicional"
        },
        {
            icon: Truck,
            titulo: "Entrega Nacional",
            descripcion: "Entregamos en cualquier parte de Perú"
        },
        {
            icon: FileText,
            titulo: "Gestión Aduanera",
            descripcion: "Nos encargamos de todos los trámites"
        },
        {
            icon: Package,
            titulo: "Consolidación",
            descripcion: "Agrupa múltiples compras en un solo envío"
        }
    ];

    return (
        <div className="min-h-screen bg-white" style={{ margin: 0, padding: 0 }}>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-secondary" style={{ margin: 0, padding: 0, position: 'relative', top: 0 }}>
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-white/10 rounded-full animate-pulse delay-500"></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    {/* Breadcrumbs */}
                    <div className="mb-8">
                        <Breadcrumbs 
                            items={[
                                { label: 'Inicio', href: '/' },
                                { label: 'Tarifas y Normativas', href: '/tarifas-normativas' }
                            ]}
                            className="text-white"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        
                        {/* Left Content */}
                        <div className="text-center lg:text-left">
                            <div 
                                className="inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium mb-8 animate-fade-in"
                                data-animate
                                id="hero-badge"
                            >
                                <DollarSign className="mr-2 h-5 w-5" />
                                Tarifas Transparentes
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                                <span 
                                    className={`block transition-all duration-1000 ${isVisible['hero-title1'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                                    data-animate
                                    id="hero-title1"
                                >
                                    Tarifas y
                                </span>
                                <span 
                                    className={`block text-6xl lg:text-8xl text-[#4fd1d8]  transition-all duration-1000 delay-300 ${isVisible['hero-title2'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                                    data-animate
                                    id="hero-title2"
                                >
                                    Normativas
                                </span>
                                <span 
                                    className={`block transition-all duration-1000 delay-600 ${isVisible['hero-title3'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                                    data-animate
                                    id="hero-title3"
                                >
                                    claras y accesibles
                                </span>
                            </h1>

                            <div className="space-y-4 mb-8">
                                <div 
                                    className={`flex items-center text-white/90 text-lg transition-all duration-1000 delay-900 ${isVisible['benefit-1'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                                    data-animate
                                    id="benefit-1"
                                >
                                    <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
                                    ${fleteRate.toFixed(2)} USD por kilogramo - Sin costos ocultos
                                </div>
                                <div 
                                    className={`flex items-center text-white/90 text-lg transition-all duration-1000 delay-1100 ${isVisible['benefit-2'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                                    data-animate
                                    id="benefit-2"
                                >
                                    <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
                                    Seguro incluido hasta $200 USD por envío
                                </div>
                                <div 
                                    className={`flex items-center text-white/90 text-lg transition-all duration-1000 delay-1300 ${isVisible['benefit-3'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                                    data-animate
                                    id="benefit-3"
                                >
                                    <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
                                    Calculadora en tiempo real para cotizar al instante
                                </div>
                            </div>

                            <p 
                                className={`text-xl font-bold text-white mb-8 transition-all duration-1000 delay-1500 ${isVisible['hero-cta-text'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                                data-animate
                                id="hero-cta-text"
                            >
                                ¡Conoce el costo real de tus envíos desde USA a Perú!
                            </p>

                            <div 
                                className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-1000 delay-1700 ${isVisible['hero-buttons'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                data-animate
                                id="hero-buttons"
                            >
                                <button 
                                    onClick={() => {
                                        const calculatorSection = document.querySelector('[data-section="calculator"]');
                                        calculatorSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }}
                                    className="bg-primary hover:opacity-90 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center shadow-xl group"
                                >
                                    <Calculator className="mr-3 h-6 w-6" />
                                    Calcular mi tarifa
                                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
                                </button>
                                <button className="!hidden border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:customtext-secondary px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center group">
                                    <Globe className="mr-3 h-6 w-6" />
                                    Ver requisitos
                                </button>
                            </div>
                        </div>

                        {/* Right Visual - Pricing Cards */}
                        <div className="flex justify-center lg:justify-end">
                            <div 
                                className={`relative max-w-md w-full transition-all duration-1000 delay-800 ${isVisible['hero-card'] ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 translate-x-10 rotate-12'}`}
                                data-animate
                                id="hero-card"
                            >
                                <div className="relative bg-white rounded-3xl p-8 shadow-2xl transform hover:rotate-0 transition-all duration-500 overflow-hidden">
                                    {/* Pricing Stats Card */}
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                                <Calculator className="w-6 h-6 text-white" />
                                            </div>
                                            Costos de Envío
                                        </h3>
                                        
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="bg-accent p-4 rounded-xl text-center border border-gray-200">
                                                <DollarSign className="w-6 h-6 customtext-primary mx-auto mb-2" />
                                                <div className="text-2xl font-bold customtext-primary">${fleteRate.toFixed(2)}</div>
                                                <div className="text-xs text-gray-600 mt-1">por kilogramo</div>
                                            </div>
                                            <div className="bg-accent p-4 rounded-xl text-center border border-gray-200">
                                                <Package className="w-6 h-6 customtext-secondary mx-auto mb-2" />
                                                <div className="text-2xl font-bold customtext-secondary">$10</div>
                                                <div className="text-xs text-gray-600 mt-1">servicio</div>
                                            </div>
                                            <div className="bg-accent p-4 rounded-xl text-center border border-gray-200">
                                                <ShieldCheck className="w-6 h-6 customtext-neutral-dark mx-auto mb-2" />
                                                <div className="text-2xl font-bold customtext-neutral-dark">$200</div>
                                                <div className="text-xs text-gray-600 mt-1">seguro incluido</div>
                                            </div>
                                            <div className="bg-accent p-4 rounded-xl text-center border border-gray-200">
                                                <Clock className="w-6 h-6 customtext-neutral-light mx-auto mb-2" />
                                                <div className="text-2xl font-bold customtext-neutral-light">7-12</div>
                                                <div className="text-xs text-gray-600 mt-1">días hábiles</div>
                                            </div>
                                        </div>

                                        <div className="bg-primary rounded-xl p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-white font-semibold">Ejemplo: Paquete 5kg</span>
                                                <Plane className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="space-y-2 text-sm text-white/90">
                                                <div className="flex justify-between">
                                                    <span>Flete (5kg × ${fleteRate.toFixed(2)})</span>
                                                    <span className="font-semibold">${(5 * fleteRate).toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Servicio</span>
                                                    <span className="font-semibold">$10.00</span>
                                                </div>
                                                <div className="border-t border-white/30 pt-2 flex justify-between">
                                                    <span className="font-bold">Total</span>
                                                    <span className="font-bold text-lg">${(5 * fleteRate + 10).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => {
                                            const calculatorSection = document.querySelector('[data-section="calculator"]');
                                            calculatorSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }}
                                        className="w-full bg-secondary hover:opacity-90 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group"
                                    >
                                        Calcular mi envío
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>

                                {/* Floating Elements */}
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary rounded-full blur-2xl opacity-60 animate-pulse"></div>
                                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary rounded-full blur-2xl opacity-40 animate-pulse delay-1000"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <ChevronDown className="h-8 w-8 text-white/70" />
                </div>
            </section>

            {/* Calculadora de Tarifas */}
            <section 
                data-section="calculator"
                id="calculator"
                className="py-16 bg-accent"
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                <span className="customtext-primary">Calcula</span> tu Tarifa
                            </h2>
                            <p className="text-xl customtext-secondary">
                                Usa nuestra calculadora para estimar el costo de tu envío
                            </p>
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
                                            <span className="text-orange-700 font-semibold">Se aplicarán impuestos adicionales (seguro y derecho arancelario)</span>
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
                                            className="w-full h-3 bg-primary rounded-lg appearance-none cursor-pointer accent-primary slider-thumb"
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
                                        <div className="text-center mt-3">
                                            <div className="text-xs text-gray-500">
                                                Ingresa el peso de tu paquete en kilogramos
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Resultados mejorados */}
                            <div className="bg-white rounded-xl p-6 shadow-md">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <FileText className="w-6 h-6 text-primary" />
                                    Desglose de tu envío
                                </h3>
                                
                                <div className="space-y-4">
                                    {/* Flete */}
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
                                        <div className="text-2xl font-bold customtext-primary">
                                            ${tarifa.flete}
                                        </div>
                                    </div>

                                    {/* Servicio */}
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
                                        <div className="text-2xl font-bold customtext-secondary">
                                            ${tarifa.cargosFijos}
                                        </div>
                                    </div>

                                    {/* Seguro (condicional) */}
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
                                            <div className="text-2xl font-bold customtext-neutral-dark">
                                                ${tarifa.seguro}
                                            </div>
                                        </div>
                                    )}

                                    {/* Derecho Arancelario (condicional) */}
                                    {tarifa.aplicaImpuestos && Number(tarifa.derechoArancelario) > 0 && (
                                        <div className="flex items-center justify-between p-4 bg-accent rounded-lg border border-gray-200">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center border border-gray-300">
                                                    <FileText className="w-5 h-5 customtext-neutral-light" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900 flex items-center gap-2">
                                                        Impuestos Perú ({derechoArancelarioRate}%)
                                                        {/* Tooltip Icon */}
                                                        <div className="relative group">
                                                            <Info className="w-4 h-4 customtext-primary cursor-help" />
                                                            {/* Tooltip */}
                                                            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg z-10">
                                                                <div className="whitespace-pre-line">
                                                                    {generals?.find(x => x.correlative === 'importation_derecho_arancelario_descripcion')?.description || 
                                                                    'ADV: 4%\nIGV: 16%\nIPM: 2%'}
                                                                </div>
                                                                {/* Arrow */}
                                                                <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        {derechoArancelarioRate}% sobre valor CIF
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-2xl font-bold customtext-neutral-light">
                                                ${tarifa.derechoArancelario}
                                            </div>
                                        </div>
                                    )}

                                    {/* Separador */}
                                    <div className="border-t-2 border-dashed border-gray-300 my-3"></div>

                                    {/* Primera fila: Total de Envío FirstClass - 50% width, alineado a la derecha */}
                                    <div className="w-1/2 ml-auto bg-primary rounded-xl p-6 text-white shadow-lg">
                                        <div className=" flex flex-row items-center justify-between">
                                          <div>  <div className="text-sm opacity-90 mb-1">Total Costo de Envío</div>
                                            <div className="text-lg font-semibold mb-2">FirstClass</div></div>
                                            <div className="text-5xl font-bold">
                                                ${tarifa.totalEnvio}
                                            </div>
                                        </div>
                                      
                                    </div>

                                    {/* Segunda fila: Pregunta/Switch - 50% width, alineado a la derecha */}
                                    <div className="w-1/2 ml-auto bg-accent rounded-xl p-4 border-2 border-gray-200">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={showWithProduct}
                                                onChange={(e) => setShowWithProduct(e.target.checked)}
                                                className="w-6 h-6 rounded border-gray-300 cursor-pointer"
                                            />
                                            <div>
                                                <div className="font-semibold text-sm text-gray-900">
                                                    ¿Quieres saber cuánto sería con tu producto incluido?
                                                </div>
                                            
                                            </div>
                                        </label>
                                    </div>

                                    {/* Tercera fila (condicional): Total con Producto - 50% width, alineado a la derecha */}
                                    {showWithProduct && (
                                        <div className="w-1/2 bg-primary ml-auto  rounded-xl p-6 text-white shadow-lg">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="text-sm opacity-90">TOTAL COMPLETO</div>
                                                    <div className="text-base font-medium">Producto + Envío</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-5xl font-bold">
                                                        ${tarifa.total}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Info adicional */}
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

            {/* Desglose de Tarifas */}
            <section 
                data-section="breakdown"
                id="breakdown"
                className="py-16 bg-white"
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                <span className="customtext-primary">Desglose</span> de Tarifas
                            </h2>
                            <p className="text-xl customtext-secondary">
                                Transparencia total en nuestros costos
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Flete */}
                            <div className="bg-accent rounded-2xl p-8 shadow-lg border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                                        <Plane className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">Flete</h3>
                                        <p className="customtext-primary font-semibold">{tarifasInfo.flete.precio} {tarifasInfo.flete.unidad}</p>
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                                    <div className="font-semibold text-gray-900 mb-2">Rango de peso:</div>
                                    <div className="text-gray-700">{tarifasInfo.flete.rango}</div>
                                </div>
                                <div className="text-gray-600">
                                    <strong className="text-gray-900">Incluye:</strong>
                                    <p className="mt-2">{tarifasInfo.flete.descripcion}</p>
                                </div>
                            </div>

                            {/* Cargos Fijos */}
                            <div className="bg-accent rounded-2xl p-8 shadow-lg border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">Cargos Fijos</h3>
                                        <p className="customtext-secondary font-semibold">{tarifasInfo.cargosFijos.precio}</p>
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                                    <div className="font-semibold text-gray-900 mb-2">Aplicación:</div>
                                    <div className="text-gray-700">{tarifasInfo.cargosFijos.descripcion}</div>
                                </div>
                                <div className="space-y-2">
                                    <strong className="text-gray-900">Incluye:</strong>
                                    {tarifasInfo.cargosFijos.incluye.map((item, index) => (
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

            {/* Pasos para Cotizar */}
            <section 
                data-section="steps"
                id="steps"
                className="py-16 bg-accent"
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                ¿Cómo <span className="customtext-primary">Calcular</span> tu Envío?
                            </h2>
                            <p className="text-xl customtext-secondary">
                                Sigue estos simples pasos
                            </p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6">
                            {pasosCotizacion.map((paso, index) => (
                                <div key={index} className="relative">
                                    <div className="bg-white rounded-xl p-6 h-full border border-gray-200 shadow-lg">
                                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                                            {paso.numero}
                                        </div>
                                        <paso.icon className="w-8 h-8 customtext-primary mb-3" />
                                        <h3 className="font-bold text-lg text-gray-900 mb-2">
                                            {paso.titulo}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {paso.descripcion}
                                        </p>
                                    </div>
                                    {index < pasosCotizacion.length - 1 && (
                                        <ArrowRight className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 w-6 h-6 text-primary" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Requisitos Aduaneros */}
            <section 
                data-section="requirements"
                id="requirements"
                className="py-16 bg-white"
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full mb-4 border border-gray-200">
                                <Globe className="w-5 h-5 customtext-primary" />
                                <span className="customtext-primary font-semibold">Normativa Aduanera</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Requisitos por <span className="customtext-primary">Valor de Envío</span>
                            </h2>
                            <p className="text-xl customtext-secondary">
                                Según las normas de aduana para modalidad courier
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {requisitosAduana.map((categoria, index) => (
                                <div key={index} className="bg-accent rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
                                    <div className={`${index === 0 ? 'bg-primary' : index === 1 ? 'bg-secondary' : 'bg-neutral-dark'} p-6 text-white`}>
                                        <div className="text-5xl mb-3">{categoria.icon}</div>
                                        <h3 className="text-xl font-bold">
                                            {categoria.categoria}
                                        </h3>
                                    </div>
                                    <div className="p-6">
                                        <ul className="space-y-3">
                                            {categoria.requisitos.map((req, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                    <span className="text-gray-700">{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-amber-900 mb-2">Importante</h4>
                                    <p className="text-amber-800">
                                        Los envíos que superen los $2,000 USD FOB no pueden ingresar por modalidad courier y requieren 
                                        cambio a importación formal con agente de aduanas.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mercancía Prohibida */}
            <section 
                data-section="prohibited"
                id="prohibited"
                className="py-16 bg-accent"
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-4 border border-gray-300">
                                <XCircle className="w-5 h-5 customtext-neutral-dark" />
                                <span className="customtext-neutral-dark font-semibold">Restricciones</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Mercancía <span className="customtext-primary">Prohibida</span>
                            </h2>
                            <p className="text-xl customtext-secondary">
                                Productos que no pueden ingresar a Perú por modalidad courier
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {mercanciaProhibida.map((categoria, index) => (
                                <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                                    <div className="text-4xl mb-3">{categoria.icon}</div>
                                    <h3 className="font-bold text-lg text-gray-900 mb-3">
                                        {categoria.titulo}
                                    </h3>
                                    <ul className="space-y-2">
                                        {categoria.items.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm">
                                                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                                <div className="text-red-900">
                                    <p className="font-semibold mb-2">Nota Importante:</p>
                                    <p>
                                        Esta lista es un ejemplo general. Te recomendamos siempre verificar las regulaciones actuales 
                                        y específicas tanto de Estados Unidos como de Perú con tu asesor o las autoridades aduaneras 
                                        correspondientes antes de realizar cualquier envío. Las normativas pueden cambiar, y es tu 
                                        responsabilidad asegurarte de cumplir con todos los requisitos legales.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Consecuencias de Incumplimiento */}
            <section 
                data-section="consequences"
                id="consequences"
                className="py-16 bg-white"
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                ¿Qué Pasa si el Envío <span className="customtext-primary">No Cumple</span>?
                            </h2>
                            <p className="text-xl customtext-secondary">
                                Consecuencias por incumplimiento de requisitos aduaneros
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {consecuenciasIncumplimiento.map((consecuencia, index) => (
                                <div key={index} className={`${consecuencia.bgColor} rounded-2xl p-6 border-2 border-${consecuencia.color.split('-')[1]}-200`}>
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 ${consecuencia.bgColor} border-2 border-${consecuencia.color.split('-')[1]}-300 rounded-xl flex items-center justify-center flex-shrink-0`}>
                                            <consecuencia.icon className={`w-6 h-6 ${consecuencia.color}`} />
                                        </div>
                                        <div>
                                            <h3 className={`font-bold text-lg ${consecuencia.color} mb-2`}>
                                                {consecuencia.titulo}
                                            </h3>
                                            <p className="text-gray-700">
                                                {consecuencia.descripcion}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6">
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="w-6 h-6 text-blue-600 flex-shrink-0" />
                                <div className="text-blue-900">
                                    <p className="font-semibold mb-2">Nuestro Compromiso</p>
                                    <p>
                                        En FirstClass estamos comprometidos en apoyar y asesorar el proceso de logística 
                                        internacional para tus envíos desde y hacia Estados Unidos. Nuestro equipo te 
                                        guiará para cumplir con todos los requisitos aduaneros.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Beneficios del Servicio */}
            <section 
                data-section="benefits"
                id="benefits"
                className="py-16 bg-accent"
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                <span className="customtext-primary">Beneficios</span> Incluidos
                            </h2>
                            <p className="text-xl customtext-secondary">
                                Todo lo que obtienes con nuestro servicio
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {beneficiosServicio.map((beneficio, index) => (
                                <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1">
                                    <beneficio.icon className={`w-12 h-12 customtext-primary mb-4`} />
                                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                                        {beneficio.titulo}
                                    </h3>
                                    <p className="text-gray-600">
                                        {beneficio.descripcion}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-16 bg-secondary text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            ¿Listo para Enviar?
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Cotiza tu envío ahora y aprovecha nuestras tarifas competitivas
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <button
                                onClick={() => {
                                    const calculatorSection = document.querySelector('[data-section="calculator"]');
                                    calculatorSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }}
                                className="inline-flex items-center gap-2 bg-primary hover:opacity-90 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg"
                            >
                                <Calculator className="w-5 h-5" />
                                Cotiza tu Envío
                            </button>
                            <AdvisorButton
                                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:customtext-secondary transition-all border-2 border-white"
                            >
                                <Headphones className="w-5 h-5" />
                                Contactar Asesor
                            </AdvisorButton>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TarifasNormativas;
