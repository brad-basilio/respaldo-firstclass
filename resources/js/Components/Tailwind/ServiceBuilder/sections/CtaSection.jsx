import React from 'react';
import { ArrowRight, Phone, Mail, MessageCircle } from 'lucide-react';

const CtaSection = ({ config, contacts }) => {
    const {
        title = 'Comienza hoy mismo',
        description = '',
        buttons = [],
        background = 'primary',
        show_contact_info = false,
    } = config;

    const bgClass = background === 'gradient' 
        ? 'bg-gradient-to-br from-primary via-secondary to-primary'
        : background === 'secondary'
        ? 'bg-secondary'
        : 'bg-primary';

    return (
        <section className={`py-16 lg:py-24 ${bgClass}`}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6">
                    {title}
                </h2>
                {description && (
                    <p className="text-xl text-white/90 mb-8 lg:mb-12 max-w-3xl mx-auto">
                        {description}
                    </p>
                )}

                {/* Buttons */}
                {buttons && buttons.length > 0 && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        {buttons.map((button, index) => (
                            <a
                                key={index}
                                href={button.link || '#'}
                                className={`${
                                    button.style === 'primary'
                                        ? 'bg-white hover:bg-gray-100 text-gray-900'
                                        : 'border-2 border-white text-white hover:bg-white hover:text-gray-900'
                                } px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-xl group`}
                            >
                                {button.text}
                                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                            </a>
                        ))}
                    </div>
                )}

                {/* Contact Info */}
                {show_contact_info && contacts && (
                    <div className="flex flex-col sm:flex-row gap-6 justify-center text-white/90">
                        {contacts.phone && (
                            <div className="flex items-center gap-2">
                                <Phone className="h-5 w-5" />
                                <span>{contacts.phone}</span>
                            </div>
                        )}
                        {contacts.email && (
                            <div className="flex items-center gap-2">
                                <Mail className="h-5 w-5" />
                                <span>{contacts.email}</span>
                            </div>
                        )}
                        {contacts.whatsapp && (
                            <div className="flex items-center gap-2">
                                <MessageCircle className="h-5 w-5" />
                                <span>{contacts.whatsapp}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default CtaSection;
