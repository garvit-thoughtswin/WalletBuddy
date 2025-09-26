import type { UseFormRegister, FieldError } from "react-hook-form"

interface IFormValues {
    name: string,
    email:string,
    password:string
}

type InputFieldType = {
    label: string,
    name: keyof IFormValues,
    type: string,
    register: UseFormRegister<IFormValues>,
    error?: FieldError,
    placeholder: string
}

function InputField({ label, name, type, register, error, placeholder }: InputFieldType) {
    return (
        <div className="">
            <label htmlFor={name} className="block text-left">
                {label}:
            </label>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                className="border-2 px-2 py-1 rounded-md w-full md:w-xl"
                {...register(name, { required: `${label} is required` })}
            />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
    );
}

export default InputField;