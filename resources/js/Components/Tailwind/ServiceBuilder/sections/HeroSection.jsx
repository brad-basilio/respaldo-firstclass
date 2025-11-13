import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = ({ config, service }) => {
    const {
        title = '',
        subtitle = '',
        description = '',
        background_image = null,
        cta_buttons = [],
    } = config;

    // Función para procesar texto con *palabra* para resaltado
    const processTitle = (text) => {
        if (!text) return null;
        
        const parts = text.split(/(\*[^*]+\*)/g);
        
        return parts.map((part, index) => {
            if (part.startsWith('*') && part.endsWith('*')) {
                const word = part.slice(1, -1);
                return (
                    <span 
                        key={index} 
                        className="text-[#4fd1d8]"
                    >
                        <br/>
                        {word}
                        <br/>
                    </span>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-start overflow-hidden bg-secondary" style={{ margin: 0, padding: 0 }}>
            {/* Background Image (opcional) */}
            {background_image && (
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ 
                        backgroundImage: `url(${background_image})`,
                    }}
                />
            )}

            {/* Animated Background - igual que EnviosPeruUSA */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-white/10 rounded-full animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center lg:text-left max-w-3xl">
                    
                    {/* Service Name Badge */}
                    <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium mb-8 animate-fade-in">
                        {service?.name || 'Nuestro Servicio'}
                    </div>

                    {/* Main Title con soporte para *palabra* */}
                    <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                        {processTitle(title)}
                    </h1>

                    {/* Subtitle */}
                    {subtitle && (
                        <p className="text-xl lg:text-2xl text-white/90 mb-4 transition-all duration-1000 delay-900 opacity-100 translate-y-0">
                            {subtitle}
                        </p>
                    )}

                    {/* Description */}
                    {description && (
                        <p className="text-lg text-white/80 mb-8 transition-all duration-1000 delay-1200 opacity-100 translate-y-0">
                            {description}
                        </p>
                    )}

                    {/* CTA Buttons */}
                    {cta_buttons && cta_buttons.length > 0 && (
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            {cta_buttons.map((button, index) => (
                                <a
                                    key={index}
                                    href={button.link || '#'}
                                    className={`${
                                        button.style === 'primary'
                                            ? 'bg-white hover:bg-gray-100 customtext-secondary'
                                            : 'border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:customtext-secondary'
                                    } px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center shadow-xl group`}
                                >
                                    {button.text}
                                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
