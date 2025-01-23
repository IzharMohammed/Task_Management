import { onAuthStateChanged, User } from "firebase/auth";
import {  createContext, useState, ReactNode, useEffect } from "react";
import { auth, signInWithGooglePopup } from "../config/firebase-config";

interface AuthData {
    emailVerified: boolean | null;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    accessToken: string | null;
}

interface AuthContextType {
    authData: AuthData;
    logGoogleUser: () => Promise<void>;
    handleLogout: () => void;
}

const defaultAuthData: AuthData = {
    accessToken: null,
    displayName: null,
    email: null,
    emailVerified: null,
    photoURL: null,
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps { children: ReactNode }

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [authData, setAuthData] = useState<AuthData>(defaultAuthData);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
            if (user) {
                const token = await user.getIdToken();
                setAuthData({
                    accessToken: token,
                    displayName: user.displayName,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    photoURL: user.photoURL,
                });
            } else {
                setAuthData(defaultAuthData);
            }

            return () => unsubscribe();
        })
    }, [])

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
    }

    const handleLogout = () => {
        auth.signOut();
    }

    return (
        <AuthContext.Provider value={{ authData, logGoogleUser, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}
