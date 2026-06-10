import React from 'react';
import { useLoaderData, useRevalidator, useRouteLoaderData, useNavigate } from 'react-router-dom';
import { CourseCard, EmptyState, FormField, Modal, Spinner } from '../../components/components.jsx';
import { levelBadge } from '../../components/badges.js';
import { COLORS } from '../../components/theme.js';
import { confirm, toast } from '../../helpers/alerts.js';
import { tidApi } from '../../services/tid.js';
import { BookOpen, Pencil, Search, Trash2, X } from 'lucide-react';

export default function CourseCatalogPage() {
  const revalidator = useRevalidator();
  const { session } = useRouteLoaderData('root');
  const { cursos, categorias, inscripciones } = useLoaderData();

  const [filtroCategoria, setFiltroCategoria] = React.useState(null);
  const [busqueda, setBusqueda] = React.useState('');
  const [filtroNivel, setFiltroNivel] = React.useState(null);
  const [detalleCurso, setDetalleCurso] = React.useState(null);
  const [modalCurso, setModalCurso] = React.useState(null);
  const navigate = useNavigate();
  const handleEnroll = (curso) => {
  navigate(`/registration-management/${curso.id}/process`);
  };
  const [formCurso, setFormCurso] = React.useState({});
  const [savingCurso, setSavingCurso] = React.useState(false);

  const openCreateCurso = () => {
    setFormCurso({ titulo: '', categoria_id: '', instructor: '', duracion: '', nivel: 'Básico', max: 30, descripcion: '' });
    setModalCurso('create');
  };
  const openEditCurso = (c) => {
    setFormCurso({ ...c });
    setModalCurso('edit');
  };
  const handleSaveCurso = async () => {
    if (!formCurso.titulo || !formCurso.categoria_id || !formCurso.instructor) {
      toast.warning('Completa título, categoría e instructor.', 'Campos requeridos');
      return;
    }
    setSavingCurso(true);
    try {
      if (modalCurso === 'create') await tidApi.createCurso({ ...formCurso, categoria_id: parseInt(formCurso.categoria_id), max: parseInt(formCurso.max) });
      else await tidApi.updateCurso(formCurso.id, { ...formCurso, categoria_id: parseInt(formCurso.categoria_id), max: parseInt(formCurso.max) });
      setModalCurso(null);
      toast.success(modalCurso === 'create' ? 'Curso creado' : 'Curso actualizado');
      revalidator.revalidate();
    } finally {
      setSavingCurso(false);
    }
  };
  const handleDeleteCurso = async (c) => {
    const ok = await confirm({
      title: `¿Eliminar "${c.titulo}"?`,
      message: 'Esta acción no se puede deshacer.',
      okText: 'Eliminar',
      cancelText: 'Cancelar',
      color: COLORS.danger,
    });
    if (!ok) return;
    await tidApi.deleteCurso(c.id);
    toast.success('Eliminado');
    revalidator.revalidate();
  };

  const cursosFiltrados = cursos.filter((c) => {
    if (filtroCategoria && c.categoria_id !== filtroCategoria) return false;
    if (filtroNivel && c.nivel !== filtroNivel) return false;
    if (busqueda && !c.titulo.toLowerCase().includes(busqueda.toLowerCase()) && !c.descripcion.toLowerCase().includes(busqueda.toLowerCase())) return false;
    return true;
  });

  const isInscrito = (cursoId) => inscripciones.some((i) => i.curso_id === cursoId);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div className="page-header" style={{ margin: 0 }}>
          <h2>Catálogo de Cursos</h2>
          <p>
            {cursos.length} cursos disponibles · {inscripciones.length} inscripciones activas
          </p>
        </div>
        {session?.rol === 'Admin' && (
          <button className="btn btn-primary" onClick={openCreateCurso}>
            + Nuevo curso
          </button>
        )}
      </div>

      {revalidator.state !== 'idle' && <Spinner text="Actualizando..." />}

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24, alignItems: 'center' }}>
        <div className="search-box" style={{ flex: '1 1 240px', minWidth: 200 }}>
          <Search size={16} color={COLORS.textMuted} />
          <input placeholder="Buscar cursos..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
          {busqueda && (
            <button style={{ background: 'none', border: 'none', color: COLORS.textMuted, cursor: 'pointer', fontSize: 16 }} onClick={() => setBusqueda('')}>
              <X size={16} />
            </button>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span className={`tag ${!filtroCategoria ? 'tag-active' : 'tag-inactive'}`} onClick={() => setFiltroCategoria(null)}>
            Todas ({cursos.length})
          </span>
          {categorias.map((cat) => {
            const count = cursos.filter((c) => c.categoria_id === cat.id).length;
            return (
              <span key={cat.id} className={`tag ${filtroCategoria === cat.id ? 'tag-active' : 'tag-inactive'}`} onClick={() => setFiltroCategoria(filtroCategoria === cat.id ? null : cat.id)}>
                {cat.nombre} ({count})
              </span>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['Básico', 'Intermedio', 'Avanzado'].map((n) => (
            <span key={n} className={`tag ${filtroNivel === n ? 'tag-active' : 'tag-inactive'}`} onClick={() => setFiltroNivel(filtroNivel === n ? null : n)} style={{ fontSize: 11 }}>
              {n}
            </span>
          ))}
        </div>
      </div>

      {cursosFiltrados.length === 0 ? (
        <EmptyState icon={<BookOpen size={44} color={COLORS.textMuted} />} title="No se encontraron cursos" subtitle="Prueba con otros filtros o términos de búsqueda" />
      ) : (
        <div className="grid-3">
          {cursosFiltrados.map((c) => (
            <div key={c.id} style={{ position: 'relative' }}>
              <CourseCard curso={c} categorias={categorias} inscrito={isInscrito(c.id)} onEnroll={handleEnroll} onDetail={setDetalleCurso} />
              {session?.rol === 'Admin' && (
                <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 4 }}>
                  <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px', fontSize: 11 }} onClick={() => openEditCurso(c)}>
                    <Pencil size={14} />
                  </button>
                  <button className="btn btn-danger btn-sm" style={{ padding: '3px 8px', fontSize: 11 }} onClick={() => handleDeleteCurso(c)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal
        open={!!detalleCurso}
        onClose={() => setDetalleCurso(null)}
        title={detalleCurso?.titulo}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setDetalleCurso(null)}>
              Cerrar
            </button>
            {!isInscrito(detalleCurso?.id) && (
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleEnroll(detalleCurso);
                  setDetalleCurso(null);
                }}
              >
                Inscribirme
              </button>
            )}
          </>
        }
      >
        {detalleCurso &&
          (() => {
            const cat = categorias.find((c) => c.id === detalleCurso.categoria_id);
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span className={`badge ${levelBadge(detalleCurso.nivel)}`}>{detalleCurso.nivel}</span>
                  {cat && (
                    <span className="badge badge-gray">
                      {cat.nombre}
                    </span>
                  )}
                  {isInscrito(detalleCurso.id) && <span className="badge badge-green">Ya inscrito</span>}
                </div>
                <p style={{ color: COLORS.textSecondary, fontSize: 14, lineHeight: 1.7 }}>{detalleCurso.descripcion}</p>
                <div className="grid-2" style={{ gap: 12 }}>
                  {[
                    ['Instructor', detalleCurso.instructor],
                    ['Duración', detalleCurso.duracion],
                    ['Cupos', `${detalleCurso.inscritos}/${detalleCurso.max}`],
                  ].map(([l, v]) => (
                    <div key={l} style={{ background: COLORS.surface2, borderRadius: 8, padding: '12px 14px' }}>
                      <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 4 }}>{l}</div>
                      <div style={{ fontWeight: 600 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
      </Modal>

      <Modal
        open={!!modalCurso}
        onClose={() => setModalCurso(null)}
        title={modalCurso === 'create' ? 'Nuevo curso' : 'Editar curso'}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setModalCurso(null)}>
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={handleSaveCurso} disabled={savingCurso}>
              {savingCurso ? (
                <>
                  <div className="spinner" style={{ width: 14, height: 14 }}></div> Guardando...
                </>
              ) : (
                'Guardar'
              )}
            </button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <FormField label="Título">
            <input className="form-input" value={formCurso.titulo || ''} onChange={(e) => setFormCurso((p) => ({ ...p, titulo: e.target.value }))} placeholder="Nombre del curso" />
          </FormField>
          <div className="grid-2">
            <FormField label="Categoría">
              <select className="form-input" value={formCurso.categoria_id || ''} onChange={(e) => setFormCurso((p) => ({ ...p, categoria_id: e.target.value }))}>
                <option value="">Seleccionar...</option>
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField label="Nivel">
              <select className="form-input" value={formCurso.nivel || 'Básico'} onChange={(e) => setFormCurso((p) => ({ ...p, nivel: e.target.value }))}>
                {['Básico', 'Intermedio', 'Avanzado'].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
          <div className="grid-2">
            <FormField label="Instructor">
              <input className="form-input" value={formCurso.instructor || ''} onChange={(e) => setFormCurso((p) => ({ ...p, instructor: e.target.value }))} placeholder="Nombre del instructor" />
            </FormField>
            <FormField label="Duración">
              <input className="form-input" value={formCurso.duracion || ''} onChange={(e) => setFormCurso((p) => ({ ...p, duracion: e.target.value }))} placeholder="Ej: 40h" />
            </FormField>
          </div>
          <FormField label="Cupos máximos">
            <input type="number" className="form-input" value={formCurso.max || ''} onChange={(e) => setFormCurso((p) => ({ ...p, max: e.target.value }))} />
          </FormField>
          <FormField label="Descripción">
            <textarea className="form-input" rows={3} value={formCurso.descripcion || ''} onChange={(e) => setFormCurso((p) => ({ ...p, descripcion: e.target.value }))} placeholder="Descripción del curso..." style={{ resize: 'vertical' }} />
          </FormField>
        </div>
      </Modal>
    </div>
  );
}