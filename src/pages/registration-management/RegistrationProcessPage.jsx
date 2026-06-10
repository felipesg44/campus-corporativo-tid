import React from 'react';
import { useParams, useNavigate, useLoaderData, useRouteLoaderData } from 'react-router-dom';
import { tidApi } from '../../services/tid.js';
import { toast } from '../../helpers/alerts.js';
import { Spinner, Modal, FormField } from '../../components/components.jsx';
import { COLORS } from '../../components/theme.js';
import { ArrowLeft, BookOpen } from 'lucide-react';

const DEPARTAMENTOS = [
  'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bogotá D.C.', 'Bolívar', 'Boyacá',
  'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba',
  'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena',
  'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda',
  'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca',
  'Vaupés', 'Vichada'
];

const MUNICIPIOS_POR_DEPARTAMENTO = {
  'Amazonas': ['Leticia', 'Puerto Nariño'],
  'Antioquia': ['Medellín', 'Envigado', 'Itagüí', 'Bello', 'Rionegro', 'Sabaneta', 'Caldas'],
  'Arauca': ['Arauca', 'Arauquita', 'Tame', 'Saravena'],
  'Atlántico': ['Barranquilla', 'Soledad', 'Malambo', 'Sabanalarga', 'Puerto Colombia'],
  'Bogotá D.C.': ['Bogotá D.C.'],
  'Bolívar': ['Cartagena', 'Magangué', 'Turbaco', 'Arjona', 'Mompox'],
  'Boyacá': ['Tunja', 'Duitama', 'Sogamoso', 'Chiquinquirá', 'Villa de Leyva'],
  'Caldas': ['Manizales', 'La Dorada', 'Riosucio', 'Chinchiná', 'Villamaría'],
  'Caquetá': ['Florencia', 'San Vicente del Caguán', 'Morelia', 'Belén de los Andaquíes'],
  'Casanare': ['Yopal', 'Aguazul', 'Paz de Ariporo', 'Tauramena'],
  'Cauca': ['Popayán', 'Santander de Quilichao', 'Puerto Tejada', 'Patía'],
  'Cesar': ['Valledupar', 'Aguachica', 'Codazzi', 'La Paz'],
  'Chocó': ['Quibdó', 'Istmina', 'Condoto', 'Bahía Solano'],
  'Córdoba': ['Montería', 'Cereté', 'Sahagún', 'Lorica', 'Planeta Rica'],
  'Cundinamarca': ['Soacha', 'Chía', 'Zipaquirá', 'Facatativá', 'Fusagasugá', 'Girardot', 'Cajicá'],
  'Guainía': ['Inírida'],
  'Guaviare': ['San José del Guaviare', 'Calamar', 'El Retorno'],
  'Huila': ['Neiva', 'Pitalito', 'Garzón', 'La Plata', 'Gigante'],
  'La Guajira': ['Riohacha', 'Maicao', 'Uribia', 'San Juan del Cesar', 'Fonseca'],
  'Magdalena': ['Santa Marta', 'Ciénaga', 'Fundación', 'El Banco', 'Plato'],
  'Meta': ['Villavicencio', 'Acacías', 'Granada', 'Puerto López'],
  'Nariño': ['Pasto', 'Tumaco', 'Ipiales', 'Túquerres'],
  'Norte de Santander': ['Cúcuta', 'Ocaña', 'Pamplona', 'Villa del Rosario', 'Los Patios'],
  'Putumayo': ['Mocoa', 'Puerto Asís', 'Orito', 'Sibundoy'],
  'Quindío': ['Armenia', 'Calarcá', 'Tebaida', 'Montenegro', 'Salento'],
  'Risaralda': ['Pereira', 'Dosquebradas', 'Santa Rosa de Cabal', 'La Virginia'],
  'San Andrés y Providencia': ['San Andrés', 'Providencia'],
  'Santander': ['Bucaramanga', 'Floridablanca', 'Girón', 'Barrancabermeja', 'San Gil', 'Piedecuesta'],
  'Sucre': ['Sincelejo', 'Corozal', 'Tolú', 'Sampués'],
  'Tolima': ['Ibagué', 'Espinal', 'Melgar', 'Mariquita', 'Honda'],
  'Valle del Cauca': ['Cali', 'Palmira', 'Buenaventura', 'Tuluá', 'Buga', 'Cartago', 'Jamundí'],
  'Vaupés': ['Mitú'],
  'Vichada': ['Puerto Carreño', 'Cumaribo', 'La Primavera']
};

export default function RegistrationProcessPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { session } = useRouteLoaderData('root');
  const data = useLoaderData();
  const cursos = data?.cursos || [];
  const [loading, setLoading] = React.useState(false);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);

  const [formData, setFormData] = React.useState({
    nombre: '',
    apellido: '',
    tipoDocumento: '',
    numeroDocumento: '',
    telefono: '',
    correo: '',
    departamento: '',
    municipio: '',
    direccion: ''
  });

  const [errors, setErrors] = React.useState({
    correo: '',
    telefono: '',
    numeroDocumento: ''
  });

  const curso = cursos.find(c => String(c.id) === String(id));

  const validateCorreo = (value) => {
    if (!value) return '';
    if (!value.includes('@')) {
      return 'El correo debe contener un "@"';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Ingrese un correo electrónico válido (ejemplo: usuario@correo.com)';
    }
    return '';
  };

  const handleCorreoChange = (e) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, correo: val }));
    setErrors(prev => ({ ...prev, correo: validateCorreo(val) }));
  };

  const handleTelefonoChange = (e) => {
    const val = e.target.value.replace(/\D/g, ''); // no permite otros caracteres
    setFormData(prev => ({ ...prev, telefono: val }));
    
    let err = '';
    if (val && val.length < 7) {
      err = 'El teléfono debe tener al menos 7 dígitos';
    }
    setErrors(prev => ({ ...prev, telefono: err }));
  };

  const handleNumeroDocumentoChange = (e) => {
    const val = e.target.value.replace(/\D/g, ''); // no permite otros caracteres
    setFormData(prev => ({ ...prev, numeroDocumento: val }));
    
    let err = '';
    if (val && val.length < 5) {
      err = 'El número de documento debe tener al menos 5 dígitos';
    }
    setErrors(prev => ({ ...prev, numeroDocumento: err }));
  };

  const handleDepartamentoChange = (e) => {
    const dept = e.target.value;
    setFormData(prev => ({ ...prev, departamento: dept, municipio: '' }));
  };

  const handleMunicipioChange = (e) => {
    setFormData(prev => ({ ...prev, municipio: e.target.value }));
  };

  const isFormComplete = 
    formData.nombre.trim() !== '' &&
    formData.apellido.trim() !== '' &&
    formData.tipoDocumento !== '' &&
    formData.numeroDocumento.trim() !== '' &&
    formData.telefono.trim() !== '' &&
    formData.correo.trim() !== '' &&
    formData.departamento !== '' &&
    formData.municipio !== '' &&
    formData.direccion.trim() !== '' &&
    errors.correo === '' &&
    errors.telefono === '' &&
    errors.numeroDocumento === '';

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await tidApi.createInscripcion({
        usuario_id: session.id,
        curso_id: curso.id,
        fecha: new Date().toISOString().split('T')[0],
        ...formData
      });
      toast.success(
        '¡Inscripción confirmada! Por favor, debes estar pendiente de tu correo electrónico.',
        'Inscripción Exitosa'
      );
      setShowConfirmModal(false);
      navigate('/registration-management/success', { state: { curso } });
    } catch (e) {
      toast.error(e.message || 'No se pudo completar la inscripción');
    } finally {
      setLoading(false);
    }
  };

  if (!curso) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h3 style={{ color: COLORS.textMuted }}>Curso no encontrado</h3>
        <p>Verifica que la ruta sea correcta.</p>
        <button className="btn btn-secondary" onClick={() => navigate('/course-catalog')}>
          Volver al catálogo
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '650px', margin: '40px auto', padding: '0 16px' }}>
      <button
        className="btn btn-ghost"
        onClick={() => navigate('/course-catalog')}
        style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <ArrowLeft size={18} /> Volver al catálogo
      </button>

      {/* Tarjeta de Información del Curso */}
      <div className="card" style={{ padding: '20px', borderRadius: '12px', marginBottom: '24px', background: COLORS.surface }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{
            background: '#D5F5F8', width: '50px', height: '50px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <BookOpen color="#2D6DF6" size={24} />
          </div>
          <div>
            <span style={{ fontSize: '12px', color: COLORS.textMuted, fontWeight: 500 }}>Inscripción al curso:</span>
            <h3 style={{ color: '#0033A0', margin: '2px 0 6px 0', fontSize: '18px', fontWeight: 700 }}>{curso.titulo}</h3>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '13px', color: COLORS.textSecondary }}>
              <span><strong>Instructor:</strong> {curso.instructor}</span>
              <span><strong>Duración:</strong> {curso.duracion}</span>
              <span><strong>Nivel:</strong> {curso.nivel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjeta del Formulario */}
      <div className="card" style={{ padding: '30px', borderRadius: '16px', borderTop: '6px solid #2D6DF6', background: COLORS.surface }}>
        <h2 style={{ color: '#0033A0', marginBottom: '20px', fontSize: '20px', fontWeight: 700 }}>Formulario de Inscripción</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
          <div className="grid-2">
            <FormField label="Nombre">
              <input 
                className="form-input" 
                style={{ borderRadius: '10px' }} 
                placeholder="Ej: Juan" 
                value={formData.nombre} 
                onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))} 
              />
            </FormField>
            <FormField label="Apellido">
              <input 
                className="form-input" 
                style={{ borderRadius: '10px' }} 
                placeholder="Ej: Pérez" 
                value={formData.apellido} 
                onChange={(e) => setFormData(prev => ({ ...prev, apellido: e.target.value }))} 
              />
            </FormField>
          </div>

          <div className="grid-2">
            <FormField label="Tipo de Documento">
              <select 
                className="form-input" 
                style={{ borderRadius: '10px' }} 
                value={formData.tipoDocumento} 
                onChange={(e) => setFormData(prev => ({ ...prev, tipoDocumento: e.target.value }))}
              >
                <option value="">Seleccionar...</option>
                <option value="cedula de ciudadanía">Cédula de Ciudadanía</option>
                <option value="cedula de extranjeria">Cédula de Extranjería</option>
                <option value="PPT">PPT (Permiso por Protección Temporal)</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </FormField>
            <FormField label="Número de Documento" error={errors.numeroDocumento}>
              <input 
                className="form-input" 
                style={{ borderRadius: '10px' }} 
                placeholder="Ej: 1002345678" 
                value={formData.numeroDocumento} 
                onChange={handleNumeroDocumentoChange} 
              />
            </FormField>
          </div>

          <div className="grid-2">
            <FormField label="Número de Teléfono" error={errors.telefono}>
              <input 
                className="form-input" 
                style={{ borderRadius: '10px' }} 
                placeholder="Ej: 3101234567" 
                value={formData.telefono} 
                onChange={handleTelefonoChange} 
              />
            </FormField>
            <FormField label="Correo Electrónico" error={errors.correo}>
              <input 
                type="email"
                className="form-input" 
                style={{ borderRadius: '10px' }} 
                placeholder="Ej: juan.perez@correo.com" 
                value={formData.correo} 
                onChange={handleCorreoChange} 
              />
            </FormField>
          </div>

          <div className="grid-2">
            <FormField label="Departamento">
              <select 
                className="form-input" 
                style={{ borderRadius: '10px' }} 
                value={formData.departamento} 
                onChange={handleDepartamentoChange}
              >
                <option value="">Seleccionar...</option>
                {DEPARTAMENTOS.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </FormField>
            <FormField label="Municipio">
              <select 
                className="form-input" 
                style={{ borderRadius: '10px' }} 
                value={formData.municipio} 
                onChange={handleMunicipioChange}
                disabled={!formData.departamento}
              >
                <option value="">
                  {formData.departamento ? 'Seleccionar municipio...' : 'Selecciona un departamento primero...'}
                </option>
                {formData.departamento && MUNICIPIOS_POR_DEPARTAMENTO[formData.departamento]?.map(mun => (
                  <option key={mun} value={mun}>{mun}</option>
                ))}
              </select>
            </FormField>
          </div>

          <FormField label="Dirección de Residencia">
            <input 
              className="form-input" 
              style={{ borderRadius: '10px' }} 
              placeholder="Ej: Calle 10 # 5-12, Apto 302" 
              value={formData.direccion} 
              onChange={(e) => setFormData(prev => ({ ...prev, direccion: e.target.value }))} 
            />
          </FormField>

          <button
            className="btn btn-primary"
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '10px',
              marginTop: '10px',
              justifyContent: 'center',
              background: '#2D6DF6'
            }}
            onClick={() => setShowConfirmModal(true)}
            disabled={!isFormComplete || loading}
          >
            Confirmar inscripción
          </button>
        </div>
      </div>

      {/* Modal de Confirmación */}
      <Modal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirmar Inscripción"
        footer={
          <div style={{ display: 'flex', gap: '8px', width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-ghost" 
              onClick={() => {
                setShowConfirmModal(false);
                navigate('/course-catalog');
              }}
              style={{ padding: '8px 12px' }}
            >
              Volver al inicio
            </button>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => setShowConfirmModal(false)}
                disabled={loading}
              >
                Cancelar
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleConfirm}
                disabled={loading}
                style={{ background: '#2D6DF6' }}
              >
                {loading ? <div className="spinner" style={{ width: 14, height: 14, borderTopColor: '#fff' }}></div> : 'Continuar'}
              </button>
            </div>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ color: COLORS.textSecondary, marginBottom: '10px', fontSize: '14px', lineHeight: '1.5' }}>
            Por favor, confirma que los datos ingresados para la inscripción al curso <strong>{curso.titulo}</strong> son correctos:
          </p>
          <div style={{ background: COLORS.surface2, borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: COLORS.textMuted }}>Nombre completo:</span>
              <span style={{ fontWeight: 600, color: COLORS.textPrimary }}>{formData.nombre} {formData.apellido}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: COLORS.textMuted }}>Documento:</span>
              <span style={{ fontWeight: 600, color: COLORS.textPrimary, textTransform: 'capitalize' }}>
                {formData.tipoDocumento} - {formData.numeroDocumento}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: COLORS.textMuted }}>Teléfono:</span>
              <span style={{ fontWeight: 600, color: COLORS.textPrimary }}>{formData.telefono}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: COLORS.textMuted }}>Correo electrónico:</span>
              <span style={{ fontWeight: 600, color: COLORS.textPrimary }}>{formData.correo}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: COLORS.textMuted }}>Ubicación:</span>
              <span style={{ fontWeight: 600, color: COLORS.textPrimary }}>{formData.municipio}, {formData.departamento}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: COLORS.textMuted }}>Dirección de residencia:</span>
              <span style={{ fontWeight: 600, color: COLORS.textPrimary }}>{formData.direccion}</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}