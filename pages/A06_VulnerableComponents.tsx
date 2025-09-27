import React, { useState, useEffect } from 'react';

// Este componente simula una librería de gráficos vulnerable.
const VulnerableChartingLibrary: React.FC<{ title: string; onExploit?: (payload: string) => void }> = ({ title, onExploit }) => {
    useEffect(() => {
        // VULNERABILIDAD: La librería ejecuta código automáticamente si encuentra ciertos patrones
        if (title.includes('<script>') || title.includes('onerror=') || title.includes('javascript:')) {
            const scriptMatch = title.match(/<script>(.*?)<\/script>/i);
            if (scriptMatch && onExploit) {
                onExploit(scriptMatch[1]);
            }
            
            // Simular ejecución de payload de imagen con onerror
            const imgMatch = title.match(/onerror=["'](.*?)["']/i);
            if (imgMatch && onExploit) {
                onExploit(imgMatch[1]);
            }
        }
    }, [title, onExploit]);
    
    // VULNERABILIDAD: La "librería" toma un título y lo renderiza sin sanitizarlo.
    return (
        <div className="p-4 border-2 border-dashed border-border-color rounded-lg text-center">
            <div className="mb-2 text-xs text-gray-400 font-mono">quick-charts.js v1.2.3 (VULNERABLE)</div>
            <h3 className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{ __html: title }} />
            <div className="h-40 bg-secondary flex items-center justify-center relative">
                <p className="text-text-secondary">[Gráfico renderizado por librería vulnerable]</p>
                <div className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" title="Indicador de vulnerabilidad"></div>
            </div>
        </div>
    );
};

const A06_VulnerableComponents: React.FC = () => {
    const [chartTitle, setChartTitle] = useState('Informe de Ventas Mensual');
    const [exploitDetected, setExploitDetected] = useState('');
    const [exploitHistory, setExploitHistory] = useState<string[]>([]);

    const handleExploit = (payload: string) => {
        setExploitDetected(payload);
        setExploitHistory(prev => [...prev, payload]);
        // Simular ejecución del payload
        try {
            eval(payload);
        } catch (e) {
            console.log('Payload ejecutado:', payload);
        }
    };

    const predefinedPayloads = [
        'Informe de Ventas Mensual',
        '<script>alert("¡Componente vulnerable explotado!")</script>',
        '<img src=x onerror="alert(\"¡Librería vulnerable explotada!\")">',
        '<script>document.body.style.backgroundColor="#ff0000"</script>',
        '<iframe src="javascript:alert(\"XSS via iframe\")"></iframe>'
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold text-accent mb-2">A06: Componentes Vulnerables y Desactualizados</h2>
            <p className="text-text-secondary mb-6">Escenario: La aplicación utiliza una librería de terceros con una vulnerabilidad conocida que un atacante puede explotar.</p>

            <div className="bg-primary p-6 rounded-lg shadow-lg border border-border-color">
                <div className="mb-4 p-4 rounded-lg bg-yellow-900/50 border border-yellow-500 text-yellow-300">
                    <p><strong className="font-bold">Alerta del Sistema:</strong> Esta página usa `quick-charts.js` versión 1.2.3.</p>
                    <p><strong>CVE-2021-1337:</strong> Esta versión es conocida por ser vulnerable a XSS Almacenado a través de la propiedad del título del gráfico.</p>
                </div>

                <h3 className="text-xl font-bold mb-4">Generador de Informes</h3>
                <div className="mb-4">
                    <label htmlFor="chartTitle" className="block mb-2 font-bold">Título del Gráfico:</label>
                    <input 
                        id="chartTitle"
                        type="text" 
                        value={chartTitle}
                        onChange={(e) => setChartTitle(e.target.value)}
                        className="w-full bg-secondary p-2 rounded border border-border-color focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    
                    <div className="mt-2">
                        <p className="text-sm text-gray-400 mb-2">Ejemplos de payloads:</p>
                        <div className="flex flex-wrap gap-2">
                            {predefinedPayloads.map((payload, index) => (
                                <button
                                    key={index}
                                    onClick={() => setChartTitle(payload)}
                                    className={`text-xs px-3 py-1 rounded ${
                                        index === 0 
                                            ? 'bg-green-600 hover:bg-green-700' 
                                            : 'bg-red-600 hover:bg-red-700'
                                    } text-white transition-colors`}
                                >
                                    {index === 0 ? '✅ Seguro' : `🔥 Exploit ${index}`}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                
                {exploitDetected && (
                    <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded">
                        <h5 className="text-red-300 font-bold">🚨 Exploit Detectado y Ejecutado:</h5>
                        <code className="text-red-200 text-sm">{exploitDetected}</code>
                    </div>
                )}
                
                <div className="mt-6">
                    <h4 className="font-bold mb-2">Informe Generado:</h4>
                    <VulnerableChartingLibrary title={chartTitle} onExploit={handleExploit} />
                </div>
                
                {exploitHistory.length > 0 && (
                    <div className="mt-4 p-3 bg-orange-900/30 border border-orange-500 rounded">
                        <h5 className="text-orange-300 font-bold mb-2">📊 Historial de Exploits:</h5>
                        <div className="text-sm space-y-1">
                            {exploitHistory.map((exploit, index) => (
                                <div key={index} className="font-mono text-orange-200">
                                    {index + 1}. {exploit}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default A06_VulnerableComponents;