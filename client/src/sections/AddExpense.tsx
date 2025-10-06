import type { IExpenseFormValuesWithoutID } from '../types/form';
import { useForm, type SubmitHandler } from 'react-hook-form';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import { useExpense } from '../hooks/useExpense';
import { get_categories } from '../services/categoryService';
import SelectInput from '../components/SelectInput';

function AddExpense() {

    const [error, setError] = useState<string | null>(null);
    const { addExpense, getExpenses } = useExpense();
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { errors, isSubmitting },
        reset
    } = useForm<IExpenseFormValuesWithoutID>();

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


    const submitForm: SubmitHandler<IExpenseFormValuesWithoutID> = async (data: IExpenseFormValuesWithoutID) => {
        setError(null);
        try {
            await addExpense(data);
            await getExpenses();
            reset();
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again." + err);
        }
    };

    return (
        <form className='w-fit fixed bg-white rounded-lg shadow-lg p-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' onSubmit={handleSubmit(submitForm)}>
            <div className='flex flex-col justify-center items-center w-full gap-2'>
                <h1 className='font-bold'>Add Expense</h1>
                <InputField<IExpenseFormValuesWithoutID>
                    label="Title"
                    name="title"
                    type="text"
                    placeholder="Groceries, Rent etc"
                    register={register}
                    error={errors.title}
                />
                <InputField<IExpenseFormValuesWithoutID>
                    label="Amount"
                    name="amount"
                    type="number"
                    placeholder="Enter amount"
                    register={register}
                    error={errors.amount}
                />
                <InputField<IExpenseFormValuesWithoutID>
                    label="Date"
                    name="date"
                    type="date"
                    register={register}
                    error={errors.date}
                    placeholder='Select Date'
                />
                <SelectInput<IExpenseFormValuesWithoutID>
                    label="Category"
                    name="category_id"
                    options={categories}
                    register={register}
                    error={errors.category_id}
                />
                <Button type="submit" disabled={isSubmitting} value='Add Expense' onclick={() => clearErrors()} className='mt-3 mx-auto' />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
        </form>
    )
}

export default AddExpense
