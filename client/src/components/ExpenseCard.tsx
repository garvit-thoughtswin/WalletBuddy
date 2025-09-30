import DeleteExpense from "./DeleteExpense"

function ExpenseCard({ title, amount, expenseId }: { title: string, amount: number, expenseId: number }) {
  return (
    <div className='p-3 md:p-2 mb-4 border-b last:border-0 max-w-xl mx-auto flex md:flex-row flex-col justify-between'>
      <h3 className='font-bold w-[50%]'>{title}</h3>
      <p>{amount} Rs.</p>
      <DeleteExpense expenseId={expenseId} />
    </div>
  )
}

export default ExpenseCard
