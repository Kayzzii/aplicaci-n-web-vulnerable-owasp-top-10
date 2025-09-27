import React, { useState } from 'react';

// Base de datos simulada de usuarios
const existingUsers = ['admin@example.com', 'user@example.com'];

const A04_InsecureDesign: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

    const handlePasswordReset = () => {
        // VULNERABILIDAD: El diseño de esta función proporciona diferentes respuestas
        // dependiendo de si el usuario existe o no. Esto permite a un atacante
        // construir una lista de correos de usuarios válidos (enumeración de usuarios).
        if (existingUsers.includes(email.toLowerCase())) {
            setMessage(`Se ha enviado un enlace para restablecer la contraseña a ${email}.`);
            setMessageType('success');
        } else {
            setMessage(`Error: No se encontró una cuenta para la dirección de correo ${email}.`);
            setMessageType('error');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-accent mb-2">A04: Diseño Inseguro</h2>
            <p className="text-text-secondary mb-6">Escenario: Una función de "Olvidé mi contraseña" revela si el correo de un usuario existe en el sistema, permitiendo a los atacantes enumerar nombres de usuario válidos.</p>

            <div className="bg-primary p-6 rounded-lg shadow-lg border border-border-color">
                <h3 className="text-xl font-bold mb-4">Restablecer Contraseña</h3>
                <p className="mb-4">Introduce tu dirección de correo para restablecer tu contraseña.</p>
                
                <div className="flex items-center space-x-4 mb-4">
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu-email@ejemplo.com"
                        className="flex-grow bg-secondary p-2 rounded border border-border-color focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <button onClick={handlePasswordReset} className="bg-accent hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors">
                        Enviar Enlace de Reseteo
                    </button>
                </div>

                {message && (
                    <div className={`p-4 rounded ${
                        messageType === 'success' ? 'bg-green-900/50 border border-green-500 text-green-300' 
                        : 'bg-red-900/50 border border-red-500 text-red-300'
                    }`}>
                        <p>{message}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default A04_InsecureDesign;