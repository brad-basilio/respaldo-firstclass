import React from 'react';
import * as LucideIcons from 'lucide-react';

const CategoryCardsSection = ({ config, generals = [] }) => {
    const {
        title = 'Categorías',
        subtitle = '',
        description = '',
        categories = [],
        columns = 3,
        background = 'white',
        cardStyle = 'gradient' // 'gradient' o 'border'
    } = config;

    // Obtener colores de generals
    const getColorFromGenerals = (colorClass) => {
        if (!colorClass) return '#06b6d4'; // cyan por defecto
        
        // Extraer el nombre del color: bg-primary -> primary
        const colorName = colorClass.replace('bg-', '');
        
        // Buscar el color en generals
        const colorGeneral = generals?.find(x => x.name === colorName);
        
        if (colorGeneral?.description) {
            return colorGeneral.description;
        }
        
        // Colores por defecto si no se encuentra en generals
        const defaultColors = {
            'primary': '#06b6d4',
            'secondary': '#3b82f6',
            'neutral-dark': '#1f2937',
            'neutral-light': '#6b7280'
        };
        
        return defaultColors[colorName] || '#06b6d4';
    };

    // Función para procesar título con *palabra* para resaltado
    const processTitle = (text) => {
        if (!text) return null;
        const parts = text.split(/(\*[^*]+\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('*') && part.endsWith('*')) {
                const word = part.slice(1, -1);
                return <span key={index} className="customtext-primary"><br/>{word}<br/></span>;
            }
            return <span key={index}>{part}</span>;
        });
    };

    const processDescription = (text) => {
        if (!text) return null;
        let processedText = text.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
        return <span dangerouslySetInnerHTML={{ __html: processedText }} />;
    };

    // Función para renderizar el icono de Lucide
    const renderIcon = (iconName) => {
        if (!iconName) return '📦';
        
        // Intentar obtener el componente de icono de Lucide
        const IconComponent = LucideIcons[iconName];
        
        if (IconComponent) {
            return <IconComponent className="w-16 h-16 mx-auto" strokeWidth={1.5} />;
        }
        
        // Si no existe el icono, mostrar un emoji por defecto
        return '📦';
    };

    if (!categories || categories.length === 0) {
        return null;
    }

    const gridCols = {
        1: 'md:grid-cols-1',
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
                    {subtitle && (
                        <span className="customtext-neutral-light text-base lg:text-xl mb-3 inline-block">
                            {subtitle}
                        </span>
                    )}
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        {processTitle(title)}
                    </h2>
                    {description && (
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {processDescription(description)}
                        </p>
                    )}
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-4"></div>
                </div>

                {/* Categories Grid */}
                <div className={`grid grid-cols-1 ${gridCols} gap-8`}>
                    {categories.map((category, index) => {
                        // Obtener el color real de generals
                        const bgColor = getColorFromGenerals(category.color || 'bg-primary');

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
                                {cardStyle === 'gradient' ? (
                                    // Estilo con color sólido (como Requisitos por Valor)
                                    <div 
                                        className="h-full rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                                        style={{ backgroundColor: bgColor }}
                                    >
                                        {/* Icon */}
                                        <div className="mb-6 text-center text-white group-hover:scale-110 transition-transform duration-300">
                                            {category.iconName ? renderIcon(category.iconName) : (category.icon || category.emoji || '📦')}
                                        </div>

                                        {/* Título */}
                                        <h3 className="text-2xl font-bold text-white mb-4 text-center">
                                            {category.categoria || category.titulo || category.title}
                                        </h3>

                                        {/* Lista de items/requisitos */}
                                        <ul className="space-y-3">
                                            {(category.requisitos || category.items || []).map((item, i) => (
                                                <li key={i} className="flex items-start text-white">
                                                    <span className="mr-3 mt-1 flex-shrink-0">
                                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                    </span>
                                                    <span className="text-white/95 leading-relaxed">
                                                        {typeof item === 'string' ? item : item.text || item.name}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    // Estilo con border (como Mercancía Prohibida)
                                    <div className="h-full bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-500 relative overflow-hidden group-hover:scale-105 transform">
                                        {/* Color overlay on hover */}
                                        <div 
                                            className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl"
                                            style={{ backgroundColor: bgColor }}
                                        ></div>
                                        
                                        {/* Corner accent */}
                                        <div className="absolute top-0 right-0 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                                            <div 
                                                className="absolute top-0 right-0 w-full h-full rounded-bl-3xl"
                                                style={{ backgroundColor: bgColor }}
                                            ></div>
                                        </div>

                                        <div className="relative z-10">
                                            {/* Icon */}
                                            <div 
                                                className="mb-6 text-center group-hover:scale-110 transition-transform duration-300"
                                                style={{ color: bgColor }}
                                            >
                                                {category.iconName ? renderIcon(category.iconName) : (category.icon || category.emoji || '📦')}
                                            </div>

                                            {/* Título */}
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center transition-colors duration-300 group-hover:text-current"
                                                style={{ '--hover-color': bgColor }}
                                            >
                                                {category.categoria || category.titulo || category.title}
                                            </h3>

                                            {/* Lista de items/requisitos */}
                                            <ul className="space-y-3">
                                                {(category.requisitos || category.items || []).map((item, i) => (
                                                    <li key={i} className="flex items-start text-gray-600">
                                                        <span 
                                                            className="mr-3 mt-1 flex-shrink-0"
                                                            style={{ color: bgColor }}
                                                        >
                                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                            </svg>
                                                        </span>
                                                        <span className="leading-relaxed">
                                                            {typeof item === 'string' ? item : item.text || item.name}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
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

export default CategoryCardsSection;
