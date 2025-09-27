import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';
import type { AuthContextType } from '../types';

const A07_IdentificationAndAuthenticationFailures: React.FC = () => {
    const auth = useContext(AuthContext) as AuthContextType;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        setError('');
        
        // VULNERABILIDAD 1: Credenciales débiles y hardcodeadas. Sin hashing de contraseñas.
        if (username.toLowerCase() === 'admin' && password === 'password123') {
            auth.login({ id: 2, username: 'admin', role: 'admin' });
            return;
        }
        if (username.toLowerCase() === 'user' && password === 'userpass') {
            auth.login({ id: 1, username: 'user', role: 'user' });
            return;
        }

        // VULNERABILIDAD 2: Sin bloqueo de cuentas o prevención de fuerza bruta.
        // Un atacante podría intentar millones de contraseñas sin ser detenido.
        setError('Nombre de usuario o contraseña inválidos.');
    };

    if (auth.user) {
        return (
             <div>
                <h2 className="text-2xl font-bold text-accent mb-2">A07: Fallas de Identificación y Autenticación</h2>
                 <div className="bg-primary p-6 rounded-lg shadow-lg border border-border-color text-center">
                    <p className="text-xl text-green-400">Autenticado exitosamente como {auth.user.username}.</p>
                    <button onClick={auth.logout} className="mt-4 bg-accent hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors">
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div>
            <h2 className="text-2xl font-bold text-accent mb-2">A07: Fallas de Identificación y Autenticación</h2>
            <p className="text-text-secondary mb-6">Escenario: Políticas de contraseñas débiles y falta de protección contra fuerza bruta permiten a un atacante adivinar credenciales.</p>

            <div className="bg-primary p-6 rounded-lg shadow-lg border border-border-color max-w-md mx-auto">
                <h3 className="text-xl font-bold mb-4 text-center">Inicio de Sesión</h3>
                
                {error && <p className="text-red-400 bg-red-900/50 p-3 rounded mb-4 text-center">{error}</p>}
                
                <div className="space-y-4">
                    <div>
                        <label className="block mb-1 font-bold" htmlFor="username">Usuario</label>
                        <input 
                            type="text" 
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-secondary p-2 rounded border border-border-color focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>
                     <div>
                        <label className="block mb-1 font-bold" htmlFor="password">Contraseña</label>
                        <input 
                            type="password" 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-secondary p-2 rounded border border-border-color focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>
                    <button onClick={handleLogin} className="w-full bg-accent hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors">
                        Iniciar Sesión
                    </button>
                </div>
            </div>
        </div>
    );
};

export default A07_IdentificationAndAuthenticationFailures;