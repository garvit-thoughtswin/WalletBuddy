import React from 'react'

type ButtonType = {
    type?: "button" | "submit" | "reset",
    value: string,
    disabled: boolean,
    onclick: React.MouseEventHandler<HTMLButtonElement>,
    className?:string
}

function Button({ type, value, disabled, onclick,className }: ButtonType) {
    return (
        <button type={type} onClick={onclick} disabled={disabled} className={` w-24 rounded bg-blue-800 text-white disabled:bg-blue-200 ${className}`}>
            {value}
        </button>
    )
}

export default Button