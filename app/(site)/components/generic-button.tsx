import React from 'react'

interface Props {
    name: string,
    onClick: any,
    className?: string
}

export default function GenericButton({ name, onClick, className }: Props) {
    return (
        <button onClick={onClick} className={`mt-6 px-6 py-3 text-bold bg-grey 
            hover:bg-primary border-2 border-primary text-primary 
            hover:text-grey rounded-lg transition duration-300 ${className}`}>
            {name}
        </button>
    )
}
