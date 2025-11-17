import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import InputFormGroup from '../../../Adminto/form/InputFormGroup';
import TextareaFormGroup from '../../../Adminto/form/TextareaFormGroup';
import SelectFormGroup from '../../../Adminto/form/SelectFormGroup';
import * as LucideIcons from 'lucide-react';

const CategoryCardsConfigForm = ({ config, updateConfig }) => {
    const [categories, setCategories] = useState(config.categories || []);
    const [editingIndex, setEditingIndex] = useState(null);
    const [currentCategory, setCurrentCategory] = useState({
        categoria: '',
        iconName: 'Package',
        color: 'bg-primary',
        requisitos: []
    });
    const [currentRequisito, setCurrentRequisito] = useState('');
    const iconSelectRef = useRef(null);

    // Lista de iconos de Lucide React
    const ICON_OPTIONS = [
        'Package', 'FileText', 'Scale', 'Shield', 'AlertTriangle', 'Box', 'CheckCircle',
        'XCircle', 'AlertCircle', 'Info', 'Ban', 'Lock', 'Unlock', 'Key',
        'ShieldCheck', 'ShieldAlert', 'ShieldX', 'Plane', 'Truck', 'Ship',
        'Globe', 'MapPin', 'Map', 'Navigation', 'Compass', 'Anchor',
        'DollarSign', 'CreditCard', 'Wallet', 'Coins', 'Banknote', 'Receipt',
        'ShoppingCart', 'ShoppingBag', 'Store', 'Building2', 'Warehouse', 'Factory',
        'Users', 'User', 'UserCheck', 'UserX', 'UserPlus', 'UserMinus',
        'Clock', 'Calendar', 'Timer', 'Hourglass', 'Watch', 'AlarmClock',
        'Archive', 'Folder', 'File', 'Files', 'FileCheck', 'FileX',
        'Heart', 'Star', 'Award', 'Medal', 'Trophy', 'Target',
        'Zap', 'Activity', 'TrendingUp', 'TrendingDown', 'BarChart', 'PieChart',
        'Settings', 'Tool', 'Wrench', 'Hammer', 'Cog', 'Sliders',
        'Home', 'Building', 'School', 'Hospital', 'Hotel', 'Coffee',
        'Phone', 'Mail', 'MessageCircle', 'MessageSquare', 'Send', 'Inbox',
        'Bookmark', 'Tag', 'Tags', 'Flag', 'Bell', 'BellRing',
        'Camera', 'Image', 'Video', 'Film', 'Music', 'Headphones',
        'Gift', 'Cake', 'Pizza', 'Coffee', 'Beer', 'Wine'
    ];

    const ICON_LABELS = {
        'Package': 'Paquete',
        'FileText': 'Documento',
        'Scale': 'Balanza',
        'Shield': 'Escudo',
        'AlertTriangle': 'Advertencia',
        'Box': 'Caja',
        'CheckCircle': 'Check',
        'XCircle': 'X Círculo',
        'AlertCircle': 'Alerta',
        'Info': 'Información',
        'Ban': 'Prohibido',
        'Lock': 'Candado',
        'Unlock': 'Desbloquear',
        'Key': 'Llave',
        'ShieldCheck': 'Escudo Check',
        'ShieldAlert': 'Escudo Alerta',
        'ShieldX': 'Escudo X',
        'Plane': 'Avión',
        'Truck': 'Camión',
        'Ship': 'Barco',
        'Globe': 'Globo',
        'MapPin': 'Pin Mapa',
        'Map': 'Mapa',
        'Navigation': 'Navegación',
        'Compass': 'Brújula',
        'Anchor': 'Ancla',
        'DollarSign': 'Dólar',
        'CreditCard': 'Tarjeta',
        'Wallet': 'Billetera',
        'Coins': 'Monedas',
        'Banknote': 'Billete',
        'Receipt': 'Recibo',
        'ShoppingCart': 'Carrito',
        'ShoppingBag': 'Bolsa',
        'Store': 'Tienda',
        'Building2': 'Edificio',
        'Warehouse': 'Almacén',
        'Factory': 'Fábrica',
        'Users': 'Usuarios',
        'User': 'Usuario',
        'UserCheck': 'Usuario Check',
        'UserX': 'Usuario X',
        'UserPlus': 'Usuario +',
        'UserMinus': 'Usuario -',
        'Clock': 'Reloj',
        'Calendar': 'Calendario',
        'Timer': 'Temporizador',
        'Hourglass': 'Reloj Arena',
        'Watch': 'Reloj Pulsera',
        'AlarmClock': 'Despertador',
        'Archive': 'Archivo',
        'Folder': 'Carpeta',
        'File': 'Archivo',
        'Files': 'Archivos',
        'FileCheck': 'Archivo Check',
        'FileX': 'Archivo X',
        'Heart': 'Corazón',
        'Star': 'Estrella',
        'Award': 'Premio',
        'Medal': 'Medalla',
        'Trophy': 'Trofeo',
        'Target': 'Objetivo',
        'Zap': 'Rayo',
        'Activity': 'Actividad',
        'TrendingUp': 'Tendencia ↑',
        'TrendingDown': 'Tendencia ↓',
        'BarChart': 'Gráfico Barras',
        'PieChart': 'Gráfico Circular',
        'Settings': 'Configuración',
        'Tool': 'Herramienta',
        'Wrench': 'Llave Inglesa',
        'Hammer': 'Martillo',
        'Cog': 'Engranaje',
        'Sliders': 'Controles',
        'Home': 'Casa',
        'Building': 'Edificio',
        'School': 'Escuela',
        'Hospital': 'Hospital',
        'Hotel': 'Hotel',
        'Coffee': 'Café',
        'Phone': 'Teléfono',
        'Mail': 'Correo',
        'MessageCircle': 'Mensaje',
        'MessageSquare': 'Chat',
        'Send': 'Enviar',
        'Inbox': 'Bandeja',
        'Bookmark': 'Marcador',
        'Tag': 'Etiqueta',
        'Tags': 'Etiquetas',
        'Flag': 'Bandera',
        'Bell': 'Campana',
        'BellRing': 'Notificación',
        'Camera': 'Cámara',
        'Image': 'Imagen',
        'Video': 'Video',
        'Film': 'Película',
        'Music': 'Música',
        'Headphones': 'Audífonos',
        'Gift': 'Regalo',
        'Cake': 'Pastel',
        'Pizza': 'Pizza',
        'Beer': 'Cerveza',
        'Wine': 'Vino'
    };

    useEffect(() => {
        updateConfig('categories', categories);
    }, [categories]);

    // Initialize select2 for icon selector
    useEffect(() => {
        if (iconSelectRef.current) {
            const $select = $(iconSelectRef.current);
            
            $select.select2({
                dropdownParent: $('#section-config-modal-container'),
                templateResult: formatIconOption,
                templateSelection: formatIconOption,
                width: '100%'
            });

            $select.on('change', (e) => {
                setCurrentCategory({
                    ...currentCategory,
                    iconName: e.target.value
                });
            });

            return () => {
                if ($select.data('select2')) {
                    $select.select2('destroy');
                }
            };
        }
    }, [editingIndex]);

    // Update select2 value when currentCategory changes
    useEffect(() => {
        if (iconSelectRef.current) {
            const $select = $(iconSelectRef.current);
            if ($select.data('select2')) {
                $select.val(currentCategory.iconName).trigger('change.select2');
            }
        }
    }, [currentCategory.iconName]);

    const formatIconOption = (option) => {
        if (!option.id) return option.text;
        
        const iconName = option.id;
        const IconComponent = LucideIcons[iconName];
        
        if (!IconComponent) return option.text;

        const container = document.createElement('div');
        container.className = 'd-flex align-items-center gap-2';
        
        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'icon-preview';
        container.appendChild(iconWrapper);
        
        const root = createRoot(iconWrapper);
        root.render(<IconComponent size={18} className="text-primary" />);
        
        const text = document.createElement('span');
        text.textContent = ICON_LABELS[iconName] || iconName;
        container.appendChild(text);
        
        return container;
    };

    const handleAddRequisito = () => {
        if (currentRequisito.trim()) {
            setCurrentCategory({
                ...currentCategory,
                requisitos: [...currentCategory.requisitos, currentRequisito.trim()]
            });
            setCurrentRequisito('');
        }
    };

    const handleRemoveRequisito = (index) => {
        setCurrentCategory({
            ...currentCategory,
            requisitos: currentCategory.requisitos.filter((_, i) => i !== index)
        });
    };

    const handleAddCategory = () => {
        if (currentCategory.categoria && currentCategory.requisitos.length > 0) {
            if (editingIndex !== null) {
                const updated = [...categories];
                updated[editingIndex] = currentCategory;
                setCategories(updated);
                setEditingIndex(null);
            } else {
                setCategories([...categories, currentCategory]);
            }
            
            // Reset form
            setCurrentCategory({
                categoria: '',
                iconName: 'Package',
                color: 'bg-primary',
                requisitos: []
            });
        }
    };

    const handleEditCategory = (index) => {
        setCurrentCategory(categories[index]);
        setEditingIndex(index);
        
        // Scroll to form
        setTimeout(() => {
            document.getElementById('category-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const handleRemoveCategory = (index) => {
        setCategories(categories.filter((_, i) => i !== index));
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setCurrentCategory({
            categoria: '',
            iconName: 'Package',
            color: 'bg-primary',
            requisitos: []
        });
    };

    return (
        <div className="row">
            {/* Configuración General */}
            <div className="col-md-12">
                <h5 className="mb-3">
                    <i className="mdi mdi-format-text mr-2"></i>
                    Textos de la Sección
                </h5>
            </div>

            <div className="col-md-4">
                <InputFormGroup
                    label="Subtítulo"
                    value={config.subtitle || ''}
                    onChange={(e) => updateConfig('subtitle', e.target.value)}
                    placeholder="Según norma de aduana"
                    help="Texto pequeño sobre el título"
                />
            </div>

            <div className="col-md-8">
                <InputFormGroup
                    label="Título Principal"
                    value={config.title || ''}
                    onChange={(e) => updateConfig('title', e.target.value)}
                    placeholder="Requisitos por *Valor de Envío*"
                    help="Usa *palabra* para resaltar en cyan"
                />
            </div>

            <div className="col-md-12">
                <TextareaFormGroup
                    label="Descripción"
                    value={config.description || ''}
                    onChange={(e) => updateConfig('description', e.target.value)}
                    placeholder="Cumple con los requisitos según el valor de tu envío"
                    rows={2}
                />
            </div>

            <div className="col-md-4">
                <SelectFormGroup
                    label="Columnas"
                    value={config.columns || 3}
                    onChange={(e) => updateConfig('columns', parseInt(e.target.value))}
                    dropdownParent={$('#section-config-modal-container')}
                >
                    <option value="1">1 Columna</option>
                    <option value="2">2 Columnas</option>
                    <option value="3">3 Columnas</option>
                    <option value="4">4 Columnas</option>
                </SelectFormGroup>
            </div>

            <div className="col-md-4">
                <SelectFormGroup
                    label="Fondo"
                    value={config.background || 'white'}
                    onChange={(e) => updateConfig('background', e.target.value)}
                    dropdownParent={$('#section-config-modal-container')}
                >
                    <option value="white">Blanco</option>
                    <option value="accent">Beige (Accent)</option>
                    <option value="gray-50">Gris Claro</option>
                </SelectFormGroup>
            </div>

            <div className="col-md-4">
                <SelectFormGroup
                    label="Estilo de Cards"
                    value={config.cardStyle || 'gradient'}
                    onChange={(e) => updateConfig('cardStyle', e.target.value)}
                    dropdownParent={$('#section-config-modal-container')}
                >
                    <option value="gradient">Gradiente (Requisitos)</option>
                    <option value="border">Con Borde (Prohibida)</option>
                </SelectFormGroup>
                <small className="form-text text-muted">gradient=fondo color, border=blanco con borde</small>
            </div>

            <div className="col-12"><hr className="mt-4 mb-4" /></div>

            {/* Formulario de Categoría */}
            <div className="col-md-12" id="category-form">
                <h5 className="mb-3">
                    <i className="mdi mdi-plus-circle mr-2"></i>
                    {editingIndex !== null ? 'Editar Categoría' : 'Agregar Nueva Categoría'}
                </h5>
            </div>

            <div className="col-md-6">
                <InputFormGroup
                    label="Nombre de la Categoría"
                    value={currentCategory.categoria}
                    onChange={(e) => setCurrentCategory({ ...currentCategory, categoria: e.target.value })}
                    placeholder="Envíos hasta $200 USD"
                />
            </div>

            <div className="col-md-3">
                <div className="form-group">
                    <label className="font-weight-bold">Icono</label>
                    <select
                        ref={iconSelectRef}
                        className="form-control"
                        value={currentCategory.iconName}
                    >
                        {ICON_OPTIONS.map(iconName => (
                            <option key={iconName} value={iconName}>
                                {ICON_LABELS[iconName] || iconName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="col-md-3">
                <SelectFormGroup
                    label="Color"
                    value={currentCategory.color}
                    onChange={(e) => setCurrentCategory({ ...currentCategory, color: e.target.value })}
                    dropdownParent={$('#section-config-modal-container')}
                >
                    <option value="bg-primary">Primary (Cyan)</option>
                    <option value="bg-secondary">Secondary (Azul)</option>
                    <option value="bg-neutral-dark">Neutral Dark (Gris Oscuro)</option>
                    <option value="bg-neutral-light">Neutral Light (Gris Claro)</option>
                </SelectFormGroup>
            </div>

            {/* Requisitos/Items */}
            <div className="col-md-12">
                <label className="font-weight-bold">Requisitos / Items</label>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={currentRequisito}
                        onChange={(e) => setCurrentRequisito(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddRequisito();
                            }
                        }}
                        placeholder="Escribe un requisito y presiona Enter"
                    />
                    <div className="input-group-append">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleAddRequisito}
                        >
                            <i className="mdi mdi-plus"></i> Agregar
                        </button>
                    </div>
                </div>

                {/* Lista de requisitos actuales */}
                {currentCategory.requisitos.length > 0 && (
                    <ul className="list-group mb-3">
                        {currentCategory.requisitos.map((req, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <span>
                                    <i className="mdi mdi-check-circle text-success mr-2"></i>
                                    {req}
                                </span>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleRemoveRequisito(index)}
                                >
                                    <i className="mdi mdi-delete"></i>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="col-md-12">
                <div className="btn-group w-100">
                    <button
                        type="button"
                        className={`btn ${editingIndex !== null ? 'btn-success' : 'btn-primary'} btn-block`}
                        onClick={handleAddCategory}
                        disabled={!currentCategory.categoria || currentCategory.requisitos.length === 0}
                    >
                        <i className={`mdi ${editingIndex !== null ? 'mdi-check' : 'mdi-plus'} mr-2`}></i>
                        {editingIndex !== null ? 'Actualizar Categoría' : 'Agregar Categoría'}
                    </button>
                    {editingIndex !== null && (
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleCancelEdit}
                        >
                            <i className="mdi mdi-close mr-2"></i>
                            Cancelar
                        </button>
                    )}
                </div>
            </div>

            <div className="col-12"><hr className="mt-4 mb-4" /></div>

            {/* Lista de Categorías */}
            <div className="col-md-12">
                <h5 className="mb-3">
                    <i className="mdi mdi-view-grid mr-2"></i>
                    Categorías Agregadas ({categories.length})
                </h5>
            </div>

            {categories.length === 0 ? (
                <div className="col-12">
                    <div className="alert alert-info text-center">
                        <i className="mdi mdi-information font-24 d-block mb-2"></i>
                        No hay categorías agregadas. Agrega al menos una categoría.
                    </div>
                </div>
            ) : (
                <div className="col-12">
                    <div className="row">
                        {categories.map((category, index) => (
                            <div key={index} className="col-md-6 mb-3">
                                <div className="card border">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div className="d-flex align-items-center">
                                                <span className="font-32 mr-2">{category.icon}</span>
                                                <div>
                                                    <h6 className="mb-0">{category.categoria}</h6>
                                                    <small className="text-muted">{category.color}</small>
                                                </div>
                                            </div>
                                            <div className="btn-group btn-group-sm">
                                                <button
                                                    type="button"
                                                    className="btn btn-info"
                                                    onClick={() => handleEditCategory(index)}
                                                >
                                                    <i className="mdi mdi-pencil"></i>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => handleRemoveCategory(index)}
                                                >
                                                    <i className="mdi mdi-delete"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <ul className="mb-0 small">
                                            {category.requisitos.slice(0, 3).map((req, i) => (
                                                <li key={i}>{req}</li>
                                            ))}
                                            {category.requisitos.length > 3 && (
                                                <li className="text-muted">... y {category.requisitos.length - 3} más</li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="col-12 mt-3">
                <div className="alert alert-info">
                    <i className="mdi mdi-information mr-2"></i>
                    <strong>Estilos:</strong> "gradient" muestra cards con fondo en gradiente de color (mejor para requisitos), "border" muestra cards blancas con borde (mejor para mercancía prohibida).
                </div>
            </div>
        </div>
    );
};

export default CategoryCardsConfigForm;
