import { NavLink } from "react-router-dom";

const Aside = () => {
return (
    <aside className="aside">
    <nav>
        <ul style={{ listStyle: 'none', padding: '1rem' }}>
        <li>
            <NavLink to="/detalle-curso" className={({ isActive }) => isActive ? "active" : ""}>
            Detalle del Curso
            </NavLink>
        </li>
        <li>
            <NavLink to="/proceso-inscripcion" className={({ isActive }) => isActive ? "active" : ""}>
            Proceso de Inscripción
            </NavLink>
        </li>
        <li>
            <NavLink to="/mis-cursos" className={({ isActive }) => isActive ? "active" : ""}>
            Mis Cursos
            </NavLink>
        </li>
        <li>
            <NavLink to="/confirmacion" className={({ isActive }) => isActive ? "active" : ""}>
            Confirmación
            </NavLink>
        </li>
        </ul>
    </nav>
    </aside>
);
};

export default Aside;