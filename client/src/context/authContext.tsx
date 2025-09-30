import type { ReactNode } from "react";
import { createContext, useState } from "react";
import type { AuthContextType } from "../types/form";


const AuthContext = createContext<AuthContextType>({
    token: null,
    setToken: () => {},
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}
export { AuthContext, AuthContextProvider }