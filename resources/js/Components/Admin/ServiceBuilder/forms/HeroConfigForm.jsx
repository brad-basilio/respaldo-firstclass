import React, { useState } from 'react';
import Swal from 'sweetalert2';
import InputFormGroup from '../../../../Components/Adminto/form/InputFormGroup';
import TextareaFormGroup from '../../../../Components/Adminto/form/TextareaFormGroup';

const HeroConfigForm = ({ config, updateConfig }) => {
    const [newButton, setNewButton] = useState({ text: '', link: '', style: 'primary' });
    const [imagePreview, setImagePreview] = useState(config.background_image || null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Preview inmediato
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);

        // Subir imagen
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/admin/service-sections/upload-image', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
                    'Accept': 'application/json',
                },
                body: formData
            });

            const data = await response.json();
            
            if (data.location) {
                updateConfig('background_image', data.location);
                Swal.fire({
                    icon: 'success',
                    title: 'Imagen guardada',
                    timer: 1500,
                    showConfirmButton: false
                });
            } else {
                throw new Error(data.error || 'Error al subir');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo subir la imagen'
            });
            setImagePreview(null);
        }
    };

    const addButton = () => {
        if (!newButton.text || !newButton.link) return;
        const buttons = [...(config.cta_buttons || []), newButton];
        updateConfig('cta_buttons', buttons);
        setNewButton({ text: '', link: '', style: 'primary' });
    };

    const removeButton = (index) => {
        const buttons = config.cta_buttons.filter((_, i) => i !== index);
        updateConfig('cta_buttons', buttons);
    };

    return (
        <div className="row">
            {/* Columna Izquierda: Imagen de Fondo */}
            <div className="col-md-4">
                <label className="font-weight-bold mb-2">Imagen de Fondo</label>
                {imagePreview && (
                    <div className="mb-2">
                        <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="img-fluid rounded"
                            style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                        />
                        <button
                            type="button"
                            className="btn btn-sm btn-danger btn-block mt-2"
                            onClick={() => {
                                setImagePreview(null);
                                updateConfig('background_image', null);
                            }}
                        >
                            <i className="mdi mdi-delete mr-1"></i>
                            Eliminar
                        </button>
                    </div>
                )}
                <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
                <small className="text-muted d-block mt-1">
                    Aparecerá con 20% de opacidad
                </small>
            </div>

            {/* Columna Derecha: Información */}
            <div className="col-md-8">
                <div className="row">
                    <div className="col-12">
                        <TextareaFormGroup
                            label="Título Principal"
                            value={config.title || ''}
                            onChange={(e) => updateConfig('title', e.target.value)}
                            rows={2}
                            required
                            help="Usa *palabra* para resaltar en cyan"
                        />
                    </div>
                    
                    <div className="col-md-6">
                        <InputFormGroup
                            label="Subtítulo"
                            value={config.subtitle || ''}
                            onChange={(e) => updateConfig('subtitle', e.target.value)}
                            placeholder="Ej: Envíos Perú - USA"
                        />
                    </div>

                    <div className="col-md-6">
                        <TextareaFormGroup
                            label="Descripción"
                            value={config.description || ''}
                            onChange={(e) => updateConfig('description', e.target.value)}
                            rows={2}
                            placeholder="Texto breve"
                        />
                    </div>
                </div>
            </div>

            {/* Botones CTA */}
            <div className="col-12 mt-3">
                <hr />
                <h6 className="mb-3">
                    <i className="mdi mdi-cursor-pointer mr-2"></i>
                    Botones de Acción
                </h6>
            </div>

            {/* Lista de botones existentes */}
            {config.cta_buttons && config.cta_buttons.length > 0 && (
                <div className="col-12">
                    <div className="row">
                        {config.cta_buttons.map((button, index) => (
                            <div key={index} className="col-md-6 mb-2">
                                <div className="alert alert-light d-flex align-items-center mb-0">
                                    <span className="badge badge-primary mr-2">{index + 1}</span>
                                    <div className="flex-1" style={{ minWidth: 0 }}>
                                        <strong className="d-block text-truncate">{button.text}</strong>
                                        <small className="text-muted text-truncate d-block">{button.link}</small>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-danger ml-2"
                                        onClick={() => removeButton(index)}
                                    >
                                        <i className="mdi mdi-delete"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Formulario para agregar nuevo botón */}
            <div className="col-12">
                <div className="card bg-light">
                    <div className="card-body p-3">
                        <div className="row">
                            <div className="col-md-5">
                                <InputFormGroup
                                    label="Texto"
                                    value={newButton.text}
                                    onChange={(e) => setNewButton({ ...newButton, text: e.target.value })}
                                    placeholder="Comenzar ahora"
                                />
                            </div>
                            <div className="col-md-5">
                                <InputFormGroup
                                    label="Enlace"
                                    value={newButton.link}
                                    onChange={(e) => setNewButton({ ...newButton, link: e.target.value })}
                                    placeholder="/registro"
                                />
                            </div>
                            <div className="col-md-2 d-flex align-items-end">
                                <button
                                    type="button"
                                    className="btn btn-success btn-block mb-3"
                                    onClick={addButton}
                                    disabled={!newButton.text || !newButton.link}
                                    title="Agregar botón"
                                >
                                    <i className="mdi mdi-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroConfigForm;
