import React, { useState } from 'react';

// Simulación de datos de configuración sensibles que nunca deberían ser expuestos.
const sensitiveConfig = {
    "database": {
        "type": "postgres",
        "connection_string": "postgres://admin:S3cr3tP@ssw0rd!@db.internal:5432/prod_db",
        "pool_size": 20
    },
    "api_keys": {
        "stripe_secret": "sk_test_51...AbCdEfG",
        "sendgrid_key": "SG.xxxxxxxx.yyyyyyyy"
    },
    "server_info": {
        "debug_mode": true,
        "log_level": "verbose",
        "error_stack_traces": true
    }
};

const A05_SecurityMisconfiguration: React.FC = () => {
    const [configData, setConfigData] = useState<object | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchConfig = () => {
        setIsLoading(true);
        // VULNERABILIDAD: Simulando una llamada a un endpoint no protegido que
        // devuelve información de configuración sensible. Esto podría ser una carpeta .git expuesta,
        // un bucket S3 público, o un endpoint de depuración dejado abierto.
        setTimeout(() => {
            setConfigData(sensitiveConfig);
            setIsLoading(false);
        }, 1000); // Simular retraso de red
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-accent mb-2">A05: Configuración de Seguridad Incorrecta</h2>
            <p className="text-text-secondary mb-6">Escenario: Un archivo de configuración interno o un endpoint de depuración es expuesto accidentalmente al público, filtrando información sensible.</p>

            <div className="bg-primary p-6 rounded-lg shadow-lg border border-border-color">
                <h3 className="text-xl font-bold mb-4">Diagnóstico del Sistema</h3>
                <p className="mb-4">Haz clic en el botón para obtener la configuración de diagnóstico del servidor.</p>
                
                <button onClick={fetchConfig} disabled={isLoading} className="bg-accent hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors disabled:bg-gray-500">
                    {isLoading ? 'Cargando...' : 'Obtener /.env.debug'}
                </button>

                {configData && (
                    <div className="mt-6 p-4 bg-secondary rounded border border-red-500">
                        <h4 className="font-bold text-red-400 mb-2">Datos de Configuración Expuestos:</h4>
                        <pre className="text-sm text-white bg-gray-900 p-4 rounded overflow-x-auto">
                            {JSON.stringify(configData, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default A05_SecurityMisconfiguration;