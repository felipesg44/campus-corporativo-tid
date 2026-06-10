const API_BASE = '';

export const TID_MOCK = {
  usuarios: [
    { id: 1, nombre: 'Carlos Méndez', email: 'carlos@tid.com', password: '123456', rol: 'Estudiante', telefono: '555-0101', area: 'Tecnología', avatar: null },
    { id: 2, nombre: 'Ana Gómez', email: 'ana@tid.com', password: '123456', rol: 'Instructor', telefono: '555-0202', area: 'RRHH', avatar: null },
    { id: 3, nombre: 'Luis Herrera', email: 'luis@tid.com', password: '123456', rol: 'Admin', telefono: '555-0303', area: 'Operaciones', avatar: null },
  ],
  categorias: [
    { id: 1, nombre: 'Tecnología', color: '#3b82f6' },
    { id: 2, nombre: 'Habilidades Blandas', color: '#8b5cf6' },
    { id: 3, nombre: 'Cumplimiento', color: '#f59e0b' },
    { id: 4, nombre: 'Liderazgo', color: '#10b981' },
    { id: 5, nombre: 'Seguridad', color: '#ef4444' },
  ],
  cursos: [
    { id: 1, titulo: 'React Avanzado', categoria_id: 1, instructor: 'Ana Gómez', duracion: '40h', nivel: 'Avanzado', inscritos: 28, max: 30, descripcion: 'Domina hooks, context, performance y patrones avanzados de React.', imagen: null },
    { id: 2, titulo: 'Comunicación Efectiva', categoria_id: 2, instructor: 'Luis Herrera', duracion: '20h', nivel: 'Básico', inscritos: 15, max: 25, descripcion: 'Desarrolla habilidades de comunicación asertiva en entornos corporativos.', imagen: null },
    { id: 3, titulo: 'Cumplimiento Normativo', categoria_id: 3, instructor: 'Carlos Méndez', duracion: '16h', nivel: 'Intermedio', inscritos: 40, max: 50, descripcion: 'Marco regulatorio, políticas internas y ética empresarial.', imagen: null },
    { id: 4, titulo: 'Liderazgo Situacional', categoria_id: 4, instructor: 'Ana Gómez', duracion: '30h', nivel: 'Intermedio', inscritos: 12, max: 20, descripcion: 'Modelos de liderazgo adaptativo para equipos de alto rendimiento.', imagen: null },
    { id: 5, titulo: 'Seguridad de la Información', categoria_id: 5, instructor: 'Luis Herrera', duracion: '24h', nivel: 'Avanzado', inscritos: 22, max: 25, descripcion: 'Protección de datos, gestión de riesgos y políticas de seguridad TI.', imagen: null },
    { id: 6, titulo: 'Python para Data', categoria_id: 1, instructor: 'Carlos Méndez', duracion: '50h', nivel: 'Intermedio', inscritos: 18, max: 30, descripcion: 'Análisis de datos con Python, Pandas y visualización con Matplotlib.', imagen: null },
    { id: 7, titulo: 'Trabajo en Equipo', categoria_id: 2, instructor: 'Ana Gómez', duracion: '12h', nivel: 'Básico', inscritos: 35, max: 40, descripcion: 'Dinámicas colaborativas y metodologías ágiles de equipo.', imagen: null },
    { id: 8, titulo: 'Gestión de Proyectos', categoria_id: 4, instructor: 'Luis Herrera', duracion: '36h', nivel: 'Avanzado', inscritos: 8, max: 15, descripcion: 'PMI, Scrum, Kanban y métricas de éxito en proyectos corporativos.', imagen: null },
  ],
  inscripciones: [
    { id: 1, usuario_id: 1, curso_id: 1, fecha: '2026-03-15', estado: 'Activo', progreso: 65 },
    { id: 2, usuario_id: 1, curso_id: 3, fecha: '2026-02-10', estado: 'Completado', progreso: 100 },
    { id: 3, usuario_id: 1, curso_id: 7, fecha: '2026-04-01', estado: 'Activo', progreso: 30 },
  ],
  calificaciones: [
    { id: 1, usuario_id: 1, curso_id: 1, actividad: 'Quiz 1', nota: 88, fecha: '2026-03-20', tipo: 'Quiz' },
    { id: 2, usuario_id: 1, curso_id: 1, actividad: 'Proyecto Final', nota: 92, fecha: '2026-04-10', tipo: 'Proyecto' },
    { id: 3, usuario_id: 1, curso_id: 3, actividad: 'Examen Final', nota: 75, fecha: '2026-03-05', tipo: 'Examen' },
    { id: 4, usuario_id: 1, curso_id: 7, actividad: 'Taller 1', nota: 95, fecha: '2026-04-15', tipo: 'Taller' },
    { id: 5, usuario_id: 1, curso_id: 7, actividad: 'Quiz 2', nota: 60, fecha: '2026-04-25', tipo: 'Quiz' },
  ],
  asistencias: [
    { id: 1, usuario_id: 1, curso_id: 1, fecha: '2026-03-18', estado: 'Presente', sesion: 'Sesión 1' },
    { id: 2, usuario_id: 1, curso_id: 1, fecha: '2026-03-25', estado: 'Tardanza', sesion: 'Sesión 2' },
    { id: 3, usuario_id: 1, curso_id: 1, fecha: '2026-04-01', estado: 'Presente', sesion: 'Sesión 3' },
    { id: 4, usuario_id: 1, curso_id: 1, fecha: '2026-04-08', estado: 'Ausente', sesion: 'Sesión 4' },
    { id: 5, usuario_id: 1, curso_id: 7, fecha: '2026-04-03', estado: 'Presente', sesion: 'Sesión 1' },
    { id: 6, usuario_id: 1, curso_id: 7, fecha: '2026-04-10', estado: 'Presente', sesion: 'Sesión 2' },
    { id: 7, usuario_id: 1, curso_id: 3, fecha: '2026-02-15', estado: 'Presente', sesion: 'Sesión 1' },
    { id: 8, usuario_id: 1, curso_id: 3, fecha: '2026-02-22', estado: 'Tardanza', sesion: 'Sesión 2' },
  ],
  anuncios: [
    { id: 1, titulo: 'Bienvenida al Nuevo Trimestre', contenido: 'Se abre el período de inscripciones para Q2 2026. Revisen el catálogo actualizado con 12 nuevos cursos disponibles.', fecha: '2026-04-01', autor: 'RRHH', prioridad: 'Alta' },
    { id: 2, titulo: 'Mantenimiento Programado', contenido: 'El sistema estará en mantenimiento el sábado 4 de mayo de 2:00 a 5:00 AM. Por favor guarden su progreso.', fecha: '2026-04-28', autor: 'TI', prioridad: 'Media' },
    { id: 3, titulo: 'Nuevo Curso: IA Generativa', contenido: 'Próximamente lanzamos el curso de IA Generativa para no-técnicos. ¡Pre-regístrate ahora!', fecha: '2026-04-30', autor: 'Capacitación', prioridad: 'Media' },
  ],
};

export const tidStorage = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem('tid_' + key);
      return v ? JSON.parse(v) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, val) {
    try {
      localStorage.setItem('tid_' + key, JSON.stringify(val));
    } catch {
      return;
    }
  },
  remove(key) {
    try {
      localStorage.removeItem('tid_' + key);
    } catch {
      return;
    }
  },
};

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export const tidApi = {
  API_BASE,
  async login(email, password) {
    await delay(600);
    const users = tidStorage.get('usuarios', TID_MOCK.usuarios);
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) throw new Error('Credenciales incorrectas. Verifica tu email y contraseña.');
    const session = { ...user };
    delete session.password;
    tidStorage.set('session', session);
    return session;
  },
  async registro(data) {
    await delay(700);
    const users = tidStorage.get('usuarios', TID_MOCK.usuarios);
    if (users.find((u) => u.email === data.email)) throw new Error('Este correo ya está registrado.');
    const nuevo = { ...data, id: Date.now(), rol: 'Estudiante', avatar: null };
    tidStorage.set('usuarios', [...users, nuevo]);
    return nuevo;
  },
  async recuperar() {
    await delay(500);
    return { message: 'Si el correo existe, recibirás instrucciones de recuperación.' };
  },
  getSession() {
    return tidStorage.get('session', null);
  },
  logout() {
    tidStorage.remove('session');
  },
  async getCursos() {
    await delay(400);
    return tidStorage.get('cursos', TID_MOCK.cursos);
  },
  async getCurso(id) {
    await delay(300);
    const cursos = tidStorage.get('cursos', TID_MOCK.cursos);
    const c = cursos.find((x) => x.id === parseInt(id));
    if (!c) throw new Error('Curso no encontrado.');
    return c;
  },
  async createCurso(data) {
    await delay(500);
    const cursos = tidStorage.get('cursos', TID_MOCK.cursos);
    const nuevo = { ...data, id: Date.now(), inscritos: 0 };
    tidStorage.set('cursos', [...cursos, nuevo]);
    return nuevo;
  },
  async updateCurso(id, data) {
    await delay(400);
    let cursos = tidStorage.get('cursos', TID_MOCK.cursos);
    cursos = cursos.map((c) => (c.id === id ? { ...c, ...data } : c));
    tidStorage.set('cursos', cursos);
    return cursos.find((c) => c.id === id);
  },
  async deleteCurso(id) {
    await delay(400);
    let cursos = tidStorage.get('cursos', TID_MOCK.cursos);
    tidStorage.set('cursos', cursos.filter((c) => c.id !== id));
    return true;
  },
  async getCategorias() {
    await delay(300);
    return tidStorage.get('categorias', TID_MOCK.categorias);
  },
  async getInscripciones(usuario_id) {
    await delay(400);
    const insc = tidStorage.get('inscripciones', TID_MOCK.inscripciones);
    return insc.filter((i) => i.usuario_id === usuario_id);
  },
  async createInscripcion(data) {
    await delay(600);
    const insc = tidStorage.get('inscripciones', TID_MOCK.inscripciones);
    const existe = insc.find((i) => i.usuario_id === data.usuario_id && i.curso_id === data.curso_id);
    if (existe) throw new Error('Ya estás inscrito en este curso.');
    const nuevo = { ...data, id: Date.now(), estado: 'Activo', progreso: 0 };
    tidStorage.set('inscripciones', [...insc, nuevo]);
    return nuevo;
  },
  async deleteInscripcion(id) {
    await delay(400);
    let insc = tidStorage.get('inscripciones', TID_MOCK.inscripciones);
    tidStorage.set('inscripciones', insc.filter((i) => i.id !== id));
    return true;
  },
  async updateInscripcion(id, data) {
  await delay(400);
  let insc = tidStorage.get('inscripciones', TID_MOCK.inscripciones);
  insc = insc.map((i) => (i.id === id ? { ...i, ...data } : i));
  tidStorage.set('inscripciones', insc);
  return insc.find((i) => i.id === id);
},
  async getCalificaciones(usuario_id) {
    await delay(400);
    return tidStorage.get('calificaciones', TID_MOCK.calificaciones).filter((c) => c.usuario_id === usuario_id);
  },
  async getAsistencias(usuario_id) {
    await delay(400);
    return tidStorage.get('asistencias', TID_MOCK.asistencias).filter((a) => a.usuario_id === usuario_id);
  },
  async getPerfil(id) {
    await delay(300);
    const users = tidStorage.get('usuarios', TID_MOCK.usuarios);
    const u = users.find((x) => x.id === id);
    if (!u) throw new Error('Usuario no encontrado.');
    const r = { ...u };
    delete r.password;
    return r;
  },
  async updatePerfil(id, data) {
    await delay(500);
    let users = tidStorage.get('usuarios', TID_MOCK.usuarios);
    users = users.map((u) => (u.id === id ? { ...u, ...data } : u));
    tidStorage.set('usuarios', users);
    const updated = users.find((u) => u.id === id);
    const session = tidStorage.get('session', null);
    if (session && session.id === id) {
      const s = { ...updated };
      delete s.password;
      tidStorage.set('session', s);
    }
    return updated;
  },
  async updatePassword(id, actual, nueva) {
    await delay(500);
    const users = tidStorage.get('usuarios', TID_MOCK.usuarios);
    const user = users.find((u) => u.id === id);
    if (!user || user.password !== actual) throw new Error('La contraseña actual no es correcta.');
    await tidApi.updatePerfil(id, { password: nueva });
    return true;
  },
  async getAnuncios() {
    await delay(400);
    return tidStorage.get('anuncios', TID_MOCK.anuncios);
  },
  async createAnuncio(data) {
    await delay(500);
    const anuncios = tidStorage.get('anuncios', TID_MOCK.anuncios);
    const nuevo = { ...data, id: Date.now() };
    tidStorage.set('anuncios', [nuevo, ...anuncios]);
    return nuevo;
  },
  async deleteAnuncio(id) {
    await delay(400);
    let anuncios = tidStorage.get('anuncios', TID_MOCK.anuncios);
    tidStorage.set('anuncios', anuncios.filter((a) => a.id !== id));
    return true;
  },
  async getDashboardMetrics() {
    await delay(500);
    const usuarios = tidStorage.get('usuarios', TID_MOCK.usuarios);
    const cursos = tidStorage.get('cursos', TID_MOCK.cursos);
    const inscripciones = tidStorage.get('inscripciones', TID_MOCK.inscripciones);
    const categorias = tidStorage.get('categorias', TID_MOCK.categorias);
    return {
      totalUsuarios: usuarios.length,
      totalCursos: cursos.length,
      totalInscripciones: inscripciones.length,
      inscripcionesActivas: inscripciones.filter((i) => i.estado === 'Activo').length,
      inscripcionesCompletadas: inscripciones.filter((i) => i.estado === 'Completado').length,
      categorias: categorias.map((cat) => ({
        ...cat,
        totalCursos: cursos.filter((c) => c.categoria_id === cat.id).length,
        totalInscritos: inscripciones.filter((i) => cursos.find((c) => c.id === i.curso_id && c.categoria_id === cat.id)).length,
      })),
      cursosMasInscritos: [...cursos].sort((a, b) => b.inscritos - a.inscritos).slice(0, 5),
    };
  },
};
