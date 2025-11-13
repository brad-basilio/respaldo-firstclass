import BaseAdminto from "@Adminto/Base";
import React, { useRef, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Swal from "sweetalert2";
import CreateReactScript from "../Utils/CreateReactScript";
import DxButton from "../Components/dx/DxButton";
import ServiceSectionsRest from "../Actions/Admin/ServiceSectionsRest";
import SectionConfigModal from "../Components/Admin/ServiceBuilder/SectionConfigModal";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const serviceSectionsRest = new ServiceSectionsRest();

const ServiceSections = ({ service_id, service_name, service_slug }) => {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSection, setSelectedSection] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef();

    // Función auxiliar para generar slug seguro (fallback si no hay service_slug)
    const generateSlug = (name) => {
        if (!name || typeof name !== 'string') return 'preview';
        return name.toLowerCase()
            .replace(/[áàäâ]/g, 'a')
            .replace(/[éèëê]/g, 'e')
            .replace(/[íìïî]/g, 'i')
            .replace(/[óòöô]/g, 'o')
            .replace(/[úùüû]/g, 'u')
            .replace(/ñ/g, 'n')
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    };

    // Usar el slug del servicio o generarlo como fallback
    const getServiceSlug = () => service_slug || generateSlug(service_name);

    // Plantillas de secciones disponibles
    const sectionTemplates = [
        {
            type: 'hero',
            name: 'Hero Section',
            icon: 'mdi mdi-home',
            color: 'bg-blue-500',
            description: 'Sección principal con título, descripción y botones',
            defaultConfig: {
                title: 'Título del Servicio',
                subtitle: 'Subtítulo opcional',
                description: 'Descripción del servicio',
                background_type: 'gradient',
                cta_buttons: [
                    { text: 'Comenzar', link: '#', style: 'primary' }
                ],
                text_color: '#FFFFFF',
                overlay_opacity: 30,
            }
        },
        {
            type: 'steps',
            name: 'Proceso en Pasos',
            icon: 'mdi mdi-format-list-numbered',
            color: 'bg-green-500',
            description: 'Muestra el proceso en pasos numerados',
            defaultConfig: {
                title: '¿Cómo funciona?',
                subtitle: 'Proceso Simple',
                steps: [
                    { icon: 'User', title: 'Paso 1', description: 'Descripción del paso' },
                    { icon: 'Package', title: 'Paso 2', description: 'Descripción del paso' },
                    { icon: 'CheckCircle', title: 'Paso 3', description: 'Descripción del paso' },
                ],
                auto_advance: true,
                interval: 3000,
                show_numbers: true,
            }
        },
        {
            type: 'benefits',
            name: 'Beneficios',
            icon: 'mdi mdi-check-circle',
            color: 'bg-purple-500',
            description: 'Grid de beneficios o características',
            defaultConfig: {
                title: 'Beneficios',
                subtitle: 'Por qué elegirnos',
                benefits: [
                    { icon: 'Shield', title: 'Seguro', description: '100% protegido' },
                    { icon: 'Clock', title: 'Rápido', description: 'Entrega veloz' },
                    { icon: 'Star', title: 'Calidad', description: 'Servicio premium' },
                ],
                columns: 3,
                background: 'white',
            }
        },
        {
            type: 'calculator',
            name: 'Calculadora',
            icon: 'mdi mdi-calculator',
            color: 'bg-yellow-500',
            description: 'Calculadora de tarifas interactiva',
            defaultConfig: {
                title: 'Calcula tu envío',
                description: 'Ingresa los datos de tu paquete',
                calculator_type: 'shipping_rate',
            }
        },
        {
            type: 'faq',
            name: 'Preguntas Frecuentes',
            icon: 'mdi mdi-help-circle',
            color: 'bg-indigo-500',
            description: 'Acordeón de preguntas y respuestas',
            defaultConfig: {
                title: 'Preguntas Frecuentes',
                subtitle: 'Dudas comunes',
                faqs: [
                    { question: '¿Pregunta 1?', answer: 'Respuesta aquí' },
                    { question: '¿Pregunta 2?', answer: 'Respuesta aquí' },
                ],
                columns: 1,
            }
        },
        {
            type: 'cta',
            name: 'Call to Action',
            icon: 'mdi mdi-bullhorn',
            color: 'bg-red-500',
            description: 'Llamado a la acción con botones',
            defaultConfig: {
                title: 'Comienza hoy mismo',
                description: 'Regístrate y obtén beneficios',
                buttons: [
                    { text: 'Registrarse', link: '#', style: 'primary' }
                ],
                background: 'primary',
                show_contact_info: false,
            }
        },
        {
            type: 'testimonials',
            name: 'Testimonios',
            icon: 'mdi mdi-comment-quote',
            color: 'bg-pink-500',
            description: 'Testimonios de clientes',
            defaultConfig: {
                title: 'Lo que dicen nuestros clientes',
                subtitle: 'Testimonios',
                testimonials: [
                    {
                        name: 'Cliente',
                        text: 'Excelente servicio',
                        rating: 5,
                        position: 'Cargo',
                    }
                ],
                columns: 3,
            }
        },
    ];

    useEffect(() => {
        loadSections();
    }, []);

    const loadSections = async () => {
        setLoading(true);
        try {
            const response = await serviceSectionsRest.list({ service_id });
            if (response && Array.isArray(response)) {
                setSections(response);
            } else {
                setSections([]);
            }
        } catch (error) {
            console.error('Error loading sections:', error);
            setSections([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAddSection = (template) => {
        const newSection = {
            service_id,
            section_type: template.type,
            section_name: template.name,
            config: template.defaultConfig,
            order_index: sections.length,
            visible: true,
            status: true,
        };
        setSelectedSection(newSection);
        setIsModalOpen(true);
    };

    const handleEditSection = (section) => {
        setSelectedSection(section);
        setIsModalOpen(true);
    };

    const handleSaveSection = async (sectionData) => {
        const result = await serviceSectionsRest.save(sectionData);
        if (result) {
            setIsModalOpen(false);
            setSelectedSection(null);
            // Recargar después de cerrar el modal para evitar overlay
            await loadSections();
        }
    };

    const handleDeleteSection = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: 'Eliminar sección',
            text: '¿Estás seguro de eliminar esta sección?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (!isConfirmed) return;

        const result = await serviceSectionsRest.delete(id);
        if (result) {
            await loadSections();
        }
    };

    const handleToggleVisible = async (section) => {
        const result = await serviceSectionsRest.boolean({
            id: section.id,
            field: 'visible',
            value: !section.visible
        });
        if (result) {
            await loadSections();
        }
    };

    const handleDragEnd = async (dragResult) => {
        if (!dragResult.destination) return;

        const items = Array.from(sections);
        const [reorderedItem] = items.splice(dragResult.source.index, 1);
        items.splice(dragResult.destination.index, 0, reorderedItem);

        // Actualizar order_index
        const updatedSections = items.map((item, index) => ({
            ...item,
            order_index: index
        }));

        setSections(updatedSections);

        const result = await serviceSectionsRest.reorder({
            service_id,
            sections: updatedSections.map(s => ({ id: s.id, order_index: s.order_index }))
        });
        
        if (!result) {
            await loadSections(); // Revertir cambios
        }
    };

    const handlePreview = () => {
        const slug = getServiceSlug();
        window.open(`/servicio/${slug}`, '_blank');
    };

    // Actualizar iframe cuando cambien las secciones (igual que System.jsx)
    useEffect(() => {
        const iframe = $('#service-preview-iframe');
        if (iframe.length) {
            iframe.removeAttr('src');
            iframe.attr('src', iframe.data('path'));
        }
    }, [sections]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-flex align-items-center justify-content-between">
                        <h4 className="mb-0">Constructor de Servicio: {service_name}</h4>
                        
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                {/* Sidebar: Plantillas disponibles */}
                <div className="col-md-2">
                    <div className="card sticky-top" style={{ top: '20px' }}>
                        <div className="card-body p-2">
                            <h6 className="card-title mb-2">
                               
                                Agregar
                            </h6>
                            <p className="text-muted small mb-2" style={{ fontSize: '11px' }}>
                                Haz clic para agregar
                            </p>
                            <div className="section-templates">
                                {sectionTemplates.map((template) => (
                                    <div
                                        key={template.type}
                                        className="template-card mb-2 p-2 border rounded cursor-pointer transition-all"
                                        onClick={() => handleAddSection(template)}
                                        style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateX(3px)';
                                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateX(0)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        <div className="d-flex align-items-center gap-1">
                                            <div 
                                                className={`icon-wrapper text-white rounded  mr-4`}
                                                style={{
                                                    background: template.color.replace('bg-', '').includes('blue') ? '#4E73DF' :
                                                               template.color.includes('green') ? '#1CC88A' :
                                                               template.color.includes('purple') ? '#6F42C1' :
                                                               template.color.includes('yellow') ? '#F6C23E' :
                                                               template.color.includes('indigo') ? '#5A67D8' :
                                                               template.color.includes('red') ? '#E74A3B' :
                                                               '#E83E8C',
                                                    minWidth: '28px',
                                                    height: '28px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '12px'
                                                }}
                                            >
                                                <i className={`${template.icon}`}></i>
                                            </div>
                                            <div className="flex-1 ml-4" >
                                                <h6  style={{ fontSize: '11px', fontWeight: 'bold' }}>{template.name}</h6>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main: Secciones agregadas */}
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body p-2">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <h6 className="card-title mb-0">
                                       
                                        Secciones
                                        <span className="badge badge-soft-primary ml-1" style={{ fontSize: '10px' }}>{sections.length}</span>
                                    </h6>
                                    <small className="text-muted" style={{ fontSize: '10px' }}>
                                        Arrastra para reordenar
                                    </small>
                                </div>
                            </div>

                            {sections.length === 0 ? (
                                <div className="text-center py-4">
                                    <i className="mdi mdi-puzzle font-48 text-muted opacity-50"></i>
                                    <p className="text-muted small mb-0 mt-2">
                                        Sin secciones
                                    </p>
                                </div>
                            ) : (
                                <DragDropContext onDragEnd={handleDragEnd}>
                                    <Droppable droppableId="sections">
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className={snapshot.isDraggingOver ? 'dragging-over' : ''}
                                            >
                                                {sections.map((section, index) => (
                                                    <Draggable
                                                        key={section.id}
                                                        draggableId={section.id}
                                                        index={index}
                                                    >
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                className={`section-item card mb-2 ${
                                                                    snapshot.isDragging ? 'shadow-lg' : ''
                                                                } ${!section.visible ? 'opacity-60' : ''}`}
                                                                style={{
                                                                    ...provided.draggableProps.style,
                                                                    transform: snapshot.isDragging 
                                                                        ? `${provided.draggableProps.style.transform} rotate(2deg)` 
                                                                        : provided.draggableProps.style.transform,
                                                                    transition: 'all 0.2s ease'
                                                                }}
                                                            >
                                                                <div className="card-body p-2">
                                                                    <div className="d-flex align-items-center">
                                                                        {/* Drag Handle */}
                                                                        <div
                                                                            {...provided.dragHandleProps}
                                                                            className="drag-handle mr-2"
                                                                            style={{ 
                                                                                cursor: 'grab',
                                                                                color: '#999',
                                                                                transition: 'color 0.2s'
                                                                            }}
                                                                            onMouseEnter={(e) => e.currentTarget.style.color = '#333'}
                                                                            onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
                                                                        >
                                                                            <i className="mdi mdi-drag-vertical font-18"></i>
                                                                        </div>

                                                                       

                                                                        {/* Section Info */}
                                                                        <div className="flex-1">
                                                                            <h6 className="mb-0" style={{ fontSize: '12px', fontWeight: 'bold' }}>
                                                                                {section.section_name}
                                                                                {!section.visible && (
                                                                                    <span className="badge badge-warning ml-1" style={{ fontSize: '9px' }}>
                                                                                        Oculta
                                                                                    </span>
                                                                                )}
                                                                            </h6>
                                                                            <small className="text-muted" style={{ fontSize: '10px' }}>
                                                                                {section.config?.title || section.config?.description || 'Sin config'}
                                                                            </small>
                                                                        </div>

                                                                        {/* Actions */}
                                                                        <div className="btn-group btn-group-sm">
                                                                            <button
                                                                                className={`btn btn-xs ${section.visible ? 'btn-light' : 'btn-secondary'}`}
                                                                                onClick={() => handleToggleVisible(section)}
                                                                                title={section.visible ? 'Ocultar' : 'Mostrar'}
                                                                            >
                                                                                <i className={`mdi ${section.visible ? 'mdi-eye' : 'mdi-eye-off'}`} style={{ fontSize: '14px' }}></i>
                                                                            </button>
                                                                            <button
                                                                                className="btn btn-xs btn-info"
                                                                                onClick={() => handleEditSection(section)}
                                                                                title="Configurar"
                                                                            >
                                                                                <i className="mdi mdi-cog" style={{ fontSize: '14px' }}></i>
                                                                            </button>
                                                                            <button
                                                                                className="btn btn-xs btn-danger"
                                                                                onClick={() => handleDeleteSection(section.id)}
                                                                                title="Eliminar"
                                                                            >
                                                                                <i className="mdi mdi-delete" style={{ fontSize: '14px' }}></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            )}
                        </div>
                    </div>
                </div>

                {/* Vista Previa con Iframe */}
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body p-2">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h6 className="mb-0">
                                    <i className="mdi mdi-eye text-primary mr-1"></i>
                                    Vista Previa en Vivo
                                </h6>
                                <button
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={handlePreview}
                                    disabled={sections.length === 0}
                                >
                                    <i className="mdi mdi-open-in-new mr-1"></i>
                                    Abrir
                                </button>
                            </div>
                            {sections.length === 0 ? (
                                <div className="border rounded d-flex align-items-center justify-content-center text-muted" style={{ minHeight: 'calc(100vh - 200px)' }}>
                                    <div className="text-center">
                                        <i className="mdi mdi-monitor-screenshot font-48 mb-2"></i>
                                        <p className="mb-0">Agrega secciones para ver la vista previa</p>
                                    </div>
                                </div>
                            ) : (
                                <iframe
                                    id="service-preview-iframe"
                                    src={`/servicio/${getServiceSlug()}`}
                                    data-path={`/servicio/${getServiceSlug()}`}
                                    className="w-100 border rounded"
                                    style={{ minHeight: 'calc(100vh - 200px)', borderRadius: '4px' }}
                                    title="Vista Previa del Servicio"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Configuración */}
            {isModalOpen && selectedSection && (
                <SectionConfigModal
                    show={isModalOpen}
                    section={selectedSection}
                    onSave={handleSaveSection}
                    onHide={() => {
                        setIsModalOpen(false);
                        setSelectedSection(null);
                    }}
                />
            )}

            <style dangerouslySetInnerHTML={{ __html: `
                .template-card {
                    background: #fff;
                    border: 1px solid #e3e6f0;
                }
                .template-card:hover {
                    background-color: #f8f9fc;
                    border-color: #4e73df;
                }
                .template-card:active {
                    transform: translateX(5px) scale(0.98);
                }
                .section-item {
                    border-left: 3px solid #4e73df;
                }
                .section-item.shadow-lg {
                    border-left-color: #667eea;
                }
                .opacity-60 {
                    opacity: 0.6;
                }
                .badge-soft-primary {
                    background-color: #e7f1ff;
                    color: #4e73df;
                }
                .badge-soft-info {
                    background-color: #d1f0ff;
                    color: #36b9cc;
                }
                .transition-all {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .dragging-over {
                    background-color: #f0f7ff;
                    border: 2px dashed #4e73df;
                    border-radius: 8px;
                    padding: 8px;
                }
                .rounded-lg {
                    border-radius: 8px;
                }
                .opacity-50 {
                    opacity: 0.5;
                }
                .font-72 {
                    font-size: 72px;
                }
            ` }} />
        </div>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Constructor de Servicio">
            <ServiceSections {...properties} />
        </BaseAdminto>
    );
});
