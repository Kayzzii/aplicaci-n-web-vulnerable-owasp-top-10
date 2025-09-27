import React, { useState, useEffect } from 'react';

const A02_CryptographicFailures: React.FC = () => {
    const [apiKey, setApiKey] = useState('');
    const [savedKey, setSavedKey] = useState<string | null>(null);

    useEffect(() => {
        // VULNERABILIDAD: Recuperando datos sensibles almacenados en texto plano desde localStorage al montar el componente.
        const storedKey = localStorage.getItem('user_api_key');
        if (storedKey) {
            setSavedKey(storedKey);
        }
    }, []);

    const handleSaveKey = () => {
        // VULNERABILIDAD: Almacenando datos sensibles en texto plano en localStorage.
        localStorage.setItem('user_api_key', apiKey);
        setSavedKey(apiKey);
        alert('¡Clave API guardada!');
    };
    
    const handleClearKey = () => {
        localStorage.removeItem('user_api_key');
        setSavedKey(null);
        setApiKey('');
        alert('Clave API eliminada de localStorage.');
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-accent mb-2">A02: Fallos Criptográficos</h2>
            <p className="text-text-secondary mb-6">Escenario: Datos sensibles se almacenan o transmiten en texto plano, haciéndolos vulnerables a la exposición.</p>

            <div className="bg-primary p-6 rounded-lg shadow-lg border border-border-color">
                <h3 className="text-xl font-bold mb-4">Gestión de Clave API</h3>
                <p className="mb-4">Introduce una clave API secreta para guardarla en tu navegador por "conveniencia".</p>
                
                <div className="flex items-center space-x-4 mb-6">
                    <input 
                        type="text" 
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="pega-tu-clave-secreta-aqui"
                        className="flex-grow bg-secondary p-2 rounded border border-border-color focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <button onClick={handleSaveKey} className="bg-accent hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors">
                        Guardar Clave
                    </button>
                    <button onClick={handleClearKey} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors">
                        Limpiar Clave
                    </button>
                </div>

                {savedKey && (
                    <div className="p-4 bg-secondary rounded border border-yellow-500">
                        <h4 className="font-bold text-yellow-400">Clave actualmente almacenada en el navegador:</h4>
                        <p className="font-mono text-lg break-all">{savedKey}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default A02_CryptographicFailures;