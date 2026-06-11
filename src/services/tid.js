const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const TID_MOCK = null;

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

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  if (res.status === 204) return true;

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message = data?.message || data?.error || 'No se pudo completar la solicitud.';
    throw new Error(message);
  }

  return data;
}

const normalizeRole = (role) => {
  const roles = { ADMIN: 'Admin', TEACHER: 'Instructor', INSTRUCTOR: 'Instructor', STUDENT: 'Estudiante' };
  return roles[String(role || '').toUpperCase()] || role || 'Estudiante';
};

const denormalizeRole = (role) => {
  const roles = { Admin: 'ADMIN', Instructor: 'TEACHER', Estudiante: 'STUDENT' };
  return roles[role] || role || 'STUDENT';
};

const splitName = (nombre = '') => {
  const parts = nombre.trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] || nombre || 'Usuario',
    lastName: parts.slice(1).join(' ') || 'Campus',
  };
};

const mapUser = (u) => ({
  id: u.id,
  nombre: [u.firstName, u.lastName].filter(Boolean).join(' ').trim(),
  email: u.email,
  rol: normalizeRole(u.role),
  telefono: u.phone,
  documento: u.document,
  direccion: u.address,
  area: u.area || u.address || '',
  avatar: u.avatar || null,
});

const mapCategory = (c) => ({
  id: c.id,
  nombre: c.name,
  color: c.color || '#3b82f6',
  totalCursos: c.courseCount ?? 0,
});

const mapCourse = (c) => ({
  id: c.id,
  titulo: c.title,
  categoria_id: c.categoryId,
  categoria: c.categoryName,
  instructor: c.instructor || 'Por asignar',
  duracion: c.duration || '',
  nivel: c.level || 'Básico',
  inscritos: c.enrolledCount ?? 0,
  max: c.capacity ?? 0,
  descripcion: c.description,
  imagen: c.image || null,
  activo: c.active,
  fechaInicio: c.startDate,
  fechaFin: c.endDate,
});

const mapStatus = (status) => {
  const statuses = { INSCRITO: 'Activo', COMPLETADO: 'Completado', CANCELADO: 'Cancelado' };
  return statuses[String(status || '').toUpperCase()] || status || 'Activo';
};

const unmapStatus = (status) => {
  const statuses = { Activo: 'INSCRITO', 'En Progreso': 'INSCRITO', Completado: 'COMPLETADO', Cancelado: 'CANCELADO' };
  return statuses[status] || status || 'INSCRITO';
};

const mapEnrollment = (e) => ({
  id: e.id,
  usuario_id: e.userId,
  curso_id: e.courseId,
  cursoTitulo: e.courseTitle,
  fecha: e.enrolledAt?.slice(0, 10),
  estado: mapStatus(e.status),
  progreso: e.progress ?? 0,
  nombre: e.firstName,
  apellido: e.lastName,
  tipoDocumento: e.documentType,
  numeroDocumento: e.documentNumber,
  correo: e.email,
  telefono: e.phone,
  departamento: e.department,
  municipio: e.city,
  direccion: e.address,
});

const mapGrade = (g) => ({
  id: g.id,
  usuario_id: g.userId,
  curso_id: g.courseId,
  cursoTitulo: g.courseTitle,
  actividad: g.activity || g.note || 'Actividad',
  nota: g.score <= 5 ? Math.round(g.score * 20) : g.score,
  fecha: g.date,
  tipo: g.type || 'Evaluacion',
});

const mapAttendanceStatus = (status) => {
  const statuses = { PRESENTE: 'Presente', AUSENTE: 'Ausente', TARDANZA: 'Tardanza' };
  return statuses[String(status || '').toUpperCase()] || status;
};

const mapAttendance = (a) => ({
  id: a.id,
  usuario_id: a.userId,
  curso_id: a.courseId,
  cursoTitulo: a.courseTitle,
  fecha: a.date,
  estado: mapAttendanceStatus(a.status),
  sesion: a.sessionName || 'Sesion',
});

const mapAnnouncement = (a) => ({
  id: a.id,
  titulo: a.title,
  contenido: a.content,
  fecha: a.date,
  autor: a.author || 'Campus TID',
  prioridad: a.priority || 'Media',
});

const toCoursePayload = (data) => ({
  title: data.titulo,
  description: data.descripcion,
  instructor: data.instructor,
  duration: data.duracion,
  level: data.nivel,
  image: data.imagen || null,
  categoryId: data.categoria_id,
  capacity: data.max,
  active: data.activo ?? true,
});

export const tidApi = {
  API_BASE,
  async login(email, password) {
    const data = await request(`/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    const session = mapUser(data.user);
    tidStorage.set('session', session);
    return session;
  },
  async registro(data) {
    const names = splitName(data.nombre);
    const user = await request('/users', {
      method: 'POST',
      body: JSON.stringify({
        ...names,
        email: data.email,
        password: data.password,
        confirmPassword: data.password,
        phone: data.telefono,
        area: data.area,
      }),
    });
    return mapUser(user);
  },
  async recuperar(email) {
    return request('/auth/recover', { method: 'POST', body: JSON.stringify({ email }) });
  },
  getSession() {
    return tidStorage.get('session', null);
  },
  logout() {
    tidStorage.remove('session');
  },
  async getCursos() {
    return (await request('/courses')).map(mapCourse);
  },
  async getCurso(id) {
    return mapCourse(await request(`/courses/${id}`));
  },
  async createCurso(data) {
    return mapCourse(await request('/courses', { method: 'POST', body: JSON.stringify(toCoursePayload(data)) }));
  },
  async updateCurso(id, data) {
    return mapCourse(await request(`/courses/${id}`, { method: 'PUT', body: JSON.stringify(toCoursePayload(data)) }));
  },
  async deleteCurso(id) {
    return request(`/courses/${id}`, { method: 'DELETE' });
  },
  async getCategorias() {
    return (await request('/categories?withCounts=true')).map(mapCategory);
  },
  async getInscripciones(usuario_id) {
    return (await request(`/enrollments?userId=${usuario_id}`))
      .map(mapEnrollment)
      .filter((inscripcion) => inscripcion.estado !== 'Cancelado');
  },
  async createInscripcion(data) {
    return mapEnrollment(await request('/enrollments', {
      method: 'POST',
      body: JSON.stringify({
        userId: data.usuario_id,
        courseId: data.curso_id,
        firstName: data.nombre,
        lastName: data.apellido,
        documentType: data.tipoDocumento,
        documentNumber: data.numeroDocumento,
        email: data.correo,
        phone: data.telefono,
        department: data.departamento,
        city: data.municipio,
        address: data.direccion,
      }),
    }));
  },
  async deleteInscripcion(id) {
    return request(`/enrollments/${id}`, { method: 'DELETE' });
  },
  async updateInscripcion(id, data) {
    return mapEnrollment(await request(`/enrollments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        status: unmapStatus(data.estado),
        progress: data.progreso,
        firstName: data.nombre,
        lastName: data.apellido,
        documentType: data.tipoDocumento,
        documentNumber: data.numeroDocumento,
        email: data.correo,
        phone: data.telefono,
        department: data.departamento,
        city: data.municipio,
        address: data.direccion,
      }),
    }));
  },
  async getCalificaciones(usuario_id) {
    return (await request(`/grades?userId=${usuario_id}`)).map(mapGrade);
  },
  async getAsistencias(usuario_id) {
    return (await request(`/attendance?userId=${usuario_id}`)).map(mapAttendance);
  },
  async getPerfil(id) {
    return mapUser(await request(`/users/${id}`));
  },
  async updatePerfil(id, data) {
    const namePayload = data.nombre ? splitName(data.nombre) : {};
    const user = await request(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...namePayload,
        phone: data.telefono,
        document: data.documento,
        address: data.direccion,
        area: data.area,
        avatar: data.avatar,
        role: data.rol ? denormalizeRole(data.rol) : undefined,
      }),
    });
    const updated = mapUser(user);
    const session = tidStorage.get('session', null);
    if (session && session.id === id) tidStorage.set('session', updated);
    return updated;
  },
  async updatePassword(id, actual, nueva) {
    await request(`/users/${id}/change-password`, {
      method: 'POST',
      body: JSON.stringify({ currentPassword: actual, newPassword: nueva, confirmNewPassword: nueva }),
    });
    return true;
  },
  async getAnuncios() {
    return (await request('/announcements')).map(mapAnnouncement);
  },
  async createAnuncio(data) {
    return mapAnnouncement(await request('/announcements', {
      method: 'POST',
      body: JSON.stringify({
        title: data.titulo,
        content: data.contenido,
        date: data.fecha,
        author: data.autor,
        priority: data.prioridad,
      }),
    }));
  },
  async deleteAnuncio(id) {
    return request(`/announcements/${id}`, { method: 'DELETE' });
  },
  async getDashboardMetrics() {
    const [base, cursos, categorias, inscripciones] = await Promise.all([
      request('/dashboard/metrics'),
      this.getCursos(),
      this.getCategorias(),
      request('/enrollments'),
    ]);
    return {
      totalUsuarios: base.totalUsers,
      totalCursos: base.totalCourses,
      totalInscripciones: base.totalEnrollments,
      inscripcionesActivas: inscripciones.filter((i) => i.status === 'INSCRITO').length,
      inscripcionesCompletadas: inscripciones.filter((i) => i.status === 'COMPLETADO').length,
      categorias: categorias.map((cat) => ({
        ...cat,
        totalCursos: cursos.filter((c) => c.categoria_id === cat.id).length,
        totalInscritos: inscripciones.filter((i) => cursos.find((c) => c.id === i.courseId && c.categoria_id === cat.id)).length,
      })),
      cursosMasInscritos: [...cursos].sort((a, b) => b.inscritos - a.inscritos).slice(0, 5),
    };
  },
};
