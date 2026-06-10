import React from 'react';
import Card from '../../components/Card.jsx';

const MisCursos = () => {
  const misCursosInscritos = [
    { id: 201, nombre: "React Avanzado", categoria: "Frontend", precio: "Gratis", stock: "Inscrito" },
    { id: 202, nombre: "Spring Boot Pro", categoria: "Backend", precio: "Gratis", stock: "Inscrito" }
  ];

  return (
    <div className="mis-cursos">
      <h1>Mis Cursos</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {misCursosInscritos.map(curso => (
          <Card key={curso.id} data={curso} />
        ))}
      </div>
    </div>
  );
}

export default MisCursos;