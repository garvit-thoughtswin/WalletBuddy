import { useEffect, useState } from "react";
import DeleteExpenseBtn from "./DeleteExpenseBtn"
import EditExpenseBtn from "./EditExpenseBtn"
import EditTrueBtn from "./EditTrueBtn";
import EditFalseBtn from "./EditFalseBtn";
import { useExpense } from "../hooks/useExpense";
import { get_categories } from "../services/categoryService";

function ExpenseCard({ title, amount, expenseId, createdAt, date, category_name, category_id }: { title: string, amount: number, expenseId: number, createdAt: string, date: string, category_name: string, category_id: number }) {
  const [isEditing, setIsEditing] = useState(false);
  const [expenseObj, setExpenseObj] = useState({ title, amount, date, category_name, category_id });

  // const formattedDate = new Date(date).toLocaleDateString("en-GB");
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  const { updateExpense, getExpenses } = useExpense();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await get_categories();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExpenseObj(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExpenseObj(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Submitting updated expense:", expenseObj);
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
            <select name="category_id" className="w-[20%] outline-none" onChange={handleSelectChange} value={expenseObj.category_id}>
              <option value={category_id}>{category_name}</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <EditTrueBtn />
            <EditFalseBtn onclick={() => { setIsEditing(false) }} />
          </form>
        ) : <>
          <h3 className='font-bold w-[50%]'>{title}</h3>
          <p className="w-[20%]">{amount} Rs.</p>
          <p className="w-[20%]">{category_name}</p>
          <EditExpenseBtn onclick={() => setIsEditing(true)} />
          <DeleteExpenseBtn expenseId={expenseId} />
        </>
      }

    </div>
  )
}

export default ExpenseCard
