import React from "react"

export type InputProps = {
    placeholder: string,
    type: "text" | "password",
    icon?: string,
    class?: string,
    style?: React.CSSProperties,
    value?: string,
    defaultValue?: string,
    onChange?: (e:React.ChangeEvent<HTMLInputElement>, v:string) => void, 
    name: string,
}