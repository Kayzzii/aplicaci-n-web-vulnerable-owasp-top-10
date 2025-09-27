import React, { useState } from 'react';

const A10_ServerSideRequestForgery: React.FC = () => {
    const [imageUrl, setImageUrl] = useState('https://picsum.photos/400/200');
    const [result, setResult] = useState<{ type: 'image' | 'text' | 'error', data: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFetch = () => {
        setIsLoading(true);
        setResult(null);

        // VULNERABILIDAD: La aplicación toma una URL proporcionada por el usuario y la envía a un servicio de backend.
        // Un backend vulnerable obtendría esta URL sin validación, permitiendo a un atacante escanear
        // la red interna del servidor o acceder a archivos locales.
        console.log(`Enviando URL al backend para procesar: ${imageUrl}`);

        // --- RESPUESTA SIMULADA DEL BACKEND ---
        setTimeout(() => {
            if (imageUrl.startsWith('file:///')) {
                setResult({ type: 'error', data: "Error: El firewall del backend bloqueó la solicitud al sistema de archivos local." });
            } else if (imageUrl.includes('127.0.0.1') || imageUrl.includes('localhost')) {
                // Simular acceso a un servicio interno
                setResult({ type: 'text', data: '{"status": "OK", "service": "internal-metadata-service", "version": "1.2.0"}' });
            } else if (imageUrl.startsWith('http')) {
                // Simular obtención de una imagen normal
                setResult({ type: 'image', data: imageUrl });
            } else {
                 setResult({ type: 'error', data: 'Formato de URL inválido. Proporciona una URL completa.' });
            }
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-accent mb-2">A10: Server-Side Request Forgery (SSRF)</h2>
            <p className="text-text-secondary mb-6">Escenario: Una función que obtiene un recurso desde una URL proporcionada por el usuario puede ser manipulada para hacer que el servidor se conecte a servicios internos o lea archivos locales.</p>

            <div className="bg-primary p-6 rounded-lg shadow-lg border border-border-color">
                <h3 className="text-xl font-bold mb-4">Importar Imagen desde URL</h3>
                <p className="mb-4">Introduce una URL y nuestro servidor la obtendrá por ti.</p>
                
                <div className="flex items-center space-x-4 mb-6">
                    <input 
                        type="text" 
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="flex-grow bg-secondary p-2 rounded border border-border-color focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <button onClick={handleFetch} disabled={isLoading} className="bg-accent hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors disabled:bg-gray-500">
                        {isLoading ? 'Obteniendo...' : 'Obtener Recurso'}
                    </button>
                </div>

                {result && (
                    <div className="p-4 bg-secondary rounded border border-border-color">
                        <h4 className="font-bold mb-2">Recurso Obtenido por el Servidor:</h4>
                        {result.type === 'image' && <img src={result.data} alt="Contenido obtenido" className="max-w-full rounded" />}
                        {result.type === 'text' && <pre className="bg-gray-900 p-4 rounded text-white">{result.data}</pre>}
                        {result.type === 'error' && <p className="text-red-400">{result.data}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default A10_ServerSideRequestForgery;