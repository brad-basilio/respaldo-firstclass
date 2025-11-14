import React from 'react';
import { 
    Shield, Clock, Globe, Star, Truck, Award, CheckCircle, Heart,
    Zap, Lock, TrendingUp, Package, Users, DollarSign, ThumbsUp,
    Gift, Sparkles, Target, Building2, Warehouse, Camera, NotebookPen
} from 'lucide-react';

const iconMap = {
    'Shield': Shield,
    'Clock': Clock,
    'Globe': Globe,
    'Star': Star,
    'Truck': Truck,
    'Award': Award,
    'CheckCircle': CheckCircle,
    'Heart': Heart,
    'Zap': Zap,
    'Lock': Lock,
    'TrendingUp': TrendingUp,
    'Package': Package,
    'Users': Users,
    'DollarSign': DollarSign,
    'ThumbsUp': ThumbsUp,
    'Gift': Gift,
    'Sparkles': Sparkles,
    'Target': Target,
    'Building2': Building2,
    'Warehouse': Warehouse,
    'Camera': Camera,
    'NotebookPen': NotebookPen
};

const COLOR_MAP = {
    'bg-primary': '#06b6d4',
    'bg-secondary': '#3b82f6',
    'bg-neutral-dark': '#1f2937',
    'bg-neutral-light': '#6b7280',
    'bg-green-500': '#22c55e',
    'bg-orange-500': '#f97316',
    'bg-purple-500': '#a855f7',
    'bg-red-500': '#ef4444',
    'bg-yellow-500': '#eab308',
    'bg-pink-500': '#ec4899'
};

const BenefitsSection = ({ config }) => {
    const {
        title = 'Beneficios',
        subtitle = '',
        benefits = [],
        columns = 3,
        background = 'white',
    } = config;

    // Función para procesar título con *palabra* para resaltado en cyan
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
                        <br/>
                        {word}
                        <br/>
                    </span>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    // Función para procesar descripción con *palabra* para negrita
    const processDescription = (text) => {
        if (!text) return null;
        
        // Primero procesamos *palabra* para convertirlo a <strong>
        let processedText = text.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
        
        return <span dangerouslySetInnerHTML={{ __html: processedText }} />;
    };

    if (!benefits || benefits.length === 0) {
        return null;
    }

    const gridCols = {
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-2 lg:grid-cols-3',
        4: 'md:grid-cols-2 lg:grid-cols-4',
    }[columns] || 'md:grid-cols-2 lg:grid-cols-3';

    const bgClass = background === 'gray-50' ? 'bg-gray-50' : 
                    background === 'accent' ? 'bg-accent' : 'bg-white';

    return (
        <section className={`py-20 ${bgClass} relative overflow-hidden`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 right-20 w-32 h-32 border-2 border-primary rounded-full"></div>
                <div className="absolute bottom-20 left-20 w-24 h-24 border-2 border-secondary rounded-full"></div>
                <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-primary rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                  
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        {processTitle(title)}
                    </h2>
                      {subtitle && (
                        <span className="customtext-neutral-light  text-base lg:text-xl mb-3 inline-block">
                            {subtitle}
                        </span>
                    )}
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                </div>

                {/* Benefits Grid */}
                <div className={`grid grid-cols-1 ${gridCols} gap-8`}>
                    {benefits.map((benefit, index) => {
                        const IconComponent = iconMap[benefit.icon] || CheckCircle;
                        const iconBgColor = COLOR_MAP[benefit.color] || COLOR_MAP['bg-primary'];

                        return (
                            <div
                                key={index}
                                className="group relative"
                                style={{ 
                                    animationDelay: `${index * 100}ms`,
                                    animation: 'fadeInUp 0.6s ease-out forwards',
                                    opacity: 0
                                }}
                            >
                                <div className="h-full p-8 rounded-2xl bg-white border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-500 relative overflow-hidden group-hover:scale-105 transform">
                                    {/* Gradient overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                                    
                                    {/* Corner accent */}
                                    <div className="absolute top-0 right-0 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary to-transparent rounded-bl-3xl"></div>
                                    </div>

                                    <div className="relative z-10">
                                        {/* Icon */}
                                        <div className="mb-6">
                                            <div 
                                                className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                                                style={{ 
                                                    backgroundColor: iconBgColor
                                                }}
                                            >
                                                <IconComponent 
                                                    className="h-8 w-8 text-white transform group-hover:scale-110 transition-transform duration-500" 
                                                />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div>
                                            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:customtext-primary transition-colors duration-300">
                                                {benefit.title}
                                            </h3>
                                            <p className="text-gray-600 text-base leading-relaxed">
                                                {processDescription(benefit.description)}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            ` }} />
        </section>
    );
};

export default BenefitsSection;
