import React, { useState } from 'react';

const A09_SecurityLoggingAndMonitoringFailures: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [consoleLog, setConsoleLog] = useState<string[]>([]);

    const handleLoginAttempt = () => {
        // VULNERABILIDAD: No se genera ningún registro por un intento de autenticación fallido.
        // No hay un log del lado del servidor, ni siquiera un console.log del lado del cliente.
        // Esto hace que los ataques de fuerza bruta o credential stuffing sean completamente invisibles.
        setMessage('Login fallido: Credenciales inválidas.');

        // Simular salida de consola
        const now = new Date().toLocaleTimeString();
        setConsoleLog(prev => [...prev, `${now} - Botón presionado. No se generó ningún log para este evento de seguridad.`]);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-accent mb-2">A09: Fallas de Registro y Monitoreo de Seguridad</h2>
            <p className="text-text-secondary mb-6">Escenario: Los intentos de inicio de sesión fallidos no se registran, permitiendo a un atacante intentar ataques de fuerza bruta sin levantar alarmas.</p>

            <div className="bg-primary p-6 rounded-lg shadow-lg border border-border-color">
                <h3 className="text-xl font-bold mb-4">Formulario de Login Simulado</h3>
                <p className="mb-4">Intenta iniciar sesión aquí. Cada intento fallido debería ser un evento de seguridad registrado, pero no lo es.</p>
                
                {message && <p className="text-red-400 bg-red-900/50 p-3 rounded mb-4">{message}</p>}

                <div className="space-y-4 max-w-sm">
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Usuario"
                        className="w-full bg-secondary p-2 rounded border border-border-color"
                    />
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        className="w-full bg-secondary p-2 rounded border border-border-color"
                    />
                    <button onClick={handleLoginAttempt} className="w-full bg-accent hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Intentar Login
                    </button>
                </div>
                
                <div className="mt-6">
                    <h4 className="font-bold mb-2">Consola del Navegador / Log de Seguridad Simulado</h4>
                    <div className="h-40 bg-gray-900 p-4 rounded font-mono text-sm text-green-400 overflow-y-auto">
                        {consoleLog.map((line, index) => (
                            <p key={index}><span className="text-gray-500">&gt;</span> {line}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default A09_SecurityLoggingAndMonitoringFailures;