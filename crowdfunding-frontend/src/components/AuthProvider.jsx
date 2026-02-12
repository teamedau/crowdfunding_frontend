import { createContext, useState } from "react";
export const AuthContext = createContext();
export const AuthProvider = (props) => {
    const [auth, setAuth] = useState({
        token: window.localStorage.getItem("token") || null,
        user_id: window.localStorage.getItem("user_id") ? parseInt(window.localStorage.getItem("user_id")) : null,
        username: window.localStorage.getItem("username") || null,
    });
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {props.children}
        </AuthContext.Provider>
    );
};