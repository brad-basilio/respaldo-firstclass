import React from 'react';
import { CheckCircle, MessageCircle, ArrowRight, Mail } from 'lucide-react';
import AdvisorButton from '../FirstClass/AdvisorButton';
import LockerButton from '../FirstClass/LockerButton';

const CtaSection = ({ config }) => {
    const style = config.style || 'simple';
    const buttons = config.buttons || [];
    const features = (config.features || []).filter(f => f.show !== false && f.text);

    if (style === 'primary') {
        // Estilo Primary - Fondo Cyan con animaciones (como "¿Listo para comenzar?")
        return (
            <section className="py-20 bg-primary relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '1000ms' }}></div>
                    <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '500ms' }}></div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="transition-all duration-1000">
                        {/* Title */}
                        <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                            {config.title || '¿Listo para comenzar?'}
                        </h2>
                        
                        {/* Description */}
                        {config.description && (
                            <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
                                {config.description}
                            </p>
                        )}
                        
                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            {buttons.map((button, index) => {
                                if (button.show === false) return null;
                                
                                if (button.type === 'locker') {
                                    return (
                                        <LockerButton 
                                            key={index}
                                            className="bg-white hover:bg-gray-100 text-gray-900 px-12 py-5 rounded-xl text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl flex items-center group"
                                        >
                                            <CheckCircle className="mr-3 h-6 w-6 text-green-500" />
                                            {button.text || 'Abrir mi casillero gratis'}
                                            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
                                        </LockerButton>
                                    );
                                } else if (button.type === 'advisor') {
                                    return (
                                        <AdvisorButton 
                                            key={index}
                                            className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 px-8 py-5 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 flex items-center group"
                                        >
                                            <Mail className="mr-3 h-6 w-6" />
                                            {button.text || 'Contactar asesor'}
                                        </AdvisorButton>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        {/* Features */}
                        {features.length > 0 && (
                            <p className="text-white/80 mt-6 text-lg">
                                {features.map((feature, index) => (
                                    <span key={index}>
                                        ✅ {feature.text}
                                        {index < features.length - 1 ? ' • ' : ''}
                                    </span>
                                ))}
                            </p>
                        )}
                    </div>
                </div>
            </section>
        );
    } else {
        // Estilo Simple - Fondo Beige/Accent (como "¿Tienes dudas sobre los requisitos?")
        return (
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-accent border-2 border-primary rounded-2xl p-8 lg:p-12 text-center">
                        <div className="flex items-center justify-center mb-6">
                            <div className="bg-primary p-4 rounded-full shadow-lg animate-pulse">
                                <CheckCircle className="h-8 w-8 text-white" />
                            </div>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                            {config.title || '¿Tienes dudas?'}
                        </h3>
                        
                        {/* Description */}
                        {config.description && (
                            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                                {config.description}
                            </p>
                        )}
                        
                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {buttons.map((button, index) => {
                                if (button.show === false) return null;
                                
                                if (button.type === 'advisor') {
                                    return (
                                        <AdvisorButton 
                                            key={index}
                                            className="bg-primary hover:opacity-90 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center group"
                                        >
                                            <MessageCircle className="mr-3 h-6 w-6" />
                                            {button.text || 'Consultar con asesor'}
                                            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
                                        </AdvisorButton>
                                    );
                                } else if (button.type === 'locker') {
                                    return (
                                        <LockerButton 
                                            key={index}
                                            className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center group"
                                        >
                                            <CheckCircle className="mr-3 h-6 w-6" />
                                            {button.text || 'Abrir mi casillero'}
                                        </LockerButton>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        {/* Features */}
                        {features.length > 0 && (
                            <div className="mt-6 flex flex-wrap justify-center gap-4">
                                {features.map((feature, index) => (
                                    <span key={index} className="text-gray-700 text-sm">
                                        ✅ {feature.text}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        );
    }
};

export default CtaSection;
