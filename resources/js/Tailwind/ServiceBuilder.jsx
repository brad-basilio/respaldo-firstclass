import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import CreateReactScript from '../Utils/CreateReactScript';
import { Toaster } from "sonner";

// Importaciones lazy para componentes del sistema
const TopBar = React.lazy(() => import("../Components/Tailwind/TopBar"));
const Header = React.lazy(() => import("../Components/Tailwind/Header"));
const Footer = React.lazy(() => import("../Components/Tailwind/Footer"));
const ServiceBuilderComponent = React.lazy(() => import("../Components/Tailwind/ServiceBuilder"));

// Fallback de carga
const LoadingFallback = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Cargando servicio...</p>
        </div>
    </div>
);

const ServiceBuilder = ({ service, generals, systems, fonts, colors, serviceCategories = [], faqs = [], testimonials = [] }) => {
    console.log('ServiceBuilder loaded', { service, generals, systems, fonts, colors, serviceCategories, faqs, testimonials });
    
    return (
        <>
            <Toaster position="top-right" richColors />
            
            <Suspense fallback={<LoadingFallback />}>
                {/* TopBar */}
                {(() => {
                    const topbar = systems?.find(s => s.component === 'topbar' && s.visible);
                    return topbar && (
                        <TopBar
                            which={topbar.value}
                            data={topbar.data}
                            generals={generals}
                            systems={systems}
                            fonts={fonts}
                            colors={colors}
                        />
                    );
                })()}

                {/* Header */}
                {(() => {
                    const header = systems?.find(s => s.component === 'header' && s.visible);
                    return header && (
                        <Header
                            which={header.value}
                            data={header.data}
                            items={serviceCategories}
                            generals={generals}
                            systems={systems}
                            fonts={fonts}
                            colors={colors}
                            cart={[]}
                            setCart={() => {}}
                            pages={[]}
                            isUser={null}
                            headerPosts={[]}
                            contacts={{}}
                        />
                    );
                })()}

                {/* Contenido del Servicio */}
                <ServiceBuilderComponent
                    which="service"
                    data={{}}
                    items={[service]}
                    generals={generals}
                    contacts={generals}
                    pages={[]}
                    faqs={faqs}
                    testimonials={testimonials}
                />

                {/* Footer */}
                {(() => {
                    const footer = systems?.find(s => s.component === 'footer' && s.visible);
                    return footer && (
                        <Footer
                            which={footer.value}
                            data={footer.data}
                            generals={generals}
                            systems={systems}
                            fonts={fonts}
                            colors={colors}
                            contacts={{}}
                            stores={[]}
                        />
                    );
                })()}
            </Suspense>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(<ServiceBuilder {...properties} />);
});
