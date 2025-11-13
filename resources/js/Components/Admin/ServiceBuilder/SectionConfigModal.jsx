import React, { useState, useEffect, useRef } from 'react';


import SwitchFormGroup from '../../Adminto/form/SwitchFormGroup';

// Importar formularios de configuración
import HeroConfigForm from './forms/HeroConfigForm';
import StepsConfigForm from './forms/StepsConfigForm';
import BenefitsConfigForm from './forms/BenefitsConfigForm';
import FaqConfigForm from './forms/FaqConfigForm';
import CtaConfigForm from './forms/CtaConfigForm';
import CalculatorConfigForm from './forms/CalculatorConfigForm';
import TestimonialsConfigForm from './forms/TestimonialsConfigForm';
import Modal from '../../Adminto/Modal';
import InputFormGroup from '../../Adminto/form/InputFormGroup';

const SectionConfigModal = ({ show, onHide, section, onSave }) => {
    const modalRef = useRef();
    const sectionNameRef = useRef();
    const [formData, setFormData] = useState(section || {});
    const [activeTab, setActiveTab] = useState('general');

    useEffect(() => {
        if (section) {
            // Parse config si viene como string
            const parsedSection = {
                ...section,
                config: typeof section.config === 'string' 
                    ? JSON.parse(section.config) 
                    : section.config || {}
            };
            setFormData(parsedSection);
        }
    }, [section]);

    useEffect(() => {
        if (show && modalRef.current) {
            setTimeout(() => {
                $(modalRef.current).modal('show');
            }, 100);
        } else if (!show && modalRef.current) {
            $(modalRef.current).modal('hide');
        }
    }, [show]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSave = {
            ...formData,
            section_name: sectionNameRef.current?.value || formData.section_name,
            // Incluir ID si existe (para edición)
            id: formData.id || null,
            // Asegurar que config se envíe correctamente
            config: formData.config || {}
        };
        await onSave(dataToSave);
        $(modalRef.current).modal('hide');
    };

    const updateConfig = (key, value) => {
        setFormData(prev => ({
            ...prev,
            config: {
                ...(prev.config || {}),
                [key]: value
            }
        }));
    };

    const renderConfigForm = () => {
        if (!formData || !formData.section_type) {
            return (
                <div className="alert alert-warning">
                    <i className="mdi mdi-alert mr-2"></i>
                    No se pudo cargar la configuración de la sección.
                </div>
            );
        }

        const commonProps = {
            config: formData.config || {},
            updateConfig,
        };

        switch (formData.section_type) {
            case 'hero':
                return <HeroConfigForm {...commonProps} />;
            case 'steps':
                return <StepsConfigForm {...commonProps} />;
            case 'benefits':
                return <BenefitsConfigForm {...commonProps} />;
            case 'faq':
                return <FaqConfigForm {...commonProps} />;
            case 'cta':
                return <CtaConfigForm {...commonProps} />;
            case 'calculator':
                return <CalculatorConfigForm {...commonProps} />;
            case 'testimonials':
                return <TestimonialsConfigForm {...commonProps} />;
            default:
                return (
                    <div className="alert alert-info">
                        <i className="mdi mdi-information mr-2"></i>
                        Configuración no disponible para este tipo de sección.
                    </div>
                );
        }
    };

    if (!formData) return null;

    return (
        <Modal
            modalRef={modalRef}
            title={`Configurar: ${formData.section_name || 'Nueva Sección'}`}
            onSubmit={handleSubmit}
            size="xl"
        >
            <div id="section-config-modal-container">
                {/* Tabs de navegación */}
                <ul className="nav nav-tabs nav-bordered mb-3">
                    <li className="nav-item">
                        <a
                            className={`nav-link ${activeTab === 'general' ? 'active' : ''}`}
                            onClick={() => setActiveTab('general')}
                            style={{ cursor: 'pointer' }}
                        >
                            <i className="mdi mdi-information-outline mr-1"></i>
                            General
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className={`nav-link ${activeTab === 'config' ? 'active' : ''}`}
                            onClick={() => setActiveTab('config')}
                            style={{ cursor: 'pointer' }}
                        >
                            <i className="mdi mdi-tune mr-1"></i>
                            Configuración
                        </a>
                    </li>
                </ul>

                {/* Tab Content */}
                <div className="tab-content">
                    {/* General Tab */}
                    {activeTab === 'general' && (
                        <div className="tab-pane active">
                            <div className="row">
                                <div className="col-md-8">
                                    <InputFormGroup
                                        eRef={sectionNameRef}
                                        label="Nombre de la Sección"
                                        value={formData.section_name}
                                        onChange={(e) => setFormData({ ...formData, section_name: e.target.value })}
                                        required
                                        help="Este nombre es solo para referencia interna"
                                    />
                                </div>
                                <div className="col-md-4">
                                    <InputFormGroup
                                        label="Tipo de Sección"
                                        defaultValue={formData.section_type}
                                        disabled
                                        readOnly
                                    />
                                </div>
                                <div className="col-12">
                                    <SwitchFormGroup
                                        label="Sección visible"
                                        checked={formData.visible}
                                        onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Config Tab */}
                    {activeTab === 'config' && (
                        <div className="tab-pane active">
                            {renderConfigForm()}
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default SectionConfigModal;
