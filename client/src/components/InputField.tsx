import type { InputFieldType } from "../types/form";



function InputField<TFormValues>({ label, name, type, register, error, placeholder }: InputFieldType<TFormValues>) {
    return (
        <div className="my-1">
            <label htmlFor={name as string} className="block text-left font-bold">
                {label}:
            </label>
            <input
                id={name as string}
                type={type}
                placeholder={placeholder}
                className="border-2 px-2 py-1 rounded-md w-full md:max-w-xl bg-blue-50"
                {...register(name, { required: `${label} is required` })}
            />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
    );
}

export default InputField;