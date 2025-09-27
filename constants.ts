import type { OwaspItem } from './types';

export const OWASP_TOP_10: OwaspItem[] = [
    { id: 'A01', title: 'Control de Acceso Roto', category: 'A01:2021' },
    { id: 'A02', title: 'Fallos Criptográficos', category: 'A02:2021' },
    { id: 'A03', title: 'Inyección (Injection)', category: 'A03:2021' },
    { id: 'A04', title: 'Diseño Inseguro', category: 'A04:2021' },
    { id: 'A05', title: 'Configuración de Seguridad Incorrecta', category: 'A05:2021' },
    { id: 'A06', title: 'Componentes Vulnerables', category: 'A06:2021' },
    { id: 'A07', title: 'Fallas de ID y Autenticación', category: 'A07:2021' },
    { id: 'A08', title: 'Fallas de Integridad de Software', category: 'A08:2021' },
    { id: 'A09', title: 'Fallas de Registro y Monitoreo', category: 'A09:2021' },
    { id: 'A10', title: 'Server-Side Request Forgery', category: 'A10:2021' },
    { id: 'CMD', title: '💀 Command Injection (RCE)', category: 'EXTRA' },
];