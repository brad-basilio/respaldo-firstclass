import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FaqSection = ({ config }) => {
    const {
        title = 'Preguntas Frecuentes',
        subtitle = '',
        faqs = [],
        columns = 1,
    } = config;

    const [openIndex, setOpenIndex] = useState(null);

    if (!faqs || faqs.length === 0) {
        return null;
    }

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const gridCols = columns === 2 ? 'md:grid-cols-2' : '';

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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

                {/* FAQs */}
                <div className={`grid grid-cols-1 ${gridCols} gap-4`}>
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-lg overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                                >
                                    <span className="font-semibold text-gray-900 pr-4">
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        className={`flex-shrink-0 h-5 w-5 text-primary transition-transform duration-200 ${
                                            isOpen ? 'transform rotate-180' : ''
                                        }`}
                                    />
                                </button>
                                <div
                                    className={`px-6 bg-gray-50 transition-all duration-200 ${
                                        isOpen ? 'py-4 max-h-96' : 'max-h-0 py-0'
                                    } overflow-hidden`}
                                >
                                    <p className="text-gray-600">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
