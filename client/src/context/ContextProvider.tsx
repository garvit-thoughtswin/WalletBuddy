import type { ReactNode } from "react";
import { AuthContextProvider } from "./authContext"

const ContextProvider=({children}:{children:ReactNode})=> {
  return (
    <AuthContextProvider>
        {children}
    </AuthContextProvider>
  )
}

export default ContextProvider;