import React, { useState, useCallback } from 'react';
import { OWASP_TOP_10 } from './constants';
import type { OwaspItem, User, AuthContextType } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Welcome from './components/Welcome';
import A01_BrokenAccessControl from './pages/A01_BrokenAccessControl';
import A02_CryptographicFailures from './pages/A02_CryptographicFailures';
import A03_Injection from './pages/A03_Injection';
import A04_InsecureDesign from './pages/A04_InsecureDesign';
import A05_SecurityMisconfiguration from './pages/A05_SecurityMisconfiguration';
import A06_VulnerableComponents from './pages/A06_VulnerableComponents';
import A07_IdentificationAndAuthenticationFailures from './pages/A07_IdentificationAndAuthenticationFailures';
import A08_SoftwareAndDataIntegrityFailures from './pages/A08_SoftwareAndDataIntegrityFailures';
import A09_SecurityLoggingAndMonitoringFailures from './pages/A09_SecurityLoggingAndMonitoringFailures';
import A10_ServerSideRequestForgery from './pages/A10_ServerSideRequestForgery';
import CommandInjection from './pages/CommandInjection';

export const AuthContext = React.createContext<AuthContextType | null>(null);

const App: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<OwaspItem | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const logout = useCallback(() => {
        // En una app real, invalidarías la sesión/token aquí.
        // Para esta demo, solo limpiamos el estado del usuario.
        setUser(null);
        localStorage.removeItem('userPreferences');
        console.log("Usuario desconectado. Datos de sesión limpiados del estado.");
    }, []);

    const login = useCallback((loggedInUser: User) => {
        setUser(loggedInUser);
        
        // Vulnerabilidad para A08: Almacenar datos del usuario en un formato manipulable
        const userData = { username: loggedInUser.username, role: loggedInUser.role, id: loggedInUser.id };
        const encodedData = btoa(JSON.stringify(userData));
        localStorage.setItem('userPreferences', encodedData);

    }, []);

    const renderContent = () => {
        if (!selectedItem) {
            return <Welcome />;
        }
        switch (selectedItem.id) {
            case 'A01': return <A01_BrokenAccessControl />;
            case 'A02': return <A02_CryptographicFailures />;
            case 'A03': return <A03_Injection />;
            case 'A04': return <A04_InsecureDesign />;
            case 'A05': return <A05_SecurityMisconfiguration />;
            case 'A06': return <A06_VulnerableComponents />;
            case 'A07': return <A07_IdentificationAndAuthenticationFailures />;
            case 'A08': return <A08_SoftwareAndDataIntegrityFailures />;
            case 'A09': return <A09_SecurityLoggingAndMonitoringFailures />;
            case 'A10': return <A10_ServerSideRequestForgery />;
            case 'CMD': return <CommandInjection />;
            default: return <Welcome />;
        }
    };
    
    // Intenta recargar al usuario desde un localStorage potencialmente manipulado para A08
    React.useEffect(() => {
        const storedPrefs = localStorage.getItem('userPreferences');
        if (storedPrefs && !user) {
            try {
                const decodedData = JSON.parse(atob(storedPrefs));
                if (decodedData.username && decodedData.role && decodedData.id) {
                    setUser({ id: decodedData.id, username: decodedData.username, role: decodedData.role });
                }
            } catch (e) {
                console.error("Fallo al interpretar las preferencias de usuario desde localStorage", e);
                localStorage.removeItem('userPreferences');
            }
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            <div className="flex h-screen bg-primary font-sans">
                <Sidebar items={OWASP_TOP_10} onSelectItem={setSelectedItem} selectedItem={selectedItem} />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Header />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-secondary p-8">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </AuthContext.Provider>
    );
};

export default App;