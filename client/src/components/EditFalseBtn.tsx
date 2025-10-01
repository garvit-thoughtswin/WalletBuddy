import { MdCancel } from "react-icons/md";

function EditFalseBtn({onclick}: {onclick?: () => void}) {
  return (
    <button onClick={onclick}>
      <MdCancel className="text-red-500 cursor-pointer hover:text-red-700" size={30} /> 
    </button>
  )
}

export default EditFalseBtn
