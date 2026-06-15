import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, register } from "@/integration/authIntegration";

type AuthContextData = {
    isAuthenticated: boolean;
    user: string | null;
    token: string | null;
    userId: string | null;
    isLoading: boolean;
    signIn: (username: string, password: string) => Promise<void>;
    signUp: (username: string, password: string) => Promise<void>;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            const [storageUser, storageToken, storageUserId] = await Promise.all([
                AsyncStorage.getItem('@Auth:user'),
                AsyncStorage.getItem('@Auth:token'),
                AsyncStorage.getItem('@Auth:userId'),
            ]);

            if (storageUser && storageToken && storageUserId) {
                setUser(storageUser);
                setToken(storageToken);
                setUserId(storageUserId);
                setIsAuthenticated(true);
            }
            setIsLoading(false);
        }
        loadStorageData();
    }, []);

    async function signIn(username: string, password: string) {
        const data = await login(username, password);
        setUser(username);
        setToken(data.token);
        setUserId(data.userId);
        setIsAuthenticated(true);
        await Promise.all([
            AsyncStorage.setItem('@Auth:user', username),
            AsyncStorage.setItem('@Auth:token', data.token),
            AsyncStorage.setItem('@Auth:userId', data.userId),
        ]);
    }

    async function signUp(username: string, password: string) {
        await register(username, password);
    }

    async function signOut() {
        setUser(null);
        setToken(null);
        setUserId(null);
        setIsAuthenticated(false);
        await Promise.all([
            AsyncStorage.removeItem('@Auth:user'),
            AsyncStorage.removeItem('@Auth:token'),
            AsyncStorage.removeItem('@Auth:userId'),
        ]);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, token, userId, isLoading, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
