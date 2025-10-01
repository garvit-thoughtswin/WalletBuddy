import { MdEdit } from "react-icons/md";

function EditExpenseBtn({ onclick }: { onclick: () => void }) {

  return (
      <button onClick={onclick}>
        <MdEdit className="text-blue-500 hover:text-blue-700 cursor-pointer" size={30} />
      </button>
  )
}

export default EditExpenseBtn
