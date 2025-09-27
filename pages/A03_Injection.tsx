import React, { useState } from 'react';

const A03_Injection: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [result, setResult] = useState('');

    const handleSearch = () => {
        // VULNERABILIDAD: El término de búsqueda se incrusta directamente en la salida HTML sin sanitización.
        // Este es un ejemplo clásico de Cross-Site Scripting (XSS) basado en DOM.
        setResult(`No se encontraron resultados para: <strong>${searchTerm}</strong>`);
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default A03_Injection;