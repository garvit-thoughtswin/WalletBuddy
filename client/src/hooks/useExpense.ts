import type { IExpenseFormValues, IExpenseFormValuesWithoutID } from "../types/form";
import { addExpenseService, deleteExpenseService, getExpensesService, updateExpenseService } from "../services/expenseService";
import { useContext} from "react";
import { ExpenseContext } from "../context/expenseContext";

export const useExpense = () => {

    const {setExpenses} = useContext(ExpenseContext)

    const addExpense = async (data: IExpenseFormValuesWithoutID):Promise<IExpenseFormValues>=> {
        try {
            const res = await addExpenseService(data);
            console.log("Expense added:", res);
            return res;
        }
        catch (err) {
            throw err;
        }
    };

    const getExpenses = async () => {
        try {
            const res = await getExpensesService();
            setExpenses(res);
            return res;
        } catch (err) {
            throw err;
        }
    };

    const updateExpense = async (expenseId: number, data: IExpenseFormValuesWithoutID) => {
        try {
            const res = await updateExpenseService(expenseId, data);
            return res;
        } catch (err) {
            throw err;
        }
    }

    const deleteExpenseByID = async (expenseId: number) => {
        try {
            const res = await deleteExpenseService(expenseId);
            return res;
        } catch (err) {
            throw err;
        }
    };

    return { addExpense, getExpenses, updateExpense, deleteExpenseByID };
};