import type { CustomCategory } from "../types/form";
import Button from "../components/Button";
import InputField from "../components/InputField"
import { useForm, type SubmitHandler } from 'react-hook-form';
import FormWrapper from "../components/FormWrapper";
import { add_category } from "../services/categoryService";


function AddCategory() {
    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { errors, isSubmitting },
        reset
    } = useForm<CustomCategory>();

    const onSubmit: SubmitHandler<CustomCategory> = async (data) => {
        try {
            const response = await add_category(data);
            console.log("Category added:", response);
            reset();
        } catch (error) {
            console.error("Error adding category:", error);
        }
    }

    return (
        <FormWrapper>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <InputField<CustomCategory>
                    label="Add Category"
                    name="name"
                    placeholder="Add Custom Category"
                    register={register}
                    type="text"
                    error={errors.name}
                />
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    value="Add Category"
                    onclick={() => clearErrors()}
                    className="w-full mt-4"

                />
            </form>
        </FormWrapper>
    )
}

export default AddCategory;
