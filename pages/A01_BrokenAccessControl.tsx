import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';
import type { AuthContextType } from '../types';

// Datos de API simulados
const userProfiles = {
    1: { name: 'Alice (Usuario)', email: 'alice@example.com', details: 'Le gustan los gatos y programar.' },
    2: { name: 'Bob (Admin)', email: 'bob@example.com', details: 'Gestiona el sistema.' },
};

const adminData = {
    totalUsers: 2,
    serverStatus: 'OK',
    lastBackup: new Date().toISOString(),
};

// Este componente es accesible por navegación directa, lo cual es la vulnerabilidad.
const AdminPanel: React.FC = () => {
    // VULNERABILIDAD: Este componente no verifica el rol del usuario. Asume que si puedes renderizarlo, tienes acceso.
    // La obtención de datos tampoco está protegida.
    return (
        <div className="mt-6 p-4 border border-red-500 rounded-lg bg-red-900/20">
            <h3 className="text-xl font-bold text-red-400">Panel de Administración (Área Sensible)</h3>
            <p className="text-sm text-red-300 mb-4">Este panel solo debería ser accesible para administradores.</p>
            <div className="space-y-2">
                <p><strong>Total de Usuarios:</strong> {adminData.totalUsers}</p>
                <p><strong>Estado del Servidor:</strong> <span className="text-green-400">{adminData.serverStatus}</span></p>
                <p><strong>Última Copia de Seguridad:</strong> {adminData.lastBackup}</p>
            </div>
        </div>
    );
};


const A01_BrokenAccessControl: React.FC = () => {
    const auth = useContext(AuthContext) as AuthContextType;
    const [view, setView] = useState<'profile' | 'admin'>('profile');
    const [userId, setUserId] = useState(1);

    const userProfile = userProfiles[userId as keyof typeof userProfiles] || userProfiles[1];

    return (
        <div>
            <h2 className="text-2xl font-bold text-accent mb-2">A01: Control de Acceso Roto</h2>
            <p className="text-text-secondary mb-6">Escenario: Un atacante puede acceder a funcionalidades o datos para los que no está autorizado manipulando URLs o parámetros.</p>

            <div className="bg-primary p-6 rounded-lg shadow-lg border border-border-color">
                <h3 className="text-xl font-bold mb-4">Panel de Usuario</h3>
                <p className="mb-4">Has iniciado sesión como: <span className="font-mono text-accent">{auth.user ? `${auth.user.username} (rol: ${auth.user.role})` : 'Invitado'}</span></p>
                
                <div className="flex space-x-4 mb-6">
                     <button onClick={() => setView('profile')} className={`px-4 py-2 rounded ${view === 'profile' ? 'bg-accent text-white' : 'bg-secondary'}`}>Mi Perfil</button>
                    {/* Control de acceso a nivel de UI: este botón se oculta para no administradores. */}
                    {auth.user?.role === 'admin' && (
                         <button onClick={() => setView('admin')} className={`px-4 py-2 rounded ${view === 'admin' ? 'bg-accent text-white' : 'bg-secondary'}`}>Panel Admin (UI Protegida)</button>
                    )}
                     <button onClick={() => setView('admin')} className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white">Panel Admin (Navegación Forzada)</button>
                </div>

                <div className="border-t border-border-color pt-4">
                    {view === 'profile' && (
                        <div>
                            <h4 className="text-lg font-bold mb-2">Viendo Perfil de Usuario</h4>
                            <div className="flex items-center space-x-2 mb-4">
                                <label htmlFor="userId">Ver perfil del ID de Usuario:</label>
                                <input 
                                    type="number" 
                                    id="userId"
                                    value={userId}
                                    onChange={(e) => setUserId(parseInt(e.target.value, 10))}
                                    className="bg-secondary p-2 rounded w-20 border border-border-color"
                                    min="1"
                                    max="2"
                                />
                            </div>
                            <div className="p-4 bg-secondary rounded">
                                <p><strong>Nombre:</strong> {userProfile.name}</p>
                                <p><strong>Email:</strong> {userProfile.email}</p>
                                <p><strong>Detalles:</strong> {userProfile.details}</p>
                            </div>
                        </div>
                    )}
                    {view === 'admin' && <AdminPanel />}
                </div>
            </div>
        </div>
    );
};

export default A01_BrokenAccessControl;