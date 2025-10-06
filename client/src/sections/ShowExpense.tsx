import { useContext, useEffect, useState } from 'react'
import { ExpenseContext } from '../context/expenseContext'
import { useExpense } from '../hooks/useExpense';
import ExpenseCard from '../components/ExpenseCard';
import { get_categories } from '../services/categoryService';

function ShowExpense() {
    const { expenses } = useContext(ExpenseContext)
    const { getExpenses } = useExpense();
    const [categories,setCategories] = useState([])

    useEffect(() => {
        async function fetchExpenses() {
            try {
                await getExpenses();
                const data = await get_categories()
                setCategories(data)
            } catch (error) {
                console.error('Error logging expenses:', error)
            }
        }
        fetchExpenses();
    }, [])

    return (
        <div className='mt-20'>
            {expenses && expenses.map((expense, index) => (
                <ExpenseCard key={index} title={expense.title} amount={expense.amount} expenseId={expense!.id} createdAt={expense.created_at} date={expense.date} category_name={expense.category_name} category_id={expense.category_id} />
            ))}
            {!expenses || expenses.length === 0 && <p className='text-center font-bold'>No expenses to show.</p>}
        </div>
    )
}

export default ShowExpense
