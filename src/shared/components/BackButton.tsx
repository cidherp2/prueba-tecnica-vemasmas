import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
    label?: string;
    width?: number | string;
}

const BackButton: React.FC<BackButtonProps> = ({ label = 'Regresar', width }) => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                
            }}
        >
        <button
            type="button"
            onClick={() => navigate(-1)}
             style={{ marginBottom: 16, padding: "6px 12px", cursor: "pointer",width: width || '100%', }}
            aria-label="Regresar"
        >
            {label}
        </button>
        </div>
    );
};

export default BackButton;