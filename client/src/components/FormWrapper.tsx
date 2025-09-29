import type { FormWrapperType } from "../types/form";

function FormWrapper({children}: FormWrapperType) {
  return (
      <div className=" w-auto max-w-2xl mx-2 md:mx-auto mt-2 p-3 md:p-2.5 leading-10 rounded-2xl shadow-xl/20 border-1 border-gray-200">
        {children}
      </div>
  );
}

export default FormWrapper;