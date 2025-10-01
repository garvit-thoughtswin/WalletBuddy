import { useState } from "react";
import DeleteExpenseBtn from "./DeleteExpenseBtn"
import EditExpenseBtn from "./EditExpenseBtn"
import EditTrueBtn from "./EditTrueBtn";
import EditFalseBtn from "./EditFalseBtn";
import { useExpense } from "../hooks/useExpense";

function ExpenseCard({ title, amount, expenseId, createdAt }: { title: string, amount: number, expenseId: number, createdAt: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [expenseObj, setExpenseObj] = useState({ title, amount });

  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB");

  const { updateExpense, getExpenses } = useExpense();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExpenseObj(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateExpense(expenseId, expenseObj);
      setIsEditing(false)
      getExpenses()
    } catch (error) {
      console.error("Error updating expense:", error);
    }
    setIsEditing(false)
  };

  return (
    <div className='p-3 md:p-0 mb-4 border-b last:border-0 max-w-xl mx-auto flex flex-row justify-between'>
      {
        isEditing ? (
          <form className="w-full flex flex-row justify-between" onSubmit={handleSubmit}>
            <input
              type="text"
              defaultValue={title}
              className="w-[50%] outline-none "
              onChange={handleChange}
              value={expenseObj.title}
              name="title"
              autoFocus
            />{" "}
            <input
              type="number"
              defaultValue={amount}
              className="w-[30%]"
              onChange={handleChange}
              value={expenseObj.amount}
              name="amount"
            />  {" "}
            <EditTrueBtn />
            <EditFalseBtn onclick={() => { setIsEditing(false) }} />
          </form>
        ) : <>
          <h3 className='font-bold w-[50%]'>{title}</h3>
          <p className="w-[30%]">{amount} Rs.</p>
          <EditExpenseBtn onclick={() => setIsEditing(true)} />
          <DeleteExpenseBtn expenseId={expenseId} />
        </>
      }

    </div>
  )
}

export default ExpenseCard
