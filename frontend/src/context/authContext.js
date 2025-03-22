"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            if (router.pathname === '/login' || router.pathname === '/signup') {
                router.push('/chat');
            }
        } else {
            router.push('/');
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });
        if (res.ok) {
            const json = await res.json();
            const userData = { email: json.email, firstname: json.firstname, lastname: json.lastname };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } else {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Login failed');
        }
    };

    const logout = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/logout`, {
            method: 'GET',
            credentials: 'include',
        });

        if (res.ok) {
            setUser(null);
            localStorage.removeItem('user');
            router.push('/');
        } else {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Logout failed');
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);