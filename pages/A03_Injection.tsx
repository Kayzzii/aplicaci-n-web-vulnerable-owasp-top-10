import React, { useState, useEffect } from 'react';

const A03_Injection: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [result, setResult] = useState('');
    const [executedScript, setExecutedScript] = useState('');

    const handleSearch = () => {
        // VULNERABILIDAD: El término de búsqueda se incrusta directamente en la salida HTML sin sanitización.
        // Este es un ejemplo clásico de Cross-Site Scripting (XSS) basado en DOM.
        const resultHtml = `No se encontraron resultados para: <strong>${searchTerm}</strong>`;
        setResult(resultHtml);
        
        // Simular la ejecución de scripts maliciosos
        if (searchTerm.includes('<script>')) {
            const scriptMatch = searchTerm.match(/<script>(.*?)<\/script>/i);
            if (scriptMatch && scriptMatch[1]) {
                try {
                    // PELIGROSO: Ejecutamos el script directamente
                    eval(scriptMatch[1]);
                    setExecutedScript(scriptMatch[1]);
                } catch (e) {
                    setExecutedScript(`Error ejecutando: ${scriptMatch[1]}`);
                }
            }
        } else {
            setExecutedScript('');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-accent mb-2">A03: Inyección (XSS basado en DOM)</h2>
            <p className="text-text-secondary mb-6">Escenario: Los datos proporcionados por el usuario no se validan ni sanean y se procesan de una manera que permite a un atacante ejecutar scripts maliciosos en el navegador del usuario.</p>

            <div className="bg-primary p-6 rounded-lg shadow-lg border border-border-color">
                <h3 className="text-xl font-bold mb-4">Función de Búsqueda Vulnerable</h3>
                
                <div className="flex items-center space-x-4 mb-4">
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Introduce el término de búsqueda..."
                        className="flex-grow bg-secondary p-2 rounded border border-border-color focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <button onClick={handleSearch} className="bg-accent hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors">
                        Buscar
                    </button>
                </div>

                {result && (
                    <div className="p-4 bg-secondary rounded border border-border-color">
                        <h4 className="font-bold mb-2">Resultados de la Búsqueda:</h4>
                        {/* La parte peligrosa está aquí */}
                        <div dangerouslySetInnerHTML={{ __html: result }} />
                        
                        {executedScript && (
                            <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded">
                                <h5 className="text-red-300 font-bold">⚠️ Script Ejecutado:</h5>
                                <code className="text-red-200 text-sm">{executedScript}</code>
                            </div>
                        )}
                    </div>
                )}
                
                <div className="mt-6 p-4 bg-gray-800 rounded border border-gray-600">
                    <h4 className="font-bold mb-2 text-yellow-300">💡 Ejemplos de Payloads XSS:</h4>
                    <div className="text-sm space-y-2">
                        <div className="p-2 bg-gray-900 rounded font-mono text-green-300">
                            &lt;script&gt;alert('¡XSS Funciona!')&lt;/script&gt;
                        </div>
                        <div className="p-2 bg-gray-900 rounded font-mono text-green-300">
                            &lt;script&gt;document.body.style.backgroundColor='red'&lt;/script&gt;
                        </div>
                        <div className="p-2 bg-gray-900 rounded font-mono text-green-300">
                            &lt;img src=x onerror="alert('¡Librería vulnerable explotada!')"&gt;
                        </div>
                        <div className="p-2 bg-gray-900 rounded font-mono text-green-300">
                            &lt;script&gt;fetch('/admin/users').then(r=&gt;alert('Datos robados'))&lt;/script&gt;
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default A03_Injection;