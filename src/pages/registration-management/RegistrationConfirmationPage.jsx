import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';

export default function RegistrationConfirmationPage() {
const navigate = useNavigate();
const location = useLocation();
const curso = location.state?.curso;

return (
    <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', minHeight: '70vh', textAlign: 'center'
    }}>
    <div style={{
        background: '#D5F5F8', padding: '30px', borderRadius: '50%',
        marginBottom: '20px'
    }}>
        <CheckCircle2 color="#2D6DF6" size={80} />
    </div>

    <h1 style={{ color: '#0033A0', marginBottom: '10px' }}>¡Inscripción Exitosa!</h1>

    {curso && (
        <div style={{
        background: '#F2F2F2', borderRadius: '10px', padding: '16px 24px',
        marginBottom: '20px', maxWidth: '380px', textAlign: 'left'
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <BookOpen color="#2D6DF6" size={18} />
            <strong style={{ color: '#0033A0' }}>{curso.titulo}</strong>
        </div>
        <p style={{ fontSize: '13px', color: '#666', margin: '3px 0' }}>
            <strong>Nivel:</strong> {curso.nivel}
        </p>
        <p style={{ fontSize: '13px', color: '#666', margin: '3px 0' }}>
            <strong>Instructor:</strong> {curso.instructor}
        </p>
        </div>
    )}

    <p style={{ color: '#666', maxWidth: '500px', marginBottom: '30px', lineHeight: '1.6', fontSize: '15px' }}>
        Te has inscrito exitosamente en el curso <strong>{curso?.titulo || ''}</strong>. Por favor debes estar muy pendiente del correo electrónico donde recibirás la fecha de inicio y detalle de la programación.
    </p>

    <button
        className="btn btn-primary"
        style={{ background: '#2D6DF6', display: 'flex', alignItems: 'center', gap: '8px' }}
        onClick={() => navigate('/registration-management')}
    >
        Ver mis cursos <ArrowRight size={18} />
    </button>
    </div>
);
}