import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form"
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import FormWrapper from "../components/FormWrapper";
import Button from "../components/Button";
import { useState } from "react";
import type { IFormValues } from "../types/form";
import { useAuth } from "../hooks/useAuth";

function Signup() {

  const [isPasswordType, setIsPasswordType] = useState(true)
  const[error,setError]=useState<string | null>(null)

  const { handleSignup } = useAuth();
  

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
    reset
  } = useForm<IFormValues>();


  const submitForm: SubmitHandler<IFormValues> = async (data: IFormValues) => {
    setError(null);
    try { 
      await handleSignup(data);
      reset();
    } catch (err) {
      console.error(err);
      setError("Signup failed");
    }
  };

  return (
    <div>
      <FormWrapper>
        <h1 className="text-4xl text-center">Signup</h1>
        <form onSubmit={handleSubmit(submitForm)} className="p-3">
          <InputField<IFormValues>
            label="Name"
            name="name"
            type="text"
            placeholder="John Doe"
            register={register}
            error={errors.name}
          />
          <InputField<IFormValues>
            label="Email"
            name="email"
            type="text"
            placeholder="John@example.com"
            register={register}
            error={errors.email}
          />
          <InputField<IFormValues>
            label="Password"
            name="password"
            type={isPasswordType?"password":"text"}
            placeholder="Enter Password"
            register={register}
            error={errors.password}
          />
          <input type="checkbox" name="typeChange" id="typeChange" onChange={() => setIsPasswordType(!isPasswordType)} />
          <label htmlFor="typeChange"> Show Password</label>
          <br />
          <Button
            type="submit"
            disabled={isSubmitting}
            value="Signup"
            onclick={() => clearErrors()}
            className="cursor-pointer mt-3"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
        <p className="text-sm md:text-base mt-0.5 text-center">
          Already Have An Account&nbsp;
          <Link to="/login" className="underline">
            Login Here
          </Link>
        </p>
      </FormWrapper>
    </div>
  );
}

export default Signup;