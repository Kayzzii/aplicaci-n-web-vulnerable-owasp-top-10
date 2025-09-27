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
        console.log(`🚨 SSRF: Enviando URL al backend para procesar: ${imageUrl}`);

        // --- RESPUESTA SIMULADA DEL BACKEND ---
        setTimeout(() => {
            const url = imageUrl.toLowerCase();
            
            if (url.startsWith('file://')) {
                // Intentar acceso a archivos locales
                if (url.includes('/etc/passwd')) {
                    setResult({ 
                        type: 'text', 
                        data: `🚨 ARCHIVO SISTEMA ACCEDIDO 🚨\nroot:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin\nkayzzi:x:1000:1000:kayzzi,,,:/home/kayzzi:/bin/bash\nmysql:x:112:116:MySQL Server,,,:/nonexistent:/bin/false` 
                    });
                } else if (url.includes('/etc/hosts')) {
                    setResult({ 
                        type: 'text', 
                        data: '🚨 ARCHIVO HOSTS ACCEDIDO 🚨\n127.0.0.1\tlocalhost\n127.0.1.1\tvulnerable-server\n10.0.0.1\tinternal-database\n10.0.0.2\tinternal-admin-panel\n192.168.1.100\tdev-server' 
                    });
                } else {
                    setResult({ 
                        type: 'error', 
                        data: `🚨 ACCESO DENEGADO: ${imageUrl}\nError: El firewall del backend bloqueó la solicitud al sistema de archivos local.` 
                    });
                }
            } else if (url.includes('127.0.0.1') || url.includes('localhost')) {
                // Simular acceso a servicios internos localhost
                if (url.includes(':22')) {
                    setResult({ 
                        type: 'text', 
                        data: '🚨 SSH SERVICE DETECTED 🚨\nSSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.5\nService: SSH Server\nStatus: Running\nVersion: OpenSSH_8.2p1' 
                    });
                } else if (url.includes(':3306')) {
                    setResult({ 
                        type: 'text', 
                        data: '🚨 MYSQL DATABASE DETECTED 🚨\nMySQL Server 8.0.33-0ubuntu0.20.04.2\nDatabases: users, orders, payments, admin_panel\nStatus: Running\nAccess: INTERNAL ONLY' 
                    });
                } else if (url.includes(':6379')) {
                    setResult({ 
                        type: 'text', 
                        data: '🚨 REDIS CACHE DETECTED 🚨\nRedis server v=6.0.16\nConnected clients: 2\nUsed memory: 1.2M\nKeys: admin_session, user_tokens, cache_data' 
                    });
                } else {
                    setResult({ 
                        type: 'text', 
                        data: '🚨 SERVICIO INTERNO ACCEDIDO 🚨\n{"status": "OK", "service": "internal-metadata-service", "version": "1.2.0", "endpoints": ["/admin", "/users", "/config"], "internal_ip": "127.0.0.1", "sensitive_data": "admin_token_xyz123"}' 
                    });
                }
            } else if (url.includes('10.0.0.') || url.includes('192.168.') || url.includes('172.16.')) {
                // Red interna
                if (url.includes('admin')) {
                    setResult({ 
                        type: 'text', 
                        data: '🚨 PANEL ADMIN INTERNO ENCONTRADO 🚨\n<!DOCTYPE html>\n<html><head><title>Admin Panel - INTERNAL ACCESS ONLY</title></head>\n<body><h1>Internal Admin Dashboard</h1>\n<p>Users: 1,337 | Active Sessions: 42</p>\n<p>System Status: OPERATIONAL</p>\n<a href="/admin/users">User Management</a>\n<a href="/admin/logs">System Logs</a></body></html>' 
                    });
                } else {
                    setResult({ 
                        type: 'text', 
                        data: '🚨 RED INTERNA ESCANEADA 🚨\nHost: ' + imageUrl + '\nStatus: REACHABLE\nServices: HTTP (80), HTTPS (443), SSH (22)\nOS: Ubuntu Server 20.04\nLast seen: 2025-09-27 10:30:00' 
                    });
                }
            } else if (url.includes('169.254.169.254')) {
                // AWS Metadata service
                setResult({ 
                    type: 'text', 
                    data: '🚨 AWS METADATA SERVICE ACCEDIDO 🚨\n{\n  "instance-id": "i-1234567890abcdef0",\n  "instance-type": "t3.medium",\n  "local-ipv4": "10.0.1.23",\n  "public-ipv4": "203.0.113.45",\n  "security-groups": "web-server-sg",\n  "iam": {\n    "credentials": {\n      "AccessKeyId": "AKIAI44QH8DHBEXAMPLE",\n      "SecretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",\n      "Token": "token"\n    }\n  }\n}' 
                });
            } else if (url.startsWith('http://') || url.startsWith('https://')) {
                // URLs externas válidas
                if (url.includes('picsum.photos') || url.includes('.jpg') || url.includes('.png') || url.includes('.gif')) {
                    setResult({ type: 'image', data: imageUrl });
                } else {
                    setResult({ 
                        type: 'text', 
                        data: `🌐 RECURSO EXTERNO OBTENIDO\nURL: ${imageUrl}\nResponse: 200 OK\nContent-Type: text/html\nServer Response: [Contenido web externo simulado]` 
                    });
                }
            } else {
                setResult({ 
                    type: 'error', 
                    data: '❌ FORMATO DE URL INVÁLIDO\nProporciona una URL completa (http://, https://, file://, etc.)' 
                });
            }
            setIsLoading(false);
        }, 1500);
    };

    const predefinedUrls = [
        { label: '🖼️ Imagen válida', url: 'https://picsum.photos/400/200', danger: 'safe' },
        { label: '🏠 Localhost', url: 'http://127.0.0.1/', danger: 'medium' },
        { label: '🔍 Metadata Service', url: 'http://169.254.169.254/latest/meta-data/', danger: 'high' },
        { label: '💾 Archivo /etc/passwd', url: 'file:///etc/passwd', danger: 'critical' },
        { label: '🌐 Hosts internos', url: 'file:///etc/hosts', danger: 'critical' },
        { label: '🗄️ MySQL interno', url: 'http://127.0.0.1:3306/', danger: 'high' },
        { label: '🔧 Admin interno', url: 'http://192.168.1.100/admin', danger: 'critical' },
        { label: '🔑 Redis Cache', url: 'http://127.0.0.1:6379/', danger: 'high' },
    ];

    const getDangerColor = (danger: string) => {
        switch (danger) {
            case 'safe': return 'bg-green-600 hover:bg-green-700';
            case 'medium': return 'bg-yellow-600 hover:bg-yellow-700';
            case 'high': return 'bg-orange-600 hover:bg-orange-700';
            case 'critical': return 'bg-red-600 hover:bg-red-700 animate-pulse';
            default: return 'bg-gray-600 hover:bg-gray-700';
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-accent mb-2">A10: Server-Side Request Forgery (SSRF)</h2>
            <p className="text-text-secondary mb-6">Escenario: Una función que obtiene un recurso desde una URL proporcionada por el usuario puede ser manipulada para hacer que el servidor se conecte a servicios internos o lea archivos locales.</p>

            <div className="bg-primary p-6 rounded-lg shadow-lg border border-border-color">
                <div className="mb-4 p-4 rounded-lg bg-red-900/50 border border-red-500 text-red-300">
                    <p><strong className="font-bold">⚠️ VULNERABILIDAD SSRF:</strong> El servidor procesará cualquier URL sin validación.</p>
                    <p><strong>Riesgo:</strong> Acceso a servicios internos, archivos del sistema, metadata de cloud, escaneo de red.</p>
                </div>

                <h3 className="text-xl font-bold mb-4">🌐 Importar Imagen desde URL</h3>
                <p className="mb-4">Introduce una URL y nuestro servidor la obtendrá por ti.</p>
                
                <div className="mb-4">
                    <label htmlFor="imageUrl" className="block mb-2 font-bold">URL del recurso:</label>
                    <input 
                        id="imageUrl"
                        type="text" 
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Introduce la URL del recurso..."
                        className="w-full bg-secondary p-3 rounded border border-border-color focus:outline-none focus:ring-2 focus:ring-accent font-mono"
                        onKeyPress={(e) => e.key === 'Enter' && handleFetch()}
                    />
                </div>

                <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-2">URLs de ejemplo (⚠️ Payloads SSRF):</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {predefinedUrls.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => setImageUrl(item.url)}
                                className={`text-xs px-3 py-2 rounded text-white transition-all ${getDangerColor(item.danger)}`}
                                title={`Peligrosidad: ${item.danger.toUpperCase()}`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={handleFetch} 
                    disabled={isLoading || !imageUrl.trim()} 
                    className="w-full bg-accent hover:bg-blue-600 disabled:bg-gray-500 text-white font-bold py-3 px-4 rounded transition-colors mb-4"
                >
                    {isLoading ? '🔄 Obteniendo Recurso...' : '🚀 EJECUTAR SSRF'}
                </button>

                {result && (
                    <div className="p-4 bg-secondary rounded border border-border-color">
                        <h4 className="font-bold mb-2">📡 Recurso Obtenido por el Servidor:</h4>
                        {result.type === 'image' && (
                            <div>
                                <p className="text-green-400 mb-2">✅ Imagen cargada exitosamente</p>
                                <img src={result.data} alt="Contenido obtenido" className="max-w-full rounded border border-gray-600" />
                            </div>
                        )}
                        {result.type === 'text' && (
                            <div>
                                <div className="mb-2 px-3 py-1 bg-orange-600 text-white text-sm rounded inline-block">
                                    🚨 INFORMACIÓN SENSIBLE EXPUESTA
                                </div>
                                <pre className="bg-black border border-green-500 p-4 rounded text-green-300 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
                                    {result.data}
                                </pre>
                            </div>
                        )}
                        {result.type === 'error' && (
                            <div className="text-red-400 bg-red-900/30 border border-red-500 p-3 rounded">
                                <strong>⚠️ Error:</strong> {result.data}
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-6 p-4 bg-gray-800 rounded border border-gray-600">
                    <h4 className="font-bold mb-2 text-red-300">🎯 Técnicas de SSRF Comunes:</h4>
                    <div className="text-sm space-y-2">
                        <div className="p-2 bg-gray-900 rounded">
                            <p className="text-yellow-300 font-semibold">AWS Metadata:</p>
                            <code className="text-green-300 font-mono text-xs">http://169.254.169.254/latest/meta-data/</code>
                        </div>
                        <div className="p-2 bg-gray-900 rounded">
                            <p className="text-yellow-300 font-semibold">Servicios Internos:</p>
                            <code className="text-green-300 font-mono text-xs">http://127.0.0.1:8080/admin</code>
                        </div>
                        <div className="p-2 bg-gray-900 rounded">
                            <p className="text-yellow-300 font-semibold">Archivos Locales:</p>
                            <code className="text-green-300 font-mono text-xs">file:///etc/passwd</code>
                        </div>
                        <div className="p-2 bg-gray-900 rounded">
                            <p className="text-yellow-300 font-semibold">Red Interna:</p>
                            <code className="text-green-300 font-mono text-xs">http://192.168.1.1/admin</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default A10_ServerSideRequestForgery;