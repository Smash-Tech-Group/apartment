import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, login, register, logout, refreshToken, getRefreshTokenCookie } from '../lib/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const rt = getRefreshTokenCookie();
            if (rt) {
                try {
                    await refreshToken();
                    const userData = await getCurrentUser();
                    // Assumes the backend returns { success: true, data: { ...user fields } }
                    setUser(userData?.data || userData);
                } catch (e) {
                    // Remain unauthenticated silently
                    console.error("Silent auth failed");
                }
            }
            setLoading(false);
        };
        initAuth();

        // Listen to custom logout events
        const handleAuthClear = () => setUser(null);
        window.addEventListener('auth:clear', handleAuthClear);
        return () => window.removeEventListener('auth:clear', handleAuthClear);
    }, []);

    const loginUser = async (credentials) => {
        const res = await login(credentials);
        const userData = await getCurrentUser();
        setUser(userData?.data || userData);
        return res;
    };

    const registerUser = async (userData) => {
        const res = await register(userData);
        const userRes = await getCurrentUser();
        setUser(userRes?.data || userRes);
        return res;
    };

    const logoutUser = async () => {
        await logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, loginUser, registerUser, logoutUser, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
