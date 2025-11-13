import React, { useState } from 'react';
import Swal from 'sweetalert2';
import InputFormGroup from '../../../../Components/Adminto/form/InputFormGroup';
import TextareaFormGroup from '../../../../Components/Adminto/form/TextareaFormGroup';
import SelectFormGroup from '../../../../Components/Adminto/form/SelectFormGroup';

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
                text: 'No se pudo subir la imagen: ' + error.message
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
            
  {/* Título - Se muestra segundo */}
            <div className="col-12">
                <TextareaFormGroup
                    label="1. Título Principal"
                    value={config.title || ''}
                    onChange={(e) => updateConfig('title', e.target.value)}
                    rows={3}
                    required
                    help="Usa *palabra* para resaltar en color cyan. Ejemplo: Envíos *Rápidos* y *Seguros*"
                />
            </div>
            {/* Subtítulo (Badge) - Se muestra primero */}
            <div className="col-12">
                <InputFormGroup
                    label="2. Subtítulo"
                    value={config.subtitle || ''}
                    onChange={(e) => updateConfig('subtitle', e.target.value)}
                    placeholder="Ej: Envíos Perú - USA"
                    help="Aparece primero, en un badge con fondo transparente"
                />
            </div>

          

            {/* Descripción - Se muestra tercero */}
            <div className="col-12">
                <TextareaFormGroup
                    label="3. Descripción"
                    value={config.description || ''}
                    onChange={(e) => updateConfig('description', e.target.value)}
                    rows={2}
                    placeholder="Texto descriptivo breve"
                    help="Aparece debajo del título, antes de los botones"
                />
            </div>

            {/* Imagen de Fondo */}
            <div className="col-12 mt-3">
                <hr />
                <h6 className="mb-3">Imagen de Fondo (Opcional)</h6>
            </div>

            <div className="col-12">
                <div className="form-group">
                    {imagePreview && (
                        <div className="mb-2">
                            <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="img-fluid rounded"
                                style={{ maxHeight: '200px', objectFit: 'cover' }}
                            />
                            <button
                                type="button"
                                className="btn btn-sm btn-danger mt-2"
                                onClick={() => {
                                    setImagePreview(null);
                                    updateConfig('background_image', null);
                                }}
                            >
                                <i className="mdi mdi-delete mr-1"></i>
                                Eliminar imagen
                            </button>
                        </div>
                    )}

                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    <small className="form-text text-muted">
                        Si agregas una imagen, aparecerá de fondo con 20% de opacidad sobre el degradado secondary
                    </small>
                </div>
            </div>

            {/* Botones CTA - Se muestran al final */}
            <div className="col-12 mt-3">
                <hr />
                <h6 className="mb-3">
                    <i className="mdi mdi-bullhorn mr-2"></i>
                    4. Botones de Acción
                </h6>
            </div>

            {/* Lista de botones existentes */}
            {config.cta_buttons && config.cta_buttons.length > 0 && (
                <div className="col-12">
                    {config.cta_buttons.map((button, index) => (
                        <div key={index} className="alert alert-light d-flex align-items-center mb-2">
                            <span className="badge badge-primary mr-3">{index + 1}</span>
                            <div className="flex-1">
                                <strong>{button.text}</strong>
                                <br />
                                <small className="text-muted">{button.link}</small>
                            </div>
                            <span className={`badge badge-${button.style === 'primary' ? 'info' : 'secondary'} mr-3`}>
                                {button.style === 'primary' ? 'Sólido Blanco' : 'Transparente'}
                            </span>
                            <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                onClick={() => removeButton(index)}
                            >
                                <i className="mdi mdi-delete"></i>
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Formulario para agregar nuevo botón */}
            <div className="col-12">
                <div className="card bg-light">
                    <div className="card-body">
                        <p className="text-muted mb-3">
                            <i className="mdi mdi-plus-circle mr-1"></i>
                            Agregar botón
                        </p>
                        <div className="row">
                            <div className="col-md-4">
                                <InputFormGroup
                                    label="Texto"
                                    value={newButton.text}
                                    onChange={(e) => setNewButton({ ...newButton, text: e.target.value })}
                                    placeholder="Comenzar ahora"
                                />
                            </div>
                            <div className="col-md-4">
                                <InputFormGroup
                                    label="Enlace"
                                    value={newButton.link}
                                    onChange={(e) => setNewButton({ ...newButton, link: e.target.value })}
                                    placeholder="/registro"
                                />
                            </div>
                            <div className="col-md-3">
                                <SelectFormGroup
                                    label="Estilo"
                                    value={newButton.style}
                                    onChange={(e) => setNewButton({ ...newButton, style: e.target.value })}
                                    dropdownParent="#section-config-modal-container"
                                >
                                    <option value="primary">Sólido (Blanco)</option>
                                    <option value="secondary">Transparente (Outline)</option>
                                </SelectFormGroup>
                            </div>
                            <div className="col-md-1 d-flex align-items-end">
                                <button
                                    type="button"
                                    className="btn btn-success btn-block mb-3"
                                    onClick={addButton}
                                    disabled={!newButton.text || !newButton.link}
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
