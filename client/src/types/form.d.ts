import type { ReactNode } from "react";
import type { UseFormRegister, FieldError, Path } from "react-hook-form"

export interface IFormValues {
  name?: string;
  email: string;
  password: string;
}

export interface IExpenseFormValuesWithoutID {
  title: string;
  amount: number;
}

export interface IExpenseFormValues extends IExpenseFormValuesWithoutID {
  id: number;
}


export interface FormWrapperType {
    children: ReactNode;
}

export interface InputFieldType<TFormValues> {
    label: string;
    name: Path<TFormValues>;
    type: string;
    register: UseFormRegister<TFormValues>;
    error?: FieldError;
    placeholder: string;
}

export interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
};

export interface ButtonType {
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  value: string;
  onclick?: () => void;
  className?: string;
} 

export interface ExpenseContextType {
  expenses: IExpenseFormValues[];
  setExpenses: (expenses: IExpenseFormValues[]) => void;
}

export interface UserProfileType{
  name: string;
  email: string;
}