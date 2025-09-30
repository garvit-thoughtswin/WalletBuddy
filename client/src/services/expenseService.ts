import type { IExpenseFormValues, IExpenseFormValuesWithoutID } from "../types/form";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const addExpenseService = async (data: IExpenseFormValuesWithoutID): Promise<IExpenseFormValues> => {
    const response = await fetch(`${BACKEND_URL}/expenses`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to add expense');
    }
    const result = await response.json();
    return result;
};

const getExpensesService = async (): Promise<IExpenseFormValues[]> => {
    const response = await fetch(`${BACKEND_URL}/expenses`, {
        method: 'GET',  
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch expenses');
    }
    const result = await response.json();
    return result;
};

const deleteExpenseService = async (expenseId: number): Promise<{ message: string }> => {
    const response = await fetch(`${BACKEND_URL}/expenses/${expenseId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to delete expense');
    }
    return { message: 'Expense deleted successfully' };
};

export { addExpenseService, getExpensesService, deleteExpenseService };