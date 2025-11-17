import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = ({ config, testimonials = [] }) => {
    const {
        title = 'Lo que dicen nuestros clientes',
        subtitle = '',
        description = '',
        columns = 3,
        background = 'white'
    } = config;

    // Usar testimonials de la BD, filtrar activos
    const activeTestimonials = testimonials.filter(t => t.visible && t.status);

    if (!activeTestimonials || activeTestimonials.length === 0) {
        return null;
    }

    const gridCols = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

    const bgClass = background === 'gray-50' ? 'bg-gray-50' : 
                    background === 'accent' ? 'bg-accent' : 'bg-white';

    return (
        <section className={`py-16 lg:py-24 ${bgClass}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12 lg:mb-16">
                    {subtitle && (
                        <span className="customtext-neutral-light text-sm lg:text-base uppercase tracking-wide">
                            {subtitle}
                        </span>
                    )}
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mt-2">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
                            {description}
                        </p>
                    )}
                </div>

                {/* Testimonials Grid */}
                <div className={`grid ${gridCols} gap-8`}>
                    {activeTestimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="relative p-8 rounded-2xl bg-gray-50 border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-xl"
                        >
                            <Quote className="absolute top-4 right-4 h-12 w-12 text-primary/10" />
                            
                            {/* Rating */}
                            {testimonial.rating && (
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-5 w-5 ${
                                                i < testimonial.rating
                                                    ? 'text-yellow-400 fill-current'
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Testimonial Text */}
                            <p className="text-gray-700 mb-6 relative z-10">
                                "{testimonial.description}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                {testimonial.image && (
                                    <img
                                        src={`/storage/images/testimony/${testimonial.image}`}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                        onError={(e) => {
                                            e.target.src = '/api/cover/thumbnail/null';
                                        }}
                                    />
                                )}
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {testimonial.name}
                                    </p>
                                    {testimonial.role && (
                                        <p className="text-sm text-gray-600">
                                            {testimonial.role}
                                            {testimonial.country && ` • ${testimonial.country}`}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
