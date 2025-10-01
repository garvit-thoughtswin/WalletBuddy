import type { FieldError,  FieldValues, Path, UseFormRegister } from "react-hook-form";

type Option = {
  id: string | number;
  name: string;
};

type SelectInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  label: string;
  options: Option[];
  register: UseFormRegister<TFormValues>;
  error?: FieldError;
};

function SelectInput<TFormValues extends FieldValues>({
  name,
  label,
  options,
  register,
  error,
}: SelectInputProps<TFormValues>) {
  return (
    <div className="flex flex-col">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        {...register(name, { required: `${label} is required` })}
        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
}

export default SelectInput;
