import React, { useState } from 'react';
import InputFormGroup from '../../../../Components/Adminto/form/InputFormGroup';
import TextareaFormGroup from '../../../../Components/Adminto/form/TextareaFormGroup';
import SelectFormGroup from '../../../../Components/Adminto/form/SelectFormGroup';
import ImageFormGroup from '../../../../Components/Adminto/form/ImageFormGroup';

const TestimonialsConfigForm = ({ config, updateConfig }) => {
    const [editingIndex, setEditingIndex] = useState(null);

    const addTestimonial = () => {
        const testimonials = [...(config.testimonials || []), {
            name: 'Nuevo Cliente',
            role: 'Cargo / Empresa',
            content: 'Testimonio del cliente...',
            rating: 5,
            avatar: ''
        }];
        updateConfig('testimonials', testimonials);
    };

    const updateTestimonial = (index, field, value) => {
        const testimonials = [...config.testimonials];
        testimonials[index] = { ...testimonials[index], [field]: value };
        updateConfig('testimonials', testimonials);
    };

    const removeTestimonial = (index) => {
        const testimonials = config.testimonials.filter((_, i) => i !== index);
        updateConfig('testimonials', testimonials);
    };

    const moveTestimonial = (index, direction) => {
        const testimonials = [...config.testimonials];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= testimonials.length) return;
        [testimonials[index], testimonials[newIndex]] = [testimonials[newIndex], testimonials[index]];
        updateConfig('testimonials', testimonials);
    };

    return (
        <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label>Título de la Sección</label>
                    <input
                        type="text"
                        className="form-control"
                        value={config.title || ''}
                        onChange={(e) => updateConfig('title', e.target.value)}
                    />
                </div>
            </div>

            <div className="col-md-6">
                <div className="form-group">
                    <label>Subtítulo</label>
                    <input
                        type="text"
                        className="form-control"
                        value={config.subtitle || ''}
                        onChange={(e) => updateConfig('subtitle', e.target.value)}
                    />
                </div>
            </div>

            <div className="col-md-4">
                <div className="form-group">
                    <label>Columnas (Desktop)</label>
                    <select
                        className="form-control"
                        value={config.columns || 3}
                        onChange={(e) => updateConfig('columns', parseInt(e.target.value))}
                    >
                        <option value="1">1 Columna</option>
                        <option value="2">2 Columnas</option>
                        <option value="3">3 Columnas</option>
                    </select>
                </div>
            </div>

            <div className="col-md-4">
                <div className="custom-control custom-switch mt-4">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="showRatingsSwitch"
                        checked={config.show_ratings !== false}
                        onChange={(e) => updateConfig('show_ratings', e.target.checked)}
                    />
                    <label className="custom-control-label" htmlFor="showRatingsSwitch">
                        Mostrar calificaciones
                    </label>
                </div>
            </div>

            <div className="col-md-4">
                <div className="custom-control custom-switch mt-4">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="showAvatarsSwitch"
                        checked={config.show_avatars !== false}
                        onChange={(e) => updateConfig('show_avatars', e.target.checked)}
                    />
                    <label className="custom-control-label" htmlFor="showAvatarsSwitch">
                        Mostrar avatares
                    </label>
                </div>
            </div>

            {/* Testimonios */}
            <div className="col-12 mt-3">
                <hr />
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6>Testimonios ({config.testimonials?.length || 0})</h6>
                    <button type="button" className="btn btn-sm btn-primary" onClick={addTestimonial}>
                        <i className="mdi mdi-plus mr-1"></i>
                        Agregar Testimonio
                    </button>
                </div>

                {config.testimonials && config.testimonials.map((testimonial, index) => (
                    <div key={index} className="card mb-2">
                        <div className="card-body">
                            <div className="d-flex align-items-start mb-2">
                                {testimonial.avatar && (
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="rounded-circle mr-2"
                                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                    />
                                )}
                                <div className="flex-1">
                                    <strong>{testimonial.name}</strong>
                                    <div className="text-muted small">{testimonial.role}</div>
                                    <div className="text-warning">
                                        {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                                    </div>
                                </div>
                                <div className="btn-group btn-group-sm">
                                    <button
                                        type="button"
                                        className="btn btn-light"
                                        onClick={() => moveTestimonial(index, 'up')}
                                        disabled={index === 0}
                                    >
                                        <i className="mdi mdi-arrow-up"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-light"
                                        onClick={() => moveTestimonial(index, 'down')}
                                        disabled={index === config.testimonials.length - 1}
                                    >
                                        <i className="mdi mdi-arrow-down"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-info"
                                        onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                                    >
                                        <i className="mdi mdi-pencil"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => removeTestimonial(index)}
                                    >
                                        <i className="mdi mdi-delete"></i>
                                    </button>
                                </div>
                            </div>

                            {editingIndex === index && (
                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <label className="small">Nombre completo</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            value={testimonial.name}
                                            onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small">Cargo / Empresa</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            value={testimonial.role}
                                            onChange={(e) => updateTestimonial(index, 'role', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6 mt-2">
                                        <label className="small">URL Avatar (opcional)</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            value={testimonial.avatar}
                                            onChange={(e) => updateTestimonial(index, 'avatar', e.target.value)}
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div className="col-md-6 mt-2">
                                        <label className="small">Calificación (1-5)</label>
                                        <input
                                            type="number"
                                            className="form-control form-control-sm"
                                            min="1"
                                            max="5"
                                            value={testimonial.rating}
                                            onChange={(e) => updateTestimonial(index, 'rating', parseInt(e.target.value))}
                                        />
                                    </div>
                                    <div className="col-12 mt-2">
                                        <label className="small">Testimonio</label>
                                        <textarea
                                            className="form-control form-control-sm"
                                            rows="3"
                                            value={testimonial.content}
                                            onChange={(e) => updateTestimonial(index, 'content', e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestimonialsConfigForm;
