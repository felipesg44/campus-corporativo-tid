import React from 'react';
import { useLoaderData, useRevalidator, useRouteLoaderData, useNavigate } from 'react-router-dom';
import { EmptyState, Modal, Spinner } from '../../components/components.jsx';
import { COLORS } from '../../components/theme.js';
import { confirm, toast } from '../../helpers/alerts.js';
import { tidApi } from '../../services/tid.js';
import { ClipboardList, RefreshCw, Trash2, CheckCircle, Clock, BookOpen, Plus, Pencil, Search, X } from 'lucide-react';

const getEstadoReal = (insc) => {
  const prog = insc.progreso || 0;
  if (prog >= 100) return 'Completado';
  if (prog > 0) return 'En Progreso';
  return 'Activo';
};

export default function RegistrationManagementPage() {
  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const { session } = useRouteLoaderData('root');
  const { cursos, inscripciones } = useLoaderData();

  const [search, setSearch] = React.useState('');
  const [filtroEstado, setFiltroEstado] = React.useState('Todos');

  const [modalEdit, setModalEdit] = React.useState(null);
  const [editForm, setEditForm] = React.useState({ progreso: 0, estado: 'Activo' });
  const [saving, setSaving] = React.useState(false);
  const [modalCancel, setModalCancel] = React.useState(null);
  const [canceling, setCanceling] = React.useState(false);
  const [modalDetalle, setModalDetalle] = React.useState(null);

  const SURA_COLORS = {
    azulVivo: '#2D6DF6',
    azulSura: '#0033A0',
    aqua: '#D5F5F8',
    gris: '#F2F2F2'
  };

  const openEdit = (insc) => {
    setEditForm({ progreso: insc.progreso || 0, estado: insc.estado || 'Activo' });
    setModalEdit(insc);
  };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const nuevoProgreso = parseInt(editForm.progreso);
      let nuevoEstado = editForm.estado;
      if (nuevoProgreso >= 100) nuevoEstado = 'Completado';
      else if (nuevoProgreso > 0) nuevoEstado = 'En Progreso';
      else nuevoEstado = 'Activo';

      await tidApi.updateInscripcion(modalEdit.id, {
        ...modalEdit,
        progreso: nuevoProgreso,
        estado: nuevoEstado,
      });
      toast.success('Inscripción actualizada');
      setModalEdit(null);
      revalidator.revalidate();
    } catch (e) {
      toast.error(e.message || 'Error al actualizar');
    } finally {
      setSaving(false);
    }
  };

  const cursoById = React.useMemo(() => {
    const m = new Map();
    cursos.forEach((c) => m.set(c.id, c));
    return m;
  }, [cursos]);

  const filteredInscripciones = React.useMemo(() => {
    return inscripciones.filter(i => {
      const curso = cursoById.get(i.curso_id);
      const coincideBusqueda = curso?.titulo.toLowerCase().includes(search.toLowerCase());
      const coincideEstado = filtroEstado === 'Todos' || getEstadoReal(i) === filtroEstado;
      return coincideBusqueda && coincideEstado;
    });
  }, [inscripciones, search, filtroEstado, cursoById]);

  const stats = React.useMemo(() => {
    return {
      total: inscripciones.length,
      enProgreso: inscripciones.filter(i => (i.progreso || 0) > 0 && (i.progreso || 0) < 100).length,
      completados: inscripciones.filter(i => (i.progreso || 0) >= 100).length
    };
  }, [inscripciones]);



  const handleGenerateCertificate = (inscripcion, curso) => {
    const studentName = session.nombre;
    const courseTitle = curso?.titulo || 'Curso';
    const instructorName = curso?.instructor || 'Instructor';

    const win = window.open('', '_blank');
    if (!win) {
      toast.error('No se pudo abrir la ventana del certificado. Por favor, permite las ventanas emergentes.');
      return;
    }

    const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Certificado - ${courseTitle}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap');
    @page { size: landscape; margin: 0; }
    body {
      margin: 0;
      padding: 0;
      font-family: 'DM Sans', sans-serif;
      background-color: #f8fafc;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      -webkit-print-color-adjust: exact;
    }
    .certificate-container {
      width: 297mm;
      height: 210mm;
      background: #ffffff;
      padding: 20mm;
      box-sizing: border-box;
      border: 15px double #0033A0;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      text-align: center;
    }
    .certificate-container::before {
      content: '';
      position: absolute;
      top: 10px; left: 10px; right: 10px; bottom: 10px;
      border: 2px solid #2D6DF6;
      pointer-events: none;
    }
    .header {
      margin-top: 10px;
    }
    .logo {
      font-size: 26px;
      font-weight: 800;
      color: #0033A0;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .subtitle {
      font-size: 14px;
      color: #64748b;
      margin-top: 4px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .title {
      font-size: 36px;
      font-family: Georgia, serif;
      color: #0f172a;
      margin: 25px 0 10px 0;
      letter-spacing: 1px;
    }
    .presented-to {
      font-size: 16px;
      color: #64748b;
      margin-bottom: 5px;
    }
    .student-name {
      font-size: 32px;
      font-weight: 700;
      color: #0033A0;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 10px;
      min-width: 60%;
      display: inline-block;
      margin-bottom: 25px;
    }
    .description {
      font-size: 16px;
      line-height: 1.6;
      color: #334155;
      max-width: 700px;
      margin: 0 auto;
    }
    .course-title {
      font-weight: 700;
      color: #0f172a;
    }
    .footer-section {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: flex-end;
      margin-top: 40px;
      margin-bottom: 10px;
    }
    .signature-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 220px;
    }
    .signature-line {
      width: 100%;
      border-top: 1px solid #94a3b8;
      margin-top: 8px;
      padding-top: 6px;
      font-size: 12px;
      color: #64748b;
    }
    .signature-name {
      font-weight: 600;
      color: #0f172a;
      font-size: 14px;
    }
    .stamp-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .sello-tid {
      width: 90px;
      height: 90px;
      border: 4px double #0033A0;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      color: #0033A0;
      font-size: 10px;
      transform: rotate(-10deg);
      background: rgba(213, 245, 248, 0.2);
    }
    .sello-tid span {
      font-size: 8px;
      font-weight: 400;
      color: #2D6DF6;
    }
  </style>
</head>
<body>
  <div class="certificate-container">
    <div class="header">
      <div class="logo">Campus Corporativo TID</div>
      <div class="subtitle">Certificado de Finalización</div>
    </div>
    
    <div>
      <div class="title">CERTIFICADO DE PARTICIPACIÓN</div>
      <div class="presented-to">Otorgado con orgullo a</div>
      <div class="student-name">${studentName}</div>
      <div class="description">
        Por haber cursado y aprobado satisfactoriamente el programa de formación corporativa en
        <br>
        <span class="course-title">"${courseTitle}"</span>
        <br>
        bajo la instrucción de <strong>${instructorName}</strong>, cumpliendo con todos los requisitos académicos y prácticos exigidos.
      </div>
    </div>
    
    <div class="footer-section">
      <div class="signature-box">
        <div style="font-family: 'Georgia', cursive; font-size: 18px; color: #475569; font-style: italic; transform: rotate(-5deg); margin-bottom: -5px;">
          ${instructorName}
        </div>
        <div class="signature-line">
          <div class="signature-name">Instructor(a) del Curso</div>
          Campus Corporativo TID
        </div>
      </div>

      <div class="stamp-box">
        <div class="sello-tid">
          CAMPUS TID
          <span>VERIFICADO</span>
          <strong>2026</strong>
        </div>
      </div>

      <div class="signature-box">
        <div style="font-family: 'Georgia', cursive; font-size: 20px; color: #0033A0; font-style: italic; transform: rotate(-3deg); margin-bottom: -5px;">
          Campus TID
        </div>
        <div class="signature-line">
          <div class="signature-name">Firma del Instituto</div>
          Sello de Calidad Académica
        </div>
      </div>
    </div>
  </div>
  <script>
    window.onload = function() {
      window.print();
      setTimeout(function() {
        window.close();
      }, 1000);
    };
  </script>
</body>
</html>
    `;

    win.document.open();
    win.document.write(htmlContent);
    win.document.close();
    toast.success(`¡Certificado del curso "${courseTitle}" generado con éxito!`);
  };

  const handleCancel = (insc) => {
    setModalCancel(insc);
  };

  const confirmCancel = async () => {
    if (!modalCancel) return;
    setCanceling(true);
    try {
      await tidApi.deleteInscripcion(modalCancel.id);
      toast.success('Inscripción cancelada');
      setModalCancel(null);
      revalidator.revalidate();
    } catch (e) {
      toast.error(e.message || 'No se pudo cancelar la inscripción');
    } finally {
      setCanceling(false);
    }
  };

  if (revalidator.state !== 'idle') return <Spinner text="Actualizando..." />;

  if (!inscripciones?.length) {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div style={{
        background: '#E6EEFF', width: '80px', height: '80px', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'
      }}>
        <ClipboardList size={40} color={SURA_COLORS.azulSura} />
      </div>
      <h3 style={{ color: SURA_COLORS.azulSura, marginBottom: '10px' }}>
        Sin inscripciones
      </h3>
      <p style={{ color: COLORS.textMuted, marginBottom: '30px', maxWidth: '360px', margin: '0 auto 30px' }}>
        Aún no tienes cursos registrados. Explora el catálogo y empieza a aprender hoy.
      </p>
      <button
        className="btn btn-primary"
        onClick={() => navigate('/course-catalog')}
        style={{ background: SURA_COLORS.azulVivo, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
      >
        <BookOpen size={16} /> Explorar catálogo
      </button>
    </div>
  );
}

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div className="page-header" style={{ margin: 0 }}>
          <h2 style={{ color: SURA_COLORS.azulSura }}>Mis Cursos</h2>
          <p>Bienvenido, {session.nombre}</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/course-catalog')}
            style={{ background: SURA_COLORS.azulVivo, display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Plus size={16} /> Inscribirse en un curso
          </button>

          <button className="btn btn-secondary" onClick={() => revalidator.revalidate()}>
            <RefreshCw size={16} /> Actualizar
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '20px', borderLeft: `5px solid ${SURA_COLORS.azulSura}` }}>
          <div style={{ background: '#E6EEFF', padding: '10px', borderRadius: '8px' }}>
            <BookOpen color={SURA_COLORS.azulSura} size={24} />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '14px', color: COLORS.textMuted }}>Total Inscritos</p>
            <h3 style={{ margin: 0, fontSize: '24px' }}>{stats.total}</h3>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '20px', borderLeft: `5px solid ${SURA_COLORS.azulVivo}` }}>
          <div style={{ background: '#EAF2FF', padding: '10px', borderRadius: '8px' }}>
            <Clock color={SURA_COLORS.azulVivo} size={24} />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '14px', color: COLORS.textMuted }}>En Progreso</p>
            <h3 style={{ margin: 0, fontSize: '24px' }}>{stats.enProgreso}</h3>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '20px', borderLeft: `5px solid #00C389` }}>
          <div style={{ background: '#E6FFF7', padding: '10px', borderRadius: '8px' }}>
            <CheckCircle color="#00C389" size={24} />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '14px', color: COLORS.textMuted }}>Completados</p>
            <h3 style={{ margin: 0, fontSize: '24px' }}>{stats.completados}</h3>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
  
      <div className="search-box">
  <Search size={16} color={COLORS.textMuted} />
  <input
    placeholder="Buscar curso por nombre..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  {search && (
    <button
      onClick={() => setSearch('')}
      style={{ background: 'none', border: 'none', color: COLORS.textMuted, cursor: 'pointer' }}
    >
      <X size={16} />
    </button>
  )}
</div>

  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    {['Todos', 'Activo', 'En Progreso', 'Completado'].map((estado) => {
      const activo = filtroEstado === estado;
      const colores = {
        'Todos':       { bg: '#0033A0', text: '#fff' },
        'Activo':      { bg: '#2D6DF6', text: '#fff' },
        'En Progreso': { bg: '#f59e0b', text: '#fff' },
        'Completado':  { bg: '#00C389', text: '#fff' },
      };
      return (
        <button
          key={estado}
          onClick={() => setFiltroEstado(estado)}
          style={{
            padding: '6px 16px',
            borderRadius: '20px',
            border: `2px solid ${colores[estado].bg}`,
            background: activo ? colores[estado].bg : 'transparent',
            color: activo ? colores[estado].text : colores[estado].bg,
            fontWeight: 600,
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {estado}
          {estado !== 'Todos' && (
            <span style={{
              marginLeft: '6px',
              background: activo ? 'rgba(255,255,255,0.3)' : colores[estado].bg,
              color: activo ? colores[estado].text : '#fff',
              borderRadius: '10px',
              padding: '1px 7px',
              fontSize: '11px',
            }}>
              {inscripciones.filter(i => getEstadoReal(i) === estado).length}
            </span>
          )}
        </button>
      );
    })}
  </div>
  </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Curso</th>
              <th>Fecha de Inscripción</th>
              <th>Estado</th>
              <th>Progreso</th>
              <th style={{ width: 1 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredInscripciones.map((i) => {
              const curso = cursoById.get(i.curso_id);
              return (
                <tr key={i.id}>
                  <td 
                    style={{ fontWeight: 700, cursor: 'pointer', color: SURA_COLORS.azulVivo }}
                    onClick={() => setModalDetalle({ inscripcion: i, curso })}
                    onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                  >
                    {curso?.titulo || 'Curso'}
                  </td>
                  <td style={{ color: COLORS.textMuted }}>{i.fecha}</td>
                  <td>
                    {(() => {
                      const est = getEstadoReal(i);
                      return (
                        <span style={{
                          padding: '3px 10px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 600,
                          background: est === 'Completado' ? '#d1fae5' : est === 'En Progreso' ? '#fef3c7' : '#dbeafe',
                          color:      est === 'Completado' ? '#065f46' : est === 'En Progreso' ? '#92400e' : '#1e40af',
                        }}>
                          {est}
                        </span>
                      );
                    })()}
                  </td>
                  <td style={{ minWidth: 220 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="progress-bar-bg" style={{ flex: 1 }}>
                        <div
                          className="progress-bar-fill"
                          style={{
                            width: `${i.progreso || 0}%`,
                            background: (i.progreso || 0) >= 100 ? '#00C389' : i.estado === 'En Progreso' ? '#f59e0b' : SURA_COLORS.azulVivo
                          }}
                        ></div>
                      </div>
                      <span style={{ fontSize: 12, color: COLORS.textMuted }}>{i.progreso || 0}%</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => openEdit(i)}>
                        <Pencil size={14} />
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleCancel(i)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal
        open={!!modalEdit}
        onClose={() => setModalEdit(null)}
        title={`Editar — ${cursoById.get(modalEdit?.curso_id)?.titulo || ''}`}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setModalEdit(null)}>
              Cancelar
            </button>
            <button
              className="btn btn-primary"
              onClick={handleUpdate}
              disabled={saving}
              style={{ background: SURA_COLORS.azulVivo }}
            >
              {saving ? <div className="spinner" style={{ width: 14, height: 14, borderTopColor: '#fff' }}></div> : 'Guardar cambios'}
            </button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
              Estado
            </label>
            <select
              className="form-input"
              value={editForm.estado}
              onChange={(e) => setEditForm(p => ({ ...p, estado: e.target.value }))}
            >
              <option value="Activo">Activo</option>
              <option value="En Progreso">En Progreso</option>
              <option value="Completado">Completado</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
              Progreso: <span style={{ color: SURA_COLORS.azulVivo }}>{editForm.progreso}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={editForm.progreso}
              onChange={(e) => setEditForm(p => ({ ...p, progreso: e.target.value }))}
              style={{ width: '100%', accentColor: SURA_COLORS.azulVivo }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#999' }}>
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal de Confirmación de Cancelación */}
      <Modal
        open={!!modalCancel}
        onClose={() => setModalCancel(null)}
        title="Cancelar Inscripción"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setModalCancel(null)} disabled={canceling}>
              Volver
            </button>
            <button
              className="btn btn-danger"
              onClick={confirmCancel}
              disabled={canceling}
            >
              {canceling ? <div className="spinner" style={{ width: 14, height: 14, borderTopColor: '#fff' }}></div> : 'Confirmar cancelación'}
            </button>
          </>
        }
      >
        {modalCancel && (() => {
          const curso = cursoById.get(modalCancel.curso_id);
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'center', padding: '10px 0' }}>
              <div style={{
                background: '#FEE2E2', width: '60px', height: '60px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto'
              }}>
                <Trash2 color={COLORS.danger} size={30} />
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: COLORS.textPrimary, marginBottom: '8px' }}>
                  ¿Estás seguro de cancelar tu inscripción?
                </h3>
                <p style={{ color: COLORS.textSecondary, fontSize: '14px', lineHeight: '1.5' }}>
                  Perderás el progreso actual del curso y tu cupo será liberado para otros estudiantes.
                </p>
              </div>
              {curso && (
                <div style={{ background: COLORS.surface2, borderRadius: '8px', padding: '12px 16px', textAlign: 'left', borderLeft: `4px solid ${COLORS.danger}` }}>
                  <div style={{ fontSize: '12px', color: COLORS.textMuted }}>Curso a cancelar:</div>
                  <div style={{ fontWeight: 600, color: COLORS.textPrimary, fontSize: '15px' }}>{curso.titulo}</div>
                  <div style={{ fontSize: '12px', color: COLORS.textSecondary, marginTop: '4px' }}>
                    Instructor: {curso.instructor} · Progreso: {modalCancel.progreso || 0}%
                  </div>
                </div>
              )}
            </div>
          );
        })()}
      </Modal>

      {/* Modal de Detalle del Curso Inscrito */}
      <Modal
        open={!!modalDetalle}
        onClose={() => setModalDetalle(null)}
        title="Detalle del Curso Inscrito"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setModalDetalle(null)}>
              Cerrar
            </button>
            {modalDetalle && modalDetalle.inscripcion.progreso >= 100 && (
              <button 
                className="btn btn-success" 
                onClick={() => {
                  handleGenerateCertificate(modalDetalle.inscripcion, modalDetalle.curso);
                }}
                style={{ background: '#00C389', color: '#fff' }}
              >
                Generar Certificado
              </button>
            )}
          </>
        }
      >
        {modalDetalle && (() => {
          const { inscripcion, curso } = modalDetalle;
          const fechaInicio = inscripcion.fecha;
          const fechaFin = (() => {
            if (!fechaInicio) return 'N/A';
            const d = new Date(fechaInicio + 'T12:00:00'); // avoid timezone offsets
            d.setDate(d.getDate() + 30);
            return d.toISOString().split('T')[0];
          })();

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ borderBottom: `1px solid ${COLORS.border}`, paddingBottom: '15px' }}>
                <h3 style={{ color: SURA_COLORS.azulSura, fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>
                  {curso?.titulo}
                </h3>
                <span className="badge badge-gray">{curso?.nivel}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: COLORS.textMuted, marginBottom: '2px' }}>Alumno Inscrito</div>
                  <div style={{ fontWeight: 600, color: COLORS.textPrimary }}>
                    {[inscripcion.nombre, inscripcion.apellido].filter(Boolean).join(' ') || session.nombre}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: COLORS.textMuted, marginBottom: '2px' }}>Instructor(a)</div>
                  <div style={{ fontWeight: 600, color: COLORS.textPrimary }}>{curso?.instructor}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: COLORS.textMuted, marginBottom: '2px' }}>Fecha de Inicio</div>
                  <div style={{ fontWeight: 600, color: COLORS.textPrimary }}>{fechaInicio}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: COLORS.textMuted, marginBottom: '2px' }}>Fecha de Fin (Estimada)</div>
                  <div style={{ fontWeight: 600, color: COLORS.textPrimary }}>{fechaFin}</div>
                </div>
              </div>

              <div style={{ background: COLORS.surface2, borderRadius: '12px', padding: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={{ gridColumn: '1 / -1', fontWeight: 700, color: SURA_COLORS.azulSura, fontSize: '14px' }}>
                  Datos de inscripción
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: COLORS.textMuted, marginBottom: '2px' }}>Documento</div>
                  <div style={{ fontWeight: 600, color: COLORS.textPrimary }}>
                    {[inscripcion.tipoDocumento, inscripcion.numeroDocumento].filter(Boolean).join(' - ') || 'Sin registrar'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: COLORS.textMuted, marginBottom: '2px' }}>Telefono</div>
                  <div style={{ fontWeight: 600, color: COLORS.textPrimary }}>{inscripcion.telefono || 'Sin registrar'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: COLORS.textMuted, marginBottom: '2px' }}>Correo electronico</div>
                  <div style={{ fontWeight: 600, color: COLORS.textPrimary, overflowWrap: 'anywhere' }}>{inscripcion.correo || 'Sin registrar'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: COLORS.textMuted, marginBottom: '2px' }}>Ubicacion</div>
                  <div style={{ fontWeight: 600, color: COLORS.textPrimary }}>
                    {[inscripcion.municipio, inscripcion.departamento].filter(Boolean).join(', ') || 'Sin registrar'}
                  </div>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: '12px', color: COLORS.textMuted, marginBottom: '2px' }}>Direccion de residencia</div>
                  <div style={{ fontWeight: 600, color: COLORS.textPrimary }}>{inscripcion.direccion || 'Sin registrar'}</div>
                </div>
              </div>

              <div style={{ background: COLORS.surface2, borderRadius: '12px', padding: '16px', marginTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600, color: COLORS.textSecondary, fontSize: '13px' }}>Progreso del Curso</span>
                  <span style={{ fontWeight: 700, color: inscripcion.progreso >= 100 ? '#00C389' : SURA_COLORS.azulVivo }}>
                    {inscripcion.progreso || 0}%
                  </span>
                </div>
                <div className="progress-bar-bg" style={{ height: '8px' }}>
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${inscripcion.progreso || 0}%`,
                      background: inscripcion.progreso >= 100 ? '#00C389' : SURA_COLORS.azulVivo,
                      height: '100%'
                    }}
                  ></div>
                </div>
                {inscripcion.progreso < 100 ? (
                  <p style={{ fontSize: '11px', color: COLORS.textMuted, marginTop: '8px', fontStyle: 'italic' }}>
                    * El certificado se habilitará automáticamente al completar el 100% de las lecciones del curso.
                  </p>
                ) : (
                  <p style={{ fontSize: '11px', color: '#00C389', marginTop: '8px', fontWeight: 600 }}>
                    ✓ ¡Curso completado! Ya puedes descargar tu certificado de participación.
                  </p>
                )}
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
