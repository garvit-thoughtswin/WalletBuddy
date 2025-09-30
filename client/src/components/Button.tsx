import type { ButtonType } from '../types/form';

function Button({ type, value, disabled, onclick,className }: ButtonType) {
    return (
        <button type={type} onClick={onclick} disabled={disabled} className={` w-auto px-2 py-1 rounded bg-blue-800 text-white disabled:bg-blue-200 cursor-pointer ${className}`}>
            {value}
        </button>
    )
}

export default Button