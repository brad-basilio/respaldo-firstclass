import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = ({ config }) => {
    const {
        title = 'Lo que dicen nuestros clientes',
        subtitle = '',
        testimonials = [],
        columns = 3,
    } = config;

    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    const gridCols = {
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-2 lg:grid-cols-3',
    }[columns] || 'md:grid-cols-2 lg:grid-cols-3';

    return (
        <section className="py-16 lg:py-24 bg-white">
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

                {/* Testimonials Grid */}
                <div className={`grid grid-cols-1 ${gridCols} gap-8`}>
                    {testimonials.map((testimonial, index) => (
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
                                "{testimonial.text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                {testimonial.avatar && (
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                )}
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {testimonial.name}
                                    </p>
                                    {testimonial.position && (
                                        <p className="text-sm text-gray-600">
                                            {testimonial.position}
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
