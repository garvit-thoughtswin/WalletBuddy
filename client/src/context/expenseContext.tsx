import { createContext, useState, type ReactNode } from "react";
import type { ExpenseContextType, IExpenseFormValues } from "../types/form";

const ExpenseContext = createContext<ExpenseContextType>({
    expenses: [],
    setExpenses: () => {},
});

const ExpenseContextProvider = ({ children }: { children: ReactNode }) => {
    const [expenses, setExpenses] = useState<IExpenseFormValues[]>([]);

    return (
        <ExpenseContext.Provider value={{ expenses, setExpenses }}>
            {children}
        </ExpenseContext.Provider>
    );
};
export { ExpenseContext, ExpenseContextProvider };