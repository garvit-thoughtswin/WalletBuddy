import {useForm } from "react-hook-form";
import type {SubmitHandler} from "react-hook-form"
import {Link} from "react-router-dom";
import InputField from "../components/InputField";
import FormWrapper from "../components/FormWrapper";
import Button from "../components/Button";


interface IFormValues{
  name:string,
  email:string,
  password:string
}

function Login() {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: {errors, isSubmitting},
  } = useForm<IFormValues>();


  const submitForm:SubmitHandler<IFormValues> = async (data:IFormValues) => {
   console.log(data)
  };

  return (
    <div>
      <FormWrapper>
        <h1 className="text-4xl text-center">Login</h1>
        <form onSubmit={handleSubmit(submitForm)} className="p-3">
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
            type="password"
            placeholder="Enter Password"
            register={register}
            error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            value="Login"
            onclick={() => clearErrors()}
            className="cursor-pointer"
          />
        </form>
        <p className="text-sm md:text-base mt-0.5">
          Dont't Have An Account&nbsp;
          <Link to="/signup" className="underline">
            Create Here
          </Link>
        </p>
      </FormWrapper>
    </div>
  );
}

export default Login;