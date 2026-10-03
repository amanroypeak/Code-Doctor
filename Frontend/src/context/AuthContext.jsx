import { createContext, useState } from "react";
import { loginUser, registerUser } from "../api.js";

export const AuthContext = createContext(null);

const getSavedUser = () => {

    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
        return null;
    }

    try {
        const parsedUser = JSON.parse(savedUser);
        return parsedUser;
    } catch (error) {
        return null;
    }
};

export function AuthProvider({ children }) {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(getSavedUser());

    const saveLogin = (data) => {

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setToken(data.token);
        setUser(data.user);
    };

    const login = async (credentials) => {

        const data = await loginUser(credentials);

        saveLogin(data);
    };

    const register = async (userDetails) => {

        const data = await registerUser(userDetails);

        saveLogin(data);
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    };

    const value = {
        user: user,
        token: token,
        login: login,
        register: register,
        logout: logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}