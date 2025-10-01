import { useContext, useEffect } from 'react'
import { ExpenseContext } from '../context/expenseContext'
import { useExpense } from '../hooks/useExpense';
import ExpenseCard from '../components/ExpenseCard';

function ShowExpense() {
    const { expenses } = useContext(ExpenseContext)
    const { getExpenses } = useExpense();

    useEffect(() => {
        async function fetchExpenses() {
            try {
                await getExpenses();
                console.log('Expenses updated:', expenses)
            } catch (error) {
                console.error('Error logging expenses:', error)
            }
        }
        fetchExpenses();
    }, [])

    return (
        <div className='mt-20'>
            {expenses && expenses.map((expense, index) => (
                <ExpenseCard key={index} title={expense.title} amount={expense.amount} expenseId={expense!.id} createdAt={expense.created_at} />
            ))}
            {!expenses || expenses.length === 0 && <p className='text-center font-bold'>No expenses to show.</p>}
        </div>
    )
}

export default ShowExpense
