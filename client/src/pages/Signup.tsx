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

  const { handleSignup } = useAuth();
  

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<IFormValues>();


  const submitForm: SubmitHandler<IFormValues> = async (data: IFormValues) => {
    try { 
      await handleSignup(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <FormWrapper>
        <h1 className="text-4xl text-center">Signup</h1>
        <form onSubmit={handleSubmit(submitForm)} className="p-3">
          <InputField
            label="Name"
            name="name"
            type="text"
            placeholder="John Doe"
            register={register}
            error={errors.name}
          />
          <InputField
            label="Email"
            name="email"
            type="text"
            placeholder="John@example.com"
            register={register}
            error={errors.email}
          />
          <InputField
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
            className="cursor-pointer"
          />
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