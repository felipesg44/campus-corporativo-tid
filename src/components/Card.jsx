import React from 'react';

const Card = ({ data }) => {
return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', width: '200px' }}>
    <h3>{data.nombre}</h3>
    <p><strong>Categoría:</strong> {data.categoria}</p>
    <p><strong>Estado:</strong> {data.stock}</p>
    </div>
);
};

export default Card;