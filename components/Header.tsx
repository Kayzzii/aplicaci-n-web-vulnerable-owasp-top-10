import React, { useContext } from 'react';
import { AuthContext } from '../App';
import type { AuthContextType } from '../types';

const Header: React.FC = () => {
    const auth = useContext(AuthContext) as AuthContextType;

    return (
        <header className="bg-primary border-b border-border-color p-4 flex justify-between items-center z-10">
            <h1 className="text-xl font-bold text-text-primary">Aplicación Web Vulnerable OWASP Top 10</h1>
            <div className="flex items-center space-x-4">
                {auth.user ? (
                    <>
                        <span className="text-text-secondary">
                            Conectado como: <span className="font-bold text-accent">{auth.user.username} ({auth.user.role})</span>
                        </span>
                        <button
                            onClick={auth.logout}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                        >
                            Cerrar Sesión
                        </button>
                    </>
                ) : (
                    <span className="text-text-secondary">No has iniciado sesión</span>
                )}
            </div>
        </header>
    );
};

export default Header;