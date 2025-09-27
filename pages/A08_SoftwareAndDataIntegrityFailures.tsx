import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../App';
import type { AuthContextType } from '../types';

const A08_SoftwareAndDataIntegrityFailures: React.FC = () => {
    const auth = useContext(AuthContext) as AuthContextType;
    const [prefs, setPrefs] = useState<string | null>(null);

    useEffect(() => {
        const storedPrefs = localStorage.getItem('userPreferences');
        setPrefs(storedPrefs);
    }, [auth.user]);

    const getDecodedData = () => {
        if (!prefs) return 'No se encontraron preferencias. Por favor, inicia sesión primero.';
        try {
            return JSON.stringify(JSON.parse(atob(prefs)), null, 2);
        } catch (e) {
            return 'Error al decodificar las preferencias. Los datos pueden estar corruptos.';
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-accent mb-2">A08: Fallas de Integridad de Software y Datos</h2>
            <p className="text-text-secondary mb-6">Escenario: La aplicación deserializa datos controlables por el usuario almacenados en el cliente sin verificaciones de integridad, permitiendo la escalada de privilegios.</p>

            <div className="bg-primary p-6 rounded-lg shadow-lg border border-border-color">
                <h3 className="text-xl font-bold mb-4">Análisis de Preferencias de Usuario</h3>
                <p className="mb-4">Después de iniciar sesión, tus datos de usuario se almacenan en `localStorage` como una cadena JSON codificada en Base64. La aplicación confía en estos datos en tu próxima visita.</p>
                
                {auth.user ? (
                     <div className="p-4 bg-green-900/50 border border-green-500 rounded">
                        <p className="text-green-300">Conectado como: <strong className="text-white">{auth.user.username}</strong> con rol: <strong className="text-white">{auth.user.role}</strong></p>
                     </div>
                ) : (
                    <div className="p-4 bg-red-900/50 border border-red-500 rounded">
                        <p className="text-red-300">No has iniciado sesión. Por favor, ve a A07 para iniciar sesión como 'user'.</p>
                    </div>
                )}
                
                <div className="mt-6">
                    <h4 className="font-bold mb-2">Datos de `localStorage` (clave `userPreferences`):</h4>
                     <pre className="text-sm text-white bg-gray-900 p-4 rounded overflow-x-auto break-all">
                        {prefs || 'No disponible'}
                    </pre>
                </div>
                 <div className="mt-6">
                    <h4 className="font-bold mb-2">Datos Decodificados:</h4>
                     <pre className="text-sm text-white bg-gray-900 p-4 rounded overflow-x-auto break-all">
                        {getDecodedData()}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default A08_SoftwareAndDataIntegrityFailures;