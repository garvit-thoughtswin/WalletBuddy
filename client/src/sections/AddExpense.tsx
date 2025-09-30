import type { IExpenseFormValuesWithoutID } from '../types/form';
import {useForm, type SubmitHandler } from 'react-hook-form';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useState } from 'react';
import { useExpense } from '../hooks/useExpense';

function AddExpense() {

    const [error, setError] = useState<string | null>(null);
    const { addExpense, getExpenses } = useExpense();

    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { errors, isSubmitting },
        reset
    } = useForm<IExpenseFormValuesWithoutID>();

    const submitForm: SubmitHandler<IExpenseFormValuesWithoutID> = async (data: IExpenseFormValuesWithoutID) => {
        setError(null);
        try {
            await addExpense(data);
            await getExpenses();
            reset();
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <form className='w-fit center m-auto' onSubmit={handleSubmit(submitForm)}>
            <div className='flex md:flex-row flex-col justify-center items-center mt-10 w-full gap-2'>
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
            </div>
            <Button type="submit" disabled={isSubmitting} value='Add Expense' onclick={() => clearErrors()} className='mt-3' />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
    )
}

export default AddExpense
