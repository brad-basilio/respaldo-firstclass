import React from 'react';
import TarifasNormativas from '../../FirstClass/TarifasNormativas';

const CalculatorSection = ({ config, generals, contacts }) => {
    const {
        title = 'Calcula tu envío',
        description = '',
        calculator_type = 'shipping_rate',
    } = config;

    return (
        <section className="py-16 lg:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                {title && (
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
                            {title}
                        </h2>
                        {description && (
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                {description}
                            </p>
                        )}
                    </div>
                )}

                {/* Calculator Component */}
                <TarifasNormativas 
                    data={{ ...config }}
                    generals={generals}
                    contacts={contacts}
                />
            </div>
        </section>
    );
};

export default CalculatorSection;
