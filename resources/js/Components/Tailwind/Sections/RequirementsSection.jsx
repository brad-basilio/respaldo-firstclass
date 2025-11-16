import React from 'react';
import { 
    CheckCircle, Shield, Zap, Award, Globe, Lock, Clock, Star, 
    Heart, TrendingUp, Truck, Package, Users, DollarSign, ThumbsUp, 
    Gift, Sparkles, Target, Building2, Warehouse, Camera, NotebookPen,
    FileText, AlertCircle, Info, ClipboardCheck, FileCheck, 
    Scissors, Scale, Ruler, Box
} from 'lucide-react';

const ICON_MAP = {
    CheckCircle,
    Shield,
    Zap,
    Award,
    Globe,
    Lock,
    Clock,
    Star,
    Heart,
    TrendingUp,
    Truck,
    Package,
    Users,
    DollarSign,
    ThumbsUp,
    Gift,
    Sparkles,
    Target,
    Building2,
    Warehouse,
    Camera,
    NotebookPen,
    FileText,
    AlertCircle,
    Info,
    ClipboardCheck,
    FileCheck,
    Scissors,
    Scale,
    Ruler,
    Box
};

const RequirementsSection = ({ config }) => {
    const requirements = config.requirements || [];
    const columns = config.columns || 3;

    // Procesar título con *palabra* (cyan)
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

    // Procesar descripción con HTML
    const processDescription = (text) => {
        if (!text) return '';
        
        // Reemplazar <strong> por negrita
        let processed = text.replace(/<strong>(.*?)<\/strong>/g, '<strong>$1</strong>');
        
        // Reemplazar *palabra* por bold + cyan
        processed = processed.replace(/\*([^*]+)\*/g, '<strong class="customtext-primary font-bold">$1</strong>');
        
        return <span dangerouslySetInnerHTML={{ __html: processed }} />;
    };

    const getBgClass = () => {
        switch (config.background) {
            case 'gray-50':
                return 'bg-gray-50';
            case 'accent':
                return 'bg-accent';
            default:
                return 'bg-white';
        }
    };

    const getGridCols = () => {
        switch (columns) {
            case 1:
                return 'grid-cols-1';
            case 2:
                return 'md:grid-cols-2';
            case 3:
                return 'md:grid-cols-2 lg:grid-cols-3';
            case 4:
                return 'md:grid-cols-2 lg:grid-cols-4';
            default:
                return 'md:grid-cols-2 lg:grid-cols-3';
        }
    };

    // Mapeo de colores para iconos (igual que HowItWorks)
    const getIconBgColor = (colorClass) => {
        const colorMap = {
            'bg-primary': 'bg-primary',
            'bg-secondary': 'bg-secondary',
            'bg-neutral-dark': 'bg-neutral-dark',
            'bg-neutral-light': 'bg-neutral-light',
            'bg-green-500': 'bg-green-500',
            'bg-orange-500': 'bg-orange-500',
            'bg-purple-500': 'bg-purple-500'
        };

        return colorMap[colorClass] || 'bg-primary';
    };

    if (requirements.length === 0) {
        return (
            <section className={`py-20 ${getBgClass()}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center p-12 bg-yellow-50 border-2 border-yellow-200 rounded-2xl">
                        <i className="mdi mdi-alert text-6xl text-yellow-600 mb-4"></i>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No hay requisitos configurados</h3>
                        <p className="text-gray-600">
                            Agrega requisitos desde el configurador para que aparezcan aquí.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={`py-20 ${getBgClass()} relative overflow-hidden`}>
            {/* Background Pattern */}
            {config.background === 'accent' && (
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-10 left-10 w-40 h-40 border-2 border-primary rounded-full animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-secondary rounded-full animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-primary rounded-full animate-pulse"></div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    {config.subtitle && (
                        <div className="inline-flex items-center bg-white backdrop-blur-sm px-6 py-3 rounded-full customtext-primary font-medium mb-6 border border-primary shadow-sm">
                           
                            {config.subtitle}
                        </div>
                    )}
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {processTitle(config.title || 'Requisitos')}
                    </h2>
                    {config.description && (
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            {processDescription(config.description)}
                        </p>
                    )}
                </div>

                {/* Requirements Grid */}
                <div className={`grid ${getGridCols()} gap-6 lg:gap-8`}>
                    {requirements.map((requirement, index) => {
                        const IconComponent = ICON_MAP[requirement.icon] || FileText;
                        const iconBgColor = getIconBgColor(requirement.color);
                        
                        return (
                            <div
                                key={index}
                                className="bg-white border-2 border-gray-200 rounded-2xl p-6 lg:p-8 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:border-gray-300 group cursor-pointer relative overflow-hidden shadow-lg"
                                style={{
                                    animation: `fadeInUp 0.6s ease-out ${index * 0.15}s backwards`
                                }}
                            >
                                <div className="flex items-start space-x-4">
                                    {/* Icon with colored background - igual que HowItWorks */}
                                    <div className={`p-4 rounded-xl ${iconBgColor} shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                                        <IconComponent className="h-8 w-8 text-white" strokeWidth={2} />
                                    </div>
                                    
                                    <div className="flex-1">
                                        {/* Title - Negro en negrita */}
                                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3  transition-transform duration-300">
                                            {requirement.title}
                                        </h3>
                                        
                                        {/* Description */}
                                        <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
                                            {processDescription(requirement.description)}
                                        </p>

                                        {/* Optional limit badge */}
                                        {requirement.limit && (
                                            <div className="inline-flex items-center px-4 py-2 rounded-full mt-4 border-2 border-gray-300 bg-gray-50 shadow-sm">
                                                <span className="text-sm font-bold text-gray-700">
                                                    {requirement.limit}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Hover indicator pulse */}
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className={`w-3 h-3 ${iconBgColor} rounded-full animate-pulse`}></div>
                                </div>

                                {/* Special badge if marked */}
                                {requirement.isSpecial && (
                                    <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold animate-pulse shadow-lg">
                                        ¡Importante!
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    0% {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
};

export default RequirementsSection;
