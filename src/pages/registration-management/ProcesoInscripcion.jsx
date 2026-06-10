import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProcesoInscripcion = () => {
  const navigate = useNavigate();

  const confirmar = (e) => {
    e.preventDefault();
    navigate('/confirmacion');
  };

  return (
    <div className="proceso-inscripcion">
      <h1>Confirmar Inscripción</h1>
      <form onSubmit={confirmar}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Nombre del Colaborador:</label><br/>
          <input type="text" placeholder="Tu nombre" required />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}>
          Finalizar Proceso
        </button>
      </form>
    </div>
  );
}

export default ProcesoInscripcion;