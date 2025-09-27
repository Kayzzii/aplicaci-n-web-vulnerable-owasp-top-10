
export interface OwaspItem {
    id: string;
    title: string;
    category: string;
}

export interface User {
    id: number;
    username: string;
    role: 'user' | 'admin';
}

export interface AuthContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}
