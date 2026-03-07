# Proyecto Integrador: Nivel 2 - Front 2 (React)

[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=FFD62E)](https://vite.dev/)
[![React_Router](https://img.shields.io/badge/React_Router-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![SweetAlert2](https://img.shields.io/badge/SweetAlert2-FF5C8D?logo=sweetalert&logoColor=white)](https://sweetalert2.github.io/)
[![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white)](https://git-scm.com/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/)
[![Conventional_Commits](https://img.shields.io/badge/Conventional_Commits-1.0.0-FE5196)](https://www.conventionalcommits.org/)
[![GitFlow](https://img.shields.io/badge/Workflow-GitFlow-0F4C81)](https://nvie.com/posts/a-successful-git-branching-model/)

## Vista Visual de Stack y Flujo

| Tema | Iconos/Logos |
|---|---|
| Frontend Base | <img src="https://cdn.simpleicons.org/react" alt="React" width="22" /> <img src="https://cdn.simpleicons.org/vite" alt="Vite" width="22" /> <img src="https://cdn.simpleicons.org/javascript" alt="JavaScript" width="22" /> |
| Navegacion | <img src="https://cdn.simpleicons.org/reactrouter" alt="React Router" width="22" /> |
| Alertas y UX | <img src="https://cdn.simpleicons.org/sweetalert" alt="SweetAlert2" width="22" /> |
| Control de Versiones | <img src="https://cdn.simpleicons.org/git" alt="Git" width="22" /> <img src="https://cdn.simpleicons.org/github" alt="GitHub" width="22" /> |
| Estrategia de ramas | <img src="https://img.shields.io/badge/GitFlow-main%20%7C%20develop%20%7C%20feature%2F%2A-0F4C81" alt="GitFlow" /> |
| Estandar de commits | <img src="https://img.shields.io/badge/Conventional%20Commits-feat%20fix%20docs%20chore-FE5196" alt="Conventional Commits" /> |

## Documento de Entregables Detallados

### Objetivo General de la Materia

El objetivo de esta materia es evolucionar las maquetas del Nivel 1 hacia una aplicacion SPA con React. Los estudiantes deben construir interfaces reutilizables con componentes, manejar estado y rutas, e integrar el frontend con una API REST ya construida en Spring Boot.

### Requerimientos de Entrega y Repositorio (GitHub)

La entrega final del proyecto se gestionara exclusivamente a traves de un repositorio de GitHub.

- **Flujo de trabajo (Fork):** Cada equipo debe hacer un `fork` del repositorio base original proporcionado.
- **Flujo de forks por modulo (obligatorio):**
  1. El docente/coordinacion comparte el repositorio original.
  2. Cada lider de modulo hace `fork` del repositorio original.
  3. Cada integrante del modulo hace `fork` del repositorio del lider de su modulo.
  4. Los `pull request` de trabajo individual se abren hacia el repositorio del lider del modulo.
  5. El lider consolida y abre `pull request` hacia el repositorio original cuando aplique.
- **Nombre del repositorio:** El repositorio forkeado debe tener exactamente el mismo nombre del repositorio original.
- **Nombre de carpeta interna del proyecto:** Dentro del repositorio forkeado se debe crear una carpeta con exactamente el nombre del modulo asignado (por ejemplo: `modulo-1-autenticacion-y-registro`, `modulo-2-catalogo-de-cursos`, etc. en `kebab-case`).
- **Archivo `README.md`:** El repositorio del equipo debe contener un archivo `README.md` en la raiz.
- **Contenido del `README.md`:** Debe incluir:
  - Descripcion y documentacion tecnico-funcional del modulo asignado.
  - Lista completa de integrantes del equipo (nombres y apellidos).

---

### Requerimientos Tecnicos Globales (Obligatorios)

Estos requerimientos aplican a todos los modulos y son base de evaluacion de buenas practicas.

**1. Convenciones de Nomenclatura**

- **`kebab-case`:** Uso obligatorio para carpetas, archivos y clases CSS.
- **`camelCase`:** Uso obligatorio para variables, funciones, hooks personalizados y propiedades JS.
- **`PascalCase`:** Uso obligatorio para componentes React.

**2. Estructura del Proyecto React**

- Se debe usar una estructura clara y modular.
- Estructura sugerida:

```txt
/ (raiz del proyecto)
  package.json
  README.md
  .env
/public
/src
  /app            (config global de app y rutas)
  /pages          (vistas por modulo)
  /components     (componentes reutilizables)
  /services       (consumo de API y cliente HTTP)
  /utils          (helpers, validaciones, formateos)
  /assets         (imagenes, iconos, etc.)
  /styles         (estilos globales y variables)
  main.jsx
```

**3. Integracion con API Spring Boot (Fuente de Verdad)**

- El frontend debe consumir una API REST ya creada con Spring Boot.
- **No se trabaja con Spring Security en backend**, por lo tanto no se exige implementacion de OAuth/JWT o guards de token obligatorios desde backend.
- La fuente de verdad principal es la API (no `localStorage`).
- `localStorage` solo puede usarse para estado de UI o sesion simulada minima (por ejemplo, datos basicos de usuario logueado), cuando el modulo lo requiera.
- Se recomienda centralizar llamadas HTTP en `src/services` usando `fetch` o `axios`.
- La URL base de la API debe manejarse por variable de entorno (`.env`, por ejemplo `VITE_API_URL`).

**4. Librerias Permitidas y Recomendadas**

- Se permite usar `sweetalert2` para feedback de exito, error, confirmaciones y alertas de validacion.
- Se implementará `react-router-dom` para la navegacion entre componentes y vistas.
- No se usara `Context` para manejo de estado global en esta etapa.
- No se usaran hooks personalizados en esta etapa.
- El estado se manejara de forma local por componente segun necesidad.

**5. Plantilla Global de Diseno (UI Kit Base)**

- Todos los modulos deben compartir la misma base visual para mantener consistencia entre entregables.
- Se define una plantilla unica para:
  - Sistema de diseno general.
  - Tipografia principal y secundaria.
  - Paleta de colores (primario, secundario, neutros, exito, alerta, error).
  - Espaciado, bordes, sombras y estados interactivos.
- Aunque aun no se definieron valores finales, la estructura debe quedar lista para reemplazo rapido.
- Se recomienda centralizar variables en archivos globales (por ejemplo: `src/styles/tokens.css` o `src/styles/variables.css`).
- Queda prohibido que cada modulo defina una identidad visual distinta a la plantilla global acordada.

**6. Flujo Git (GitFlow) Obligatorio**

- Se trabajara bajo estrategia GitFlow para orden, trazabilidad y control de calidad.
- Ramas principales:
  - `main`: version estable de produccion/entrega.
  - `develop`: rama de integracion de trabajo continuo.
- Ramas de soporte:
  - `feature/<modulo>-<descripcion-corta>` para nuevas funcionalidades.
  - `release/<version>` para cierre de entregas.
  - `hotfix/<descripcion-corta>` para correcciones urgentes sobre `main`.
- Reglas minimas:
  - No trabajar directo sobre `main` ni `develop`.
  - Todo cambio debe entrar por `pull request`.
  - Se recomienda minimo 1 aprobacion del lider de modulo antes de merge.

**7. Estandar de Commits (Obligatorio)**

- Se adopta formato de Conventional Commits:
  - `<tipo>(<alcance>): <descripcion corta en imperativo>`
- Tipos permitidos:
  - `feat`: nueva funcionalidad.
  - `fix`: correccion de bug.
  - `docs`: cambios en documentacion.
  - `style`: formato/estilos sin cambio funcional.
  - `refactor`: mejora interna sin cambiar comportamiento.
  - `test`: pruebas nuevas o actualizadas.
  - `chore`: tareas de mantenimiento/configuracion.
- Ejemplos validos:
  - `feat(modulo-1): agregar validacion de confirmacion de contrasena`
  - `fix(modulo-2): corregir filtro por categoria vacia`
  - `docs(readme): actualizar flujo de forks y gitflow`

**8. Requerimiento Transversal de Funcionalidad (CRUD + Valor Agregado)**

- Cada modulo debe implementar el CRUD completo de su entidad principal:
  - `Create` (crear registro)
  - `Read` (listar y/o ver detalle)
  - `Update` (editar registro)
  - `Delete` (eliminar registro)
- El CRUD debe consumir la API y reflejar cambios en la interfaz sin recargar la pagina.
- Adicionalmente, cada modulo debe incluir actividades propias (valor agregado) para dar personalidad y funcionalidad al modulo.
- Se recomienda definir minimo 2 actividades propias por modulo (por ejemplo: filtros avanzados, exportacion, busqueda, indicadores, atajos de UX, vistas alternativas).

---

### Modulo 1: Autenticacion y Registro

**Objetivo del modulo:** Validar formularios del lado del cliente y simular/integrar el flujo de inicio de sesion y registro consumiendo API, gestionando navegacion React.

**Vistas involucradas:** `Login`, `Registro`, `Recuperar`

**Lista de requerimientos:**

- [ ] Gestionar envio de formularios con React (sin recarga de pagina).
- [ ] Implementar validacion en tiempo real para confirmacion de contrasena en registro.
- [ ] Validar campos obligatorios antes de enviar al backend.
- [ ] Mostrar errores de validacion y de API en pantalla (mensajes cercanos a campos y/o alertas con `sweetalert2`).
- [ ] Aplicar estilos condicionales segun estado de validacion.
- [ ] Login: consumir endpoint de autenticacion/usuarios para verificar credenciales.
- [ ] Si login es exitoso, guardar estado de sesion minima en cliente y redirigir a vista principal.
- [ ] Registro: consumir endpoint de creacion de usuario y redirigir al login al finalizar.
- [ ] Recuperar: validar correo y mostrar mensaje generico de confirmacion (exista o no en sistema).
- [ ] Implementar CRUD completo del modulo y evidenciarlo con flujo funcional de punta a punta.
- [ ] Agregar minimo 2 actividades propias que aporten personalidad y funcionalidad al modulo.

### Modulo 2: Catalogo de Cursos

**Objetivo del modulo:** Renderizar informacion dinamica de cursos desde API y aplicar filtros interactivos sin recargar.

**Vistas involucradas:** `Cursos`, `Categorias`

**Lista de requerimientos:**

- [ ] Cargar cursos consumiendo endpoint de cursos al montar la vista.
- [ ] Renderizar tarjetas de cursos con componentes React.
- [ ] Implementar estado de carga, estado vacio y manejo de error de consumo.
- [ ] Implementar filtro por categoria sin recargar la pagina.
- [ ] Al cambiar filtro, actualizar listado renderizado en tiempo real.
- [ ] (Opcional avanzado) Mostrar contador por categoria.
- [ ] Implementar CRUD completo del modulo y evidenciarlo con flujo funcional de punta a punta.
- [ ] Agregar minimo 2 actividades propias que aporten personalidad y funcionalidad al modulo.

### Modulo 3: Gestion de Inscripciones

**Objetivo del modulo:** Implementar flujo de inscripcion entre vistas, sincronizando estado con API.

**Vistas involucradas:** `DetalleCurso`, `ProcesoInscripcion`, `MisCursos`, `Confirmacion`

**Lista de requerimientos:**

- [ ] Desde detalle, permitir iniciar inscripcion del curso seleccionado.
- [ ] En proceso de inscripcion, cargar datos completos del curso desde API.
- [ ] Confirmar inscripcion consumiendo endpoint de inscripciones (POST).
- [ ] Redirigir a vista de confirmacion al finalizar inscripcion.
- [ ] En "Mis Cursos", renderizar tabla/listado dinamico de cursos del usuario.
- [ ] Si no hay usuario en sesion simulada, mostrar estado vacio o mensaje de acceso.
- [ ] Implementar CRUD completo del modulo y evidenciarlo con flujo funcional de punta a punta.
- [ ] Agregar minimo 2 actividades propias que aporten personalidad y funcionalidad al modulo.

### Modulo 4: Asistencia y Evaluaciones

**Objetivo del modulo:** Renderizar tablas dinamicas desde API para calificaciones y asistencias, aplicando estilos condicionales.

**Vistas involucradas:** `MisCalificaciones`, `HistorialAsistencia`

**Lista de requerimientos:**

- [ ] Consumir endpoints de calificaciones y asistencias del usuario.
- [ ] Renderizar filas dinamicas con componentes de tabla/lista.
- [ ] Si no existe sesion simulada, mostrar estado vacio sin romper la app.
- [ ] Aplicar estilo condicional cuando asistencia sea "Ausente" o "Tardanza".
- [ ] Implementar CRUD completo del modulo y evidenciarlo con flujo funcional de punta a punta.
- [ ] Agregar minimo 2 actividades propias que aporten personalidad y funcionalidad al modulo.

### Modulo 5: Perfil del Colaborador (HV)

**Objetivo del modulo:** Consultar y actualizar datos de perfil usando API, incluyendo cambios de seguridad.

**Vistas involucradas:** `Perfil`, `EditarPerfil`, `Seguridad`

**Lista de requerimientos:**

- [ ] Validar sesion simulada antes de consultar perfil.
- [ ] Mostrar datos del usuario en vista de perfil.
- [ ] Precargar formulario de edicion con datos actuales.
- [ ] Actualizar perfil consumiendo endpoint correspondiente (PUT/PATCH).
- [ ] En seguridad, validar contrasena actual y confirmacion de nueva contrasena.
- [ ] Actualizar contrasena consumiendo endpoint de seguridad.
- [ ] Mostrar feedback de exito/error (preferiblemente con `sweetalert2`).
- [ ] Implementar CRUD completo del modulo y evidenciarlo con flujo funcional de punta a punta.
- [ ] Agregar minimo 2 actividades propias que aporten personalidad y funcionalidad al modulo.

### Modulo 6: Comunicaciones Internas

**Objetivo del modulo:** Gestionar anuncios desde frontend consumiendo API para listar y crear contenido.

**Vistas involucradas:** `Anuncios`, `CrearAnuncio`

**Lista de requerimientos:**

- [ ] Listar anuncios desde endpoint de anuncios.
- [ ] Renderizar listado dinamico en React.
- [ ] Capturar y validar formulario de creacion de anuncio.
- [ ] Crear anuncio via API (POST) con campos minimos: `titulo`, `contenido`, `fecha`.
- [ ] Mostrar confirmacion al usuario y limpiar formulario.
- [ ] Al volver al listado, el nuevo anuncio debe verse reflejado.
- [ ] Implementar CRUD completo del modulo y evidenciarlo con flujo funcional de punta a punta.
- [ ] Agregar minimo 2 actividades propias que aporten personalidad y funcionalidad al modulo.

### Modulo 7: Dashboard Analitico

**Objetivo del modulo:** Implementar dashboard por secciones/tabs y mostrar metricas calculadas desde datos de API.

**Vista involucrada:** `Dashboard`

**Lista de requerimientos:**

- [ ] Estructurar dashboard con navegacion por tabs o secciones.
- [ ] Definir estado inicial con primera seccion activa.
- [ ] Implementar logica para mostrar/ocultar contenido por seccion.
- [ ] Gestionar clases de estado activo en tabs/botones.
- [ ] Consultar datos necesarios desde API para metricas.
- [ ] Calcular y pintar metricas (por ejemplo: total usuarios, total cursos, total inscripciones).
- [ ] Implementar CRUD completo del modulo y evidenciarlo con flujo funcional de punta a punta.
- [ ] Agregar minimo 2 actividades propias que aporten personalidad y funcionalidad al modulo.

---

## Criterios de Evaluacion Sugeridos

- Cumplimiento funcional del modulo asignado.
- Calidad del codigo React (componentizacion, reutilizacion y organizacion).
- Correcta integracion con API Spring Boot.
- Manejo de estados de carga/error/empty.
- Validaciones de formularios y feedback al usuario (`sweetalert2` u otro mecanismo claro).
- Navegacion y experiencia de usuario sin recargas innecesarias.
- Buenas practicas de Git y documentacion en `README.md`.

## Integrantes

- [ ] Nombre Apellido
- [ ] Nombre Apellido
- [ ] Nombre Apellido