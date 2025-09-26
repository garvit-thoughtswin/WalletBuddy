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

function Signup() {
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
            type="password"
            placeholder="Enter Password"
            register={register}
            error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            value="Signup"
            onclick={() => clearErrors()}
            className="cursor-pointer"
          />
        </form>
        <p className="text-sm md:text-base mt-0.5">
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