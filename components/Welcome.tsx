import React from 'react';

const Welcome: React.FC = () => {
    return (
        <div className="text-center p-8 bg-secondary rounded-lg shadow-xl">
            <h1 className="text-4xl font-bold text-accent mb-4">Bienvenido a la Demo de OWASP Top 10</h1>
            <p className="text-lg text-text-primary mb-6">
                Esta aplicación es un entorno práctico para demostrar vulnerabilidades web.
            </p>
            <p className="text-text-secondary">
                Selecciona una vulnerabilidad de la barra lateral para comenzar tu demostración técnica. Cada módulo está diseñado para ser explotado.
            </p>
        </div>
    );
};

export default Welcome;