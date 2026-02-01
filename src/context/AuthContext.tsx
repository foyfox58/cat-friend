import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    name: string;
    email: string;
    avatar?: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => void;
    logout: () => void;
    updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const login = (email: string, password: string) => {
        // Simulate login - in real app, this would call an API
        console.log('Logging in with:', email, password);

        // Set user data - MOCK USER
        setUser({
            name: 'Moodeng ja',
            email: email,
            avatar: '/moodeng.jpg'
        });
        setIsLoggedIn(true);
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
    };

    const updateUser = (data: Partial<User>) => {
        if (user) {
            setUser({ ...user, ...data });
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
