import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FaqSection = ({ config, faqs = [] }) => {
    console.log('FaqSection - FAQs recibidas:', faqs);
    console.log('FaqSection - Tipo de faqs:', typeof faqs, Array.isArray(faqs));
    console.log('FaqSection - Cantidad:', faqs?.length);
    console.log('FaqSection - Config:', config);
    
    const {
        title = 'Preguntas Frecuentes',
        subtitle = '',
        description = '',
        background = 'white',
        showSearch = true
    } = config;

    const [searchTerm, setSearchTerm] = useState("");
    const [openIndex, setOpenIndex] = useState(null);

    // NO filtrar por status primero para debug
    const activeFaqs = Array.isArray(faqs) ? faqs : [];

    // Filtrar por búsqueda
    const filteredFaqs = activeFaqs.filter(faq => {
        if (!searchTerm) return true;
        const search = searchTerm.toLowerCase();
        return (
            faq.question?.toLowerCase().includes(search) ||
            faq.answer?.toLowerCase().includes(search)
        );
    });

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Función para procesar título con *palabra* para resaltado
    const processTitle = (text) => {
        if (!text) return null;
        const parts = text.split(/(\*[^*]+\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('*') && part.endsWith('*')) {
                const word = part.slice(1, -1);
                return <span key={index} className="customtext-primary">{word}</span>;
            }
            return <span key={index}>{part}</span>;
        });
    };

    const bgClass = background === 'gray-50' ? 'bg-gray-50' : 
                    background === 'accent' ? 'bg-accent' : 'bg-white';

    return (
        <section className={`py-20 ${bgClass} relative overflow-hidden`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 right-20 w-32 h-32 border-2 border-primary rounded-full"></div>
                <div className="absolute bottom-20 left-20 w-24 h-24 border-2 border-secondary rounded-full"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    {subtitle && (
                        <span className="customtext-neutral-light text-base lg:text-xl mb-3 inline-block uppercase tracking-wide">
                            {subtitle}
                        </span>
                    )}
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        {processTitle(title)}
                    </h2>
                    {description && (
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {description}
                        </p>
                    )}
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-4"></div>
                </div>

                {/* Search Bar */}
                {showSearch && (
                    <div className="mb-8">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar pregunta..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-6 py-4 pr-12 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                            />
                            <svg
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                )}

                {/* FAQs */}
                {filteredFaqs.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 text-lg">
                            {searchTerm ? 'No se encontraron preguntas que coincidan con tu búsqueda' : 'No hay preguntas frecuentes disponibles'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredFaqs.map((faq, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <div
                                    key={faq.id || index}
                                    className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md"
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full px-6 py-5 text-left flex items-center justify-between group"
                                    >
                                        <span className="font-semibold text-gray-900 text-lg pr-4 group-hover:customtext-primary transition-colors">
                                            {faq.question}
                                        </span>
                                        <ChevronDown
                                            className={`flex-shrink-0 h-6 w-6 customtext-primary transition-transform duration-300 ${
                                                isOpen ? 'transform rotate-180' : ''
                                            }`}
                                        />
                                    </button>
                                    <div
                                        className={`px-6 bg-gray-50 transition-all duration-300 overflow-hidden ${
                                            isOpen ? 'py-5 max-h-96' : 'max-h-0 py-0'
                                        }`}
                                    >
                                        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FaqSection;
