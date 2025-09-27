<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🛡️ Aplicación Web Vulnerable - OWASP Top 10

Esta es una aplicación educativa que simula las 10 vulnerabilidades más críticas de seguridad web según OWASP.

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
│   └── A10_ServerSideRequestForgery.tsx
├── App.tsx
├── index.tsx
└── package.json
```

## 🚀 Cómo ejecutar

```bash
npm install
npm run dev
```

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
