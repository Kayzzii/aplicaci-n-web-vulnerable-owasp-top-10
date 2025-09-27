import React, { useState } from 'react';

// Este componente simula una librería de gráficos vulnerable.
const VulnerableChartingLibrary: React.FC<{ title: string }> = ({ title }) => {
    // VULNERABILIDAD: La "librería" toma un título y lo renderiza sin sanitizarlo.
    return (
        <div className="p-4 border-2 border-dashed border-border-color rounded-lg text-center">
            <h3 className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{ __html: title }} />
            <div className="h-40 bg-secondary flex items-center justify-center">
                <p className="text-text-secondary">[Aquí se renderizaría el gráfico]</p>
            </div>
        </div>
    );
};

const A06_VulnerableComponents: React.FC = () => {
    const [chartTitle, setChartTitle] = useState('Informe de Ventas Mensual');

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
                </div>
                
                <div className="mt-6">
                    <h4 className="font-bold mb-2">Informe Generado:</h4>
                    <VulnerableChartingLibrary title={chartTitle} />
                </div>
            </div>
        </div>
    );
};

export default A06_VulnerableComponents;