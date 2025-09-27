const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist')); // Servir archivos estáticos

// ⚠️ VULNERABILIDAD CRÍTICA: Ejecución directa de comandos
app.post('/api/execute-command', (req, res) => {
    const { command } = req.body;
    
    if (!command) {
        return res.status(400).json({ error: 'No command provided' });
    }

    console.log(`🚨 EXECUTING COMMAND: ${command}`);
    
    // PELIGRO: Ejecutar comando directamente sin sanitización
    // IMPORTANTE: Usar bash explícitamente para comandos con /dev/tcp
    const shellCommand = command.includes('/dev/tcp') || command.includes('>&') 
        ? `/bin/bash -c "${command}"` 
        : command;
    
    exec(shellCommand, { timeout: 10000, shell: '/bin/bash' }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error ejecutando comando: ${error.message}`);
            return res.json({ 
                error: error.message,
                stderr: stderr,
                output: `Error: ${error.message}${stderr ? '\n' + stderr : ''}`
            });
        }
        
        const output = stdout || stderr || 'Comando ejecutado sin salida';
        console.log(`Output: ${output}`);
        
        res.json({ 
            success: true,
            output: output,
            command: command
        });
    });
});

// Endpoint para verificar que el servidor está funcionando
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend vulnerable funcionando' });
});

// Servir la aplicación React en la ruta raíz
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚨 SERVIDOR VULNERABLE ejecutándose en http://0.0.0.0:${PORT}`);
    console.log(`⚠️  PELIGRO: Este servidor ejecuta comandos arbitrarios`);
    console.log(`🔥 Command Injection endpoint: POST /api/execute-command`);
});