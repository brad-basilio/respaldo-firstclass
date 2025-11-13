import React, { lazy, Suspense } from 'react';

const SectionRenderer = lazy(() => import('./ServiceBuilder/SectionRenderer'));

const ServiceBuilder = ({ which, data, items = [], generals, contacts, pages }) => {
    // items[0] es el servicio con sus secciones
    const service = items[0];
    
    if (!service) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-800">Servicio no encontrado</h2>
                <p className="text-gray-600 mt-2">El servicio que buscas no existe o no está disponible.</p>
            </div>
        );
    }

    const sections = service.sections || [];

    // Ordenar secciones por order_index y filtrar las visibles
    const sortedSections = [...sections]
        .filter(section => section.visible && section.status)
        .sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

    if (sortedSections.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-800">{service.name}</h2>
                <p className="text-gray-600 mt-2">Este servicio aún no tiene contenido configurado.</p>
            </div>
        );
    }

    return (
        <div className="service-page">
            {sortedSections.map((section, index) => (
                <Suspense 
                    key={section.id}
                    fallback={
                        <div className="h-64 flex items-center justify-center bg-gray-50">
                            <div className="flex flex-col items-center gap-3">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                                <p className="text-gray-600">Cargando sección...</p>
                            </div>
                        </div>
                    }
                >
                    <SectionRenderer
                        section={section}
                        service={service}
                        generals={generals}
                        contacts={contacts}
                        pages={pages}
                        index={index}
                    />
                </Suspense>
            ))}
        </div>
    );
};

export default ServiceBuilder;
