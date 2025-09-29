import type { ReactNode, Dispatch, SetStateAction } from "react";
import { createContext, useState } from "react";

type AuthContextType = {
    token: string | null;
    setToken: Dispatch<SetStateAction<string | null>>;
};

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