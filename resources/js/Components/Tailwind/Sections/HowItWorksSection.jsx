import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Plane, ArrowRight, User, Package, CheckCircle, Flag, Truck, Globe, Shield, MapPin } from 'lucide-react';

// Lazy load del botón de casillero
const LockerButton = lazy(() => import('../FirstClass/LockerButton'));

// Map icon names to actual components
const ICON_MAP = {
    User,
    Package,
    Plane,
    CheckCircle,
    Flag,
    Truck,
    Globe,
    Shield,
    MapPin
};

/**
 * HowItWorksSection - Reusable component for "How it Works" sections
 * Supports both directional animations: USA→Peru and Peru→USA
 * 
 * @param {Object} config - Section configuration
 * @param {string} config.title - Main title
 * @param {string} config.highlightedTitle - Highlighted part of title (in primary color)
 * @param {string} config.description - Section description
 * @param {Array} config.steps - Array of step objects
 * @param {string} config.direction - 'usa-peru' or 'peru-usa'
 * @param {Object} config.originCountry - Origin country info
 * @param {Object} config.destinationCountry - Destination country info
 * @param {Object} config.ctaButton - CTA button configuration
 * @param {string} config.bgColor - Background color class (default: 'bg-accent')
 */
const HowItWorksSection = ({ config = {} }) => {
    const [activeStep, setActiveStep] = useState(0);

    // Default configuration
    const {
        title = "¿Cómo funciona el servicio de",
        highlightedTitle = "envíos internacionales?",
        description = "Proceso simple y seguro para tus envíos internacionales.",
        steps = [],
        direction = 'usa-peru', // 'usa-peru' or 'peru-usa'
        originCountry = {
            flag: '🇺🇸',
            name: 'Miami, FL',
            subtitle: 'Tu dirección'
        },
        destinationCountry = {
            flag: '🇵🇪',
            name: 'Perú',
            subtitle: 'Tu hogar'
        },
        ctaButton = {
            text: 'Comenzar ahora',
            icon: null,
            link: '#'
        },
        bgColor = 'bg-accent'
    } = config;

    // Process steps to include icon components
    const processedSteps = steps.map(step => ({
        ...step,
        icon: ICON_MAP[step.iconName] || User // Fallback to User icon
    }));

    // Función para procesar título con *palabra* para resaltado
    const processTitle = (text) => {
        if (!text) return null;
        
        const parts = text.split(/(\*[^*]+\*)/g);
        
        return parts.map((part, index) => {
            if (part.startsWith('*') && part.endsWith('*')) {
                const word = part.slice(1, -1);
                return (
                    <span 
                        key={index} 
                        className="customtext-primary"
                    >
                        <br/>{word}<br/>
                    </span>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    // Función para procesar descripción con <strong>texto</strong> para negrita y *palabra* para bold
    const processDescription = (text) => {
        if (!text) return null;
        
        // Primero procesamos *palabra* para convertirlo a <strong>
        let processedText = text.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
        
        return <span dangerouslySetInnerHTML={{ __html: processedText }} />;
    };

    // Auto-advance steps
    useEffect(() => {
        if (processedSteps.length === 0) return;
        
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % processedSteps.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [processedSteps.length]);

    // Animation keyframes based on direction
    const getAnimationName = () => {
        return direction === 'peru-usa' ? 'planeFlightPathPeru' : 'planeFlightPathUSA';
    };

    const getAnimationClass = () => {
        return direction === 'peru-usa' ? 'plane-flight-peru' : 'plane-flight-usa';
    };

    if (processedSteps.length === 0) {
        return (
            <section className={`py-20 ${bgColor} relative overflow-hidden`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-500">No hay pasos configurados para esta sección.</p>
                </div>
            </section>
        );
    }

    return (
        <section className={`py-20 ${bgColor} relative overflow-hidden`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-20 w-32 h-32 border-2 border-primary rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-secondary rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-primary rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        {processTitle(title)}
                  
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {processDescription(description)}
                    </p>
                </div>

                {/* Interactive Steps */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Steps List */}
                    <div className="space-y-6">
                        {processedSteps.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = activeStep === index;
                            
                            return (
                                <div
                                    key={step.id || index}
                                    className={`relative p-6 rounded-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                                        isActive 
                                            ? 'bg-white shadow-2xl border-2 border-primary' 
                                            : 'bg-white/50 hover:bg-white shadow-lg border border-gray-200'
                                    }`}
                                    onClick={() => setActiveStep(index)}
                                    style={{ animationDelay: step.delay || `${index * 200}ms` }}
                                >
                                    {/* Step Number */}
                                    <div className="absolute -left-4 -top-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                        {step.id || index + 1}
                                    </div>

                                    <div className="flex items-start space-x-4 ml-4">
                                        {Icon && (
                                            <div className={`p-3 rounded-xl ${step.color || 'bg-primary'} shadow-lg transform transition-all duration-300 ${isActive ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}`}>
                                                <Icon className="h-6 w-6 text-white" />
                                            </div>
                                        )}
                                        
                                        <div className="flex-1">
                                            <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${isActive ? 'customtext-primary' : 'text-gray-900'}`}>
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Active Indicator */}
                                    {isActive && (
                                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Visual Representation */}
                    <div className="relative">
                        <div className={`${bgColor} rounded-3xl p-8 relative overflow-hidden ${direction === 'peru-usa' ? 'border border-primary' : ''}`}>
                            {/* Animated Background */}
                            <div className="absolute inset-0">
                                <div className="absolute top-4 right-4 w-20 h-20 bg-primary rounded-full animate-pulse"></div>
                                <div className="absolute bottom-4 left-4 w-16 h-16 bg-secondary rounded-full animate-pulse delay-500"></div>
                            </div>

                            {/* Flight Visual */}
                            <div className="relative z-10 text-center">
                                <div className="flex items-center justify-between mb-8">
                                    {/* Origin Country */}
                                    <div className="text-center">
                                        <div className={`w-20 h-20 ${direction === 'peru-usa' ? 'bg-secondary' : 'bg-primary'} rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg`}>
                                            <span className="text-white font-bold text-lg">{originCountry.flag}</span>
                                        </div>
                                        <p className="font-semibold text-gray-900">{originCountry.name}</p>
                                        <p className="text-sm text-gray-600">{originCountry.subtitle}</p>
                                    </div>

                                    {/* Animated Flight Path */}
                                    <div className="flex-1 relative h-24 mx-4">
                                        {/* Dotted Path Line */}
                                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                            <path
                                                d="M 0,50 Q 50,10 100,50"
                                                fill="none"
                                                stroke="#2fbfc6"
                                                strokeWidth="1"
                                                strokeDasharray="4,4"
                                                opacity="0.4"
                                            />
                                        </svg>
                                        
                                        {/* Animated Plane */}
                                        <div className="absolute inset-0 w-full h-full">
                                            <style>
                                                {`
                                                    @keyframes ${getAnimationName()} {
                                                        0% {
                                                            left: 0%;
                                                            top: 50%;
                                                            transform: translate(-50%, -50%) rotate(-25deg) scale(0.9);
                                                        }
                                                        15% {
                                                            left: 15%;
                                                            top: 35%;
                                                            transform: translate(-50%, -50%) rotate(-15deg) scale(1);
                                                        }
                                                        25% {
                                                            left: 25%;
                                                            top: 25%;
                                                            transform: translate(-50%, -50%) rotate(-8deg) scale(1.05);
                                                        }
                                                        40% {
                                                            left: 40%;
                                                            top: 15%;
                                                            transform: translate(-50%, -50%) rotate(0deg) scale(1.15);
                                                        }
                                                        50% {
                                                            left: 50%;
                                                            top: 10%;
                                                            transform: translate(-50%, -50%) rotate(0deg) scale(1.2);
                                                        }
                                                        60% {
                                                            left: 60%;
                                                            top: 15%;
                                                            transform: translate(-50%, -50%) rotate(0deg) scale(1.15);
                                                        }
                                                        75% {
                                                            left: 75%;
                                                            top: 30%;
                                                            transform: translate(-50%, -50%) rotate(12deg) scale(1.05);
                                                        }
                                                        85% {
                                                            left: 85%;
                                                            top: 40%;
                                                            transform: translate(-50%, -50%) rotate(18deg) scale(1);
                                                        }
                                                        100% {
                                                            left: 100%;
                                                            top: 50%;
                                                            transform: translate(-50%, -50%) rotate(25deg) scale(0.9);
                                                        }
                                                    }
                                                    .${getAnimationClass()} {
                                                        position: absolute;
                                                        animation: ${getAnimationName()} 5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
                                                    }
                                                `}
                                            </style>
                                            <div className={getAnimationClass()}>
                                                <Plane 
                                                    className="customtext-primary h-8 w-8 drop-shadow-lg filter" 
                                                />
                                            </div>
                                        </div>
                                        
                                        {/* Animated Cloud Trail */}
                                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-60 animate-ping"></div>
                                        <div className="absolute top-[15%] left-1/2 w-2 h-2 bg-white rounded-full opacity-50 animate-ping" style={{ animationDelay: '0.3s' }}></div>
                                        <div className="absolute top-[25%] left-[65%] w-2 h-2 bg-white rounded-full opacity-40 animate-ping" style={{ animationDelay: '0.6s' }}></div>
                                        <div className="absolute top-[40%] left-[85%] w-2 h-2 bg-white rounded-full opacity-30 animate-ping" style={{ animationDelay: '1s' }}></div>
                                    </div>

                                    {/* Destination Country */}
                                    <div className="text-center">
                                        <div className={`w-20 h-20 ${direction === 'peru-usa' ? 'bg-primary' : 'bg-secondary'} rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg`}>
                                            <span className="text-white font-bold text-lg">{destinationCountry.flag}</span>
                                        </div>
                                        <p className="font-semibold text-gray-900">{destinationCountry.name}</p>
                                        <p className="text-sm text-gray-600">{destinationCountry.subtitle}</p>
                                    </div>
                                </div>

                                {/* Current Step Display */}
                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <div className="flex items-center justify-center space-x-3 mb-4">
                                        {processedSteps[activeStep].icon && React.createElement(processedSteps[activeStep].icon, { 
                                            className: "h-8 w-8 customtext-primary" 
                                        })}
                                        <h4 className="text-xl font-bold text-gray-900">
                                            {processedSteps[activeStep].title}
                                        </h4>
                                    </div>
                                    <p className="text-gray-600">
                                        {processedSteps[activeStep].description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                {ctaButton.text && (
                    <div className="text-center mt-16">
                        {ctaButton.type === 'lockerButton' ? (
                            <Suspense fallback={<div>Cargando...</div>}>
                                <LockerButton className="bg-primary hover:opacity-90 text-white px-12 py-5 rounded-xl text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl inline-flex items-center group">
                                    {ctaButton.icon && React.createElement(ctaButton.icon, { 
                                        className: "mr-3 h-6 w-6" 
                                    })}
                                    {ctaButton.text}
                                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
                                </LockerButton>
                            </Suspense>
                        ) : (
                            <a 
                                href={ctaButton.link || '#'}
                                className="bg-primary hover:opacity-90 text-white px-12 py-5 rounded-xl text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl inline-flex items-center group"
                            >
                                {ctaButton.icon && React.createElement(ctaButton.icon, { 
                                    className: "mr-3 h-6 w-6" 
                                })}
                                {ctaButton.text}
                                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
                            </a>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default HowItWorksSection;
