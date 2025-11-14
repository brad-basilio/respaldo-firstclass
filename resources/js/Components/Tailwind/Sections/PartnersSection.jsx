import React, { useState, useEffect } from 'react';
import { Globe, ArrowRight } from 'lucide-react';

const PartnersSection = ({ config }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);

    // Cargar partners desde la API
    useEffect(() => {
        fetchPartners();
    }, []);

    const fetchPartners = async () => {
        try {
            const response = await fetch('/api/partners/visible');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Partners loaded:', data); // Debug
            setPartners(data);
            setLoading(false);
        } catch (error) {
            console.error('Error loading partners:', error);
            setPartners([]); // Set empty array on error
            setLoading(false);
        }
    };

    // Auto-scroll del carrusel
    useEffect(() => {
        if (!isHovered && config.auto_scroll !== false && partners.length > (config.items_per_row || 6)) {
            const interval = setInterval(() => {
                setCurrentIndex(prev => prev + 1);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isHovered, partners.length, config.auto_scroll, config.items_per_row]);

    // Obtener partners visibles en el carrusel (duplicar array para carrusel infinito)
    const getVisiblePartners = () => {
        if (partners.length === 0) return [];
        
        const itemsPerRow = config.items_per_row || 6;
        
        // Si hay menos partners que items por fila, mostrar todos
        if (partners.length <= itemsPerRow) {
            return partners;
        }
        
        // Crear array extendido para carrusel infinito
        const extendedPartners = [...partners, ...partners, ...partners];
        const startIndex = currentIndex % partners.length;
        
        return extendedPartners.slice(startIndex, startIndex + itemsPerRow);
    };

    const nextSlide = () => {
        setCurrentIndex(prev => prev + 1);
    };

    const prevSlide = () => {
        setCurrentIndex(prev => prev - 1);
    };

    // Procesar título con *palabra* (cyan sin <br/>)
    const processTitle = (text) => {
        if (!text) return '';
        const parts = text.split(/(\*[^*]+\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('*') && part.endsWith('*')) {
                const word = part.slice(1, -1);
                return <span key={index} className="customtext-primary">{word}</span>;
            }
            return part;
        });
    };

    // Procesar descripción con *palabra* (cyan + bold)
    const processDescription = (text) => {
        if (!text) return '';
        const parts = text.split(/(\*[^*]+\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('*') && part.endsWith('*')) {
                const word = part.slice(1, -1);
                return <strong key={index} className="customtext-primary font-bold">{word}</strong>;
            }
            return part;
        });
    };
    const getBgClass = () => {
        switch (config.background) {
            case 'gray-50':
                return 'bg-gray-50';
            case 'accent':
                return 'bg-accent';
            case 'gradient':
                return 'bg-gradient-to-br from-gray-50 to-white';
            default:
                return 'bg-white';
        }
    };

    // Determinar columnas del grid
    const getGridCols = () => {
        const itemsPerRow = config.items_per_row || 6;
        switch (itemsPerRow) {
            case 4:
                return 'lg:grid-cols-4';
            case 5:
                return 'lg:grid-cols-5';
            case 6:
                return 'lg:grid-cols-6';
            case 8:
                return 'lg:grid-cols-8';
            default:
                return 'lg:grid-cols-6';
        }
    };

    if (loading) {
        return (
            <section className={`py-20 ${getBgClass()}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-gray-600">Cargando partners...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (partners.length === 0) {
        return (
            <section className={`py-20 ${getBgClass()}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center p-12 bg-yellow-50 border-2 border-yellow-200 rounded-2xl">
                        <i className="mdi mdi-alert text-6xl text-yellow-600 mb-4"></i>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No hay partners disponibles</h3>
                        <p className="text-gray-600">
                            Agrega partners en el módulo de Partners del admin para que aparezcan aquí.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={`py-20 ${getBgClass()} relative overflow-hidden`}>
            {/* Background Pattern */}
            {config.background === 'gradient' && (
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-10 left-10 w-40 h-40 border-2 border-primary rounded-full animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-secondary rounded-full animate-pulse"></div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        {processTitle(config.title || '¿Dónde comprar con Casillero Virtual?')}
                    </h2>
                    {config.description && (
                        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                            {processDescription(config.description)}
                        </p>
                    )}
                </div>

                {/* Slider de Partners - Estilo Premium */}
                <div 
                    className="relative px-10"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                 
                    {/* Contenedor del Slider con Overflow */}
                    <div className="relative overflow-hidden py-8 ">
                        {/* Track del Slider - Desplazamiento Horizontal */}
                        <div 
                            className="flex gap-12 transition-transform duration-700 ease-out"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / (config.items_per_row || 6))}%)`
                            }}
                        >
                            {/* Crear array extendido para loop infinito */}
                            {[...partners, ...partners, ...partners].map((partner, index) => {
                                const width = `${100 / (config.items_per_row || 6)}%`;
                                return (
                                    <div
                                        key={`${partner.id}-${index}`}
                                        className="flex-shrink-0 group"
                                        style={{ 
                                            width: `calc(${width} - 3rem)`,
                                            minWidth: '180px'
                                        }}
                                    >
                                        {/* Partner Card */}
                                        <div className="relative flex items-center justify-center p-6 transition-all duration-500 ease-out">
                                            
                                            {/* Sutil glow en hover */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                                <div className="absolute inset-0 bg-gradient-radial from-primary/8 via-transparent to-transparent blur-xl"></div>
                                            </div>
                                            
                                            {/* Logo Container */}
                                            <div className="relative z-10 w-full aspect-square flex items-center justify-center">
                                                {partner.image ? (
                                                    <img 
                                                        src={`/storage/images/partner/${partner.image}`}
                                                        alt={`${partner.name} logo`}
                                                        className="w-full h-full object-contain transition-all duration-500 ease-out"
                                                        style={{ 
                                                            filter: 'grayscale(50%) brightness(0.9)',
                                                            willChange: 'filter, transform'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.target.style.filter = 'grayscale(0%) brightness(1.05)';
                                                            e.target.style.transform = 'scale(1.1)';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.target.style.filter = 'grayscale(50%) brightness(0.9)';
                                                            e.target.style.transform = 'scale(1)';
                                                        }}
                                                        onError={(e) => {
                                                            e.target.src = '/api/cover/thumbnail/null';
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="fallback-text w-full h-full flex items-center justify-center">
                                                        <span className="text-3xl font-bold text-gray-300 opacity-30 transition-all duration-500 group-hover:opacity-50">
                                                            {partner.name.substring(0, 2).toUpperCase()}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Indicador inferior sutil */}
                                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary opacity-0 group-hover:opacity-100 group-hover:w-2/3 transition-all duration-500 ease-out rounded-full"></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation Arrows - Más sutiles */}
                    {partners.length > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white backdrop-blur-sm p-3 rounded-full shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-200/50 hover:border-primary/30 hover:scale-110"
                                aria-label="Previous"
                            >
                                <svg className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <button
                                onClick={nextSlide}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white backdrop-blur-sm p-3 rounded-full shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-200/50 hover:border-primary/30 hover:scale-110"
                                aria-label="Next"
                            >
                                <svg className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}

                    {/* Pagination Dots - Minimalista */}
                    {partners.length > 1 && (
                        <div className="flex justify-center mt-8 space-x-2">
                            {partners.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`transition-all duration-300 ${
                                        (currentIndex % partners.length) === index
                                            ? 'w-8 h-1.5 bg-primary rounded-full' 
                                            : 'w-1.5 h-1.5 bg-gray-300 rounded-full hover:bg-gray-400 hover:w-3'
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes smoothFadeIn {
                    0% {
                        opacity: 0;
                        transform: translateY(30px) scale(0.9);
                        filter: blur(10px);
                    }
                    60% {
                        opacity: 0.8;
                        filter: blur(2px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                        filter: blur(0);
                    }
                }
                
                @keyframes slideInFromRight {
                    0% {
                        opacity: 0;
                        transform: translateX(100px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                .bg-gradient-radial {
                    background: radial-gradient(circle, var(--tw-gradient-stops));
                }
            `}</style>
        </section>
    );
};

export default PartnersSection;
