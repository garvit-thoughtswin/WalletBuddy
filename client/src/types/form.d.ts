import type { ReactNode } from "react";
import type { UseFormRegister, FieldError } from "react-hook-form"

export interface IFormValues {
  name?: string;
  email: string;
  password: string;
}

export interface FormWrapperType {
    children: ReactNode;
}

export interface InputFieldType {
    label: string;
    name: keyof IFormValues;
    type: string;
    register: UseFormRegister<IFormValues>;
    error?: FieldError;
    placeholder: string;
}

export interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
};