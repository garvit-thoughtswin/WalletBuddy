import { MdCheckCircle } from "react-icons/md";

function EditTrueBtn({onclick}: {onclick?: () => void}) {
  return (
    <button onClick={onclick} type="submit">
      <MdCheckCircle className="text-green-500 cursor-pointer hover:text-green-700" size={30} />
    </button>
  )
}

export default EditTrueBtn
