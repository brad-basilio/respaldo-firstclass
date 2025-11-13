import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, MessageCircle, Phone } from 'lucide-react';
import TextWithHighlight from '../../../Utils/TextWithHighlight';

const SliderFirstClass = ({ sliders = [], data }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Datos por defecto si no hay sliders
    const defaultSlides = [
        {
            id: 1,
            name: "Envíos Seguros",
            subtitle: "desde y hacia Estados Unidos",
            description: "Servicio de mensajería internacional de primera clase para personas, empresas y negocios con la mejor tecnología y seguimiento en tiempo real.",
            button_text: "Regístrate Gratis",
            button_link: "/registro",
            secondary_button_text: "Contacta un asesor",
            secondary_button_link: "/contacto",
            bg_image: "https://images.pexels.com/photos/5025639/pexels-photo-5025639.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
            bgGradient: "from-primary via-secondary to-primary"
        },
        {
            id: 2,
            name: "Tu dirección personal en",
            subtitle: "Miami, Florida",
            description: "Obtén tu casillero virtual en Miami y accede a miles de tiendas estadounidenses. Compra productos originales al mejor precio y recíbelos en tu país.",
            button_text: "Crear Casillero",
            button_link: "/casillero-virtual",
            secondary_button_text: "Ver beneficios",
            secondary_button_link: "/beneficios",
            bg_image: "https://images.pexels.com/photos/4246148/pexels-photo-4246148.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
            bgGradient: "from-secondary via-primary to-secondary"
        },
        {
            id: 3,
            name: "Soluciones empresariales",
            subtitle: "especializadas",
            description: "Servicios de importación y exportación para empresas. Asesoría personalizada en trámites aduaneros y logística internacional optimizada.",
            button_text: "Servicios Empresariales",
            button_link: "/empresas",
            secondary_button_text: "Hablar con experto",
            secondary_button_link: "/contacto-empresas",
            bg_image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
            bgGradient: "from-gray-900 via-black to-gray-800"
        }
    ];

    // Ordenar sliders por order_index de menor a mayor
    const sortedSlides = sliders?.length > 0 
        ? [...sliders].sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
        : defaultSlides;

    const slides = sortedSlides;

    const nextSlide = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentSlide((prev) => (prev + 1) % slides.length);
            setTimeout(() => setIsAnimating(false), 1000);
        }
    };

    const prevSlide = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
            setTimeout(() => setIsAnimating(false), 1000);
        }
    };

    const goToSlide = (index) => {
        if (!isAnimating && index !== currentSlide) {
            setIsAnimating(true);
            setCurrentSlide(index);
            setTimeout(() => setIsAnimating(false), 1000);
        }
    };

    // Auto-advance slides
    useEffect(() => {
        const timer = setInterval(() => {
            if (!isAnimating) {
                nextSlide();
            }
        }, 7000);
        return () => clearInterval(timer);
    }, [isAnimating]);

    const currentSlideData = slides[currentSlide];
    console.log('Current Slide Data:', currentSlideData);

    // Extraer el ID del video de YouTube o usar directamente el ID si ya viene limpio
    const getYoutubeEmbedUrl = (input) => {
        if (!input) return null;
        
        let videoId = input;
        
        // Si parece ser una URL completa, extraer el ID
        if (input.includes('youtube.com') || input.includes('youtu.be')) {
            const patterns = [
                /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
                /youtube\.com\/embed\/([^&\n?#]+)/,
                /youtube\.com\/v\/([^&\n?#]+)/
            ];
            
            for (let pattern of patterns) {
                const match = input.match(pattern);
                if (match && match[1]) {
                    videoId = match[1];
                    break;
                }
            }
        }
        
        // Limpiar cualquier parámetro adicional del ID
        videoId = videoId.split('&')[0].split('?')[0];
        
        // Construir la URL embed
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;
    };

    // Validar que bg_video tenga un valor real (no null, "null", undefined, o vacío)
    const hasValidVideo = currentSlideData?.bg_video && 
                         currentSlideData.bg_video !== 'null' && 
                         currentSlideData.bg_video.trim() !== '';
    
    const videoEmbedUrl = hasValidVideo ? getYoutubeEmbedUrl(currentSlideData.bg_video) : null;
    
    // Debug - puedes comentar esto después de verificar
    useEffect(() => {
        console.log('=== SLIDER DEBUG ===');
        console.log('Current Slide Index:', currentSlide);
        console.log('Current Slide Data:', currentSlideData);
        console.log('bg_video value:', currentSlideData?.bg_video);
        console.log('bg_video type:', typeof currentSlideData?.bg_video);
        console.log('hasValidVideo:', hasValidVideo);
        console.log('Video Embed URL:', videoEmbedUrl);
        console.log('==================');
    }, [currentSlide]);

    return (
        <section className={`relative overflow-hidden ${data?.class_slider || ''}`} 
                 style={{ margin: 0, padding: 0 }}>
            {/* Background with gradient and image/video */}
            <div className={`absolute inset-0  ${currentSlideData.bgGradient || ' bg-gradient-to-br from-primary to-secondary'} transition-all duration-1000 ease-in-out ${data?.class_overlay || 'bg-gradient-to-b from-[#ffffff] via-[#03989e] to-[#0e99a0]'}`}>
                <div className="absolute inset-0 opacity-30">
                    {videoEmbedUrl ? (
                        <div className="w-full h-full relative overflow-hidden">
                            <iframe
                                key={`video-${currentSlide}`}
                                src={videoEmbedUrl}
                                className="absolute pointer-events-none"
                                style={{ 
                                    top: '50%',
                                    left: '50%',
                                    width: '177.77777778vh',
                                    minWidth: '100%',
                                    height: '56.25vw',
                                    minHeight: '100%',
                                    transform: 'translate(-50%, -50%)',
                                }}
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                title={`${currentSlideData.name}-background-video`}
                            />
                        </div>
                    ) : (
                        <img
                            src={`/storage/images/slider/${currentSlideData.bg_image || currentSlideData.image}`}
                            alt={`${currentSlideData.name}-background`}
                            className="w-full h-full object-cover transition-all duration-1000"
                            onError={(e) => e.target.src = '/api/cover/thumbnail/null'}
                        />
                    )}
                </div>
             
             
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                disabled={isAnimating}
                className={`absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 lg:p-4 rounded-full transition-all duration-300 group hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${data?.class_arrows || ''}`}
                aria-label="Slide anterior"
            >
                <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6 text-white group-hover:scale-110 transition-transform duration-200" />
            </button>
            
            <button
                onClick={nextSlide}
                disabled={isAnimating}
                className={`absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 lg:p-4 rounded-full transition-all duration-300 group hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${data?.class_arrows || ''}`}
                aria-label="Siguiente slide"
            >
                <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6 text-white group-hover:scale-110 transition-transform duration-200" />
            </button>

            {/* Slide Indicators */}
            <div className={`absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3 ${data?.class_indicators || ''}`}>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        disabled={isAnimating}
                        className={`w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
                            index === currentSlide 
                                ? 'bg-white scale-125 shadow-lg' 
                                : 'bg-white/50 hover:bg-white/75 hover:scale-110'
                        }`}
                        aria-label={`Ir al slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Main Content Container */}
            <div className="relative z-20 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 md:py-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100dvh-20dvh)] py-10">
                        
                        {/* Left Content */}
                        <div className="text-center lg:text-left">
                            {/* Badge - solo si existe subtitle */}
                            {currentSlideData.subtitle && (
                                <div className="inline-flex items-center mb-6">
                                    <span 
                                        key={`badge-${currentSlide}`}
                                        className="bg-primary text-white px-4 py-2 lg:px-6 lg:py-3 rounded-full text-sm lg:text-base font-medium shadow-lg backdrop-blur-sm animate-hero-badge"
                                    >
                                        {currentSlideData.subtitle}
                                    </span>
                                </div>
                            )}

                            {/* Title */}
                            <h1 
                                className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight ${data?.class_title || ''}`}
                              
                            >
                                {currentSlideData.name && (
                                    <TextWithHighlight text={currentSlideData.name} color={`${data?.class_highlight_title || 'bg-primary'}`} />
                                )}
                            </h1>

                            {/* Description */}
                            <p 
                                key={`desc-${currentSlide}`}
                                className={`text-xl lg:text-2xl text-white/90 mb-8 lg:mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-hero-description ${data?.class_description || ''}`}
                                style={{
                                    color: currentSlideData.description_color || '#FFFFFF',
                                    textShadow: "0 0 20px rgba(0, 0, 0, .25)",
                                }}
                            >
                                {currentSlideData.description}
                            </p>

                            {/* Buttons */}
                            <div 
                                key={`buttons-${currentSlide}`}
                                className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start animate-hero-buttons"
                            >
                                {currentSlideData.button_text && (
                                    <a 
                                        href={currentSlideData.button_link || '#'}
                                        className={`bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 lg:px-10 lg:py-5 rounded-xl text-lg lg:text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center shadow-xl group ${data?.class_button_primary || ''}`}
                                    >
                                        {currentSlideData.button_text}
                                        <ArrowRight className="ml-3 h-5 w-5 lg:h-6 lg:w-6 group-hover:translate-x-1 transition-transform duration-200" />
                                    </a>
                                )}
                                {/*currentSlideData.secondary_button_text && (
                                    <a
                                        href={currentSlideData.secondary_button_link || '#'}
                                        className={`border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 px-8 py-4 lg:px-10 lg:py-5 rounded-xl text-lg lg:text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center group ${data?.class_button_secondary || ''}`}
                                    >
                                        <MessageCircle className="mr-3 h-5 w-5 lg:h-6 lg:w-6 group-hover:scale-110 transition-transform duration-200" />
                                        {currentSlideData.secondary_button_text}
                                    </a>
                                )*/}
                            </div>
                        </div>

                       
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SliderFirstClass;