import React, { useState, useEffect } from 'react';
import { User, Package, Plane, CheckCircle, MapPin, Truck, Mail } from 'lucide-react';

const iconMap = {
    'User': User,
    'Package': Package,
    'Plane': Plane,
    'CheckCircle': CheckCircle,
    'MapPin': MapPin,
    'Truck': Truck,
    'Mail': Mail,
};

const StepsSection = ({ config }) => {
    const {
        title = '¿Cómo funciona?',
        subtitle = '',
        steps = [],
        auto_advance = true,
        interval = 3000,
        show_numbers = true,
    } = config;

    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        if (!auto_advance || steps.length === 0) return;

        const timer = setInterval(() => {
            setActiveStep(prev => (prev + 1) % steps.length);
        }, interval);

        return () => clearInterval(timer);
    }, [auto_advance, interval, steps.length]);

    if (!steps || steps.length === 0) {
        return null;
    }

    return (
        <section className="py-16 lg:py-24 bg-gray-50">
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

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {steps.map((step, index) => {
                        const IconComponent = iconMap[step.icon] || Package;
                        const isActive = index === activeStep;

                        return (
                            <div
                                key={index}
                                className={`relative p-6 lg:p-8 rounded-2xl transition-all duration-500 transform ${
                                    isActive 
                                        ? 'bg-primary text-white scale-105 shadow-2xl' 
                                        : 'bg-white text-gray-900 hover:shadow-xl'
                                }`}
                                onMouseEnter={() => setActiveStep(index)}
                            >
                                {/* Step Number */}
                                {show_numbers && (
                                    <div className={`absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg ${
                                        isActive ? 'bg-white text-primary' : 'bg-primary text-white'
                                    }`}>
                                        {index + 1}
                                    </div>
                                )}

                                {/* Icon */}
                                <div className={`mb-4 ${isActive ? 'text-white' : 'text-primary'}`}>
                                    <IconComponent className="h-12 w-12" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold mb-3">
                                    {step.title}
                                </h3>
                                <p className={`text-sm lg:text-base ${
                                    isActive ? 'text-white/90' : 'text-gray-600'
                                }`}>
                                    {step.description}
                                </p>

                                {/* Connector Line (except last item) */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300">
                                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default StepsSection;
