import { MdDelete } from "react-icons/md";
import { useExpense } from "../hooks/useExpense";

function DeleteExpense({ expenseId }: { expenseId: number }) {

  const { deleteExpenseByID, getExpenses } = useExpense();

  const handleDelete = async () => {
    try {
      await deleteExpenseByID(expenseId);
      await getExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
      <button onClick={() => handleDelete()}>
        <MdDelete className="text-red-500 hover:text-red-700 cursor-pointer" size={30} />
      </button>
  )
}

export default DeleteExpense
