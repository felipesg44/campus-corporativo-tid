import React from 'react';
import { useNavigate } from 'react-router-dom';

const DetalleCurso = () => {
  const navigate = useNavigate();

  const manejarInscripcion = () => {
    navigate('/proceso-inscripcion');
  };

  return (
    <div className="detalle-curso">
      <h1>Detalle del Curso</h1>
      <p>Aprende las bases de React y Spring Boot en este curso integral.</p>
      <button 
        onClick={manejarInscripcion}
        style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Inscribirme ahora
      </button>
    </div>
  );
}

export default DetalleCurso;