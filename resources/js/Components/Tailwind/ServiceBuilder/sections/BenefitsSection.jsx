import React from 'react';
import { Shield, Clock, Globe, Star, Truck, Award, CheckCircle, Heart } from 'lucide-react';

const iconMap = {
    'Shield': Shield,
    'Clock': Clock,
    'Globe': Globe,
    'Star': Star,
    'Truck': Truck,
    'Award': Award,
    'CheckCircle': CheckCircle,
    'Heart': Heart,
};

const BenefitsSection = ({ config }) => {
    const {
        title = 'Beneficios',
        subtitle = '',
        benefits = [],
        columns = 3,
        background = 'white',
    } = config;

    if (!benefits || benefits.length === 0) {
        return null;
    }

    const gridCols = {
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-2 lg:grid-cols-3',
        4: 'md:grid-cols-2 lg:grid-cols-4',
    }[columns] || 'md:grid-cols-2 lg:grid-cols-3';

    const bgClass = background === 'gray' ? 'bg-gray-50' : 'bg-white';

    return (
        <section className={`py-16 lg:py-24 ${bgClass}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12 lg:mb-16">
                    {subtitle && (
                        <span className="text-primary font-semibold text-sm lg:text-base uppercase tracking-wide">
                            {subtitle}
                        </span>
                    )}
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mt-2">
                        {title}
                    </h2>
                </div>

                {/* Benefits Grid */}
                <div className={`grid grid-cols-1 ${gridCols} gap-8`}>
                    {benefits.map((benefit, index) => {
                        const IconComponent = iconMap[benefit.icon] || CheckCircle;

                        return (
                            <div
                                key={index}
                                className="group p-6 lg:p-8 rounded-xl bg-white border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-xl"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                            <IconComponent className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-300" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm lg:text-base">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;
