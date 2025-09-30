import type { ReactNode } from "react";
import { AuthContextProvider } from "./authContext"
import { ExpenseContextProvider } from "./expenseContext";

const ContextProvider=({children}:{children:ReactNode})=> {
  return (
    <AuthContextProvider>
      <ExpenseContextProvider>
        {children}
      </ExpenseContextProvider>
    </AuthContextProvider>
  )
}

export default ContextProvider;