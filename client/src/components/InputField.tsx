import type { UseFormRegister } from "react-hook-form"

interface IFormValues{
    name:string
}

type InputFieldType {
    label: string,
    name:string,
    type:string,
    register:UseFormRegister<IFormValues>,
    error:object,
    placeholder:string
}

function InputField({ label, name, type, register, error, placeholder }:InputFieldType) {
    return (
        <>
            <label htmlFor={name} className="block">
                {label}:
            </label>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                className="border-2 px-2 py-1 rounded-md w-xl"
                {...register(name, { required: `${label} is required` })}
            />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </>
    );
}

export default InputField;