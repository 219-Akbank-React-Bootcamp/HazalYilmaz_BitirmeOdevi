import React, { FC, useEffect, useState } from 'react'
import { Styled } from './Input.styled'
import { InputProps } from './Input.types'

const Input : FC<InputProps> = (props) => {
  /* Password Görünüm Kontrolü */
  const [isSecret, SetIsSecret] = useState<boolean>(props.type === "password")
  
  const [value, setValue] = useState<string>(props.defaultValue || props.value || "") 
  useEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value)
    }
  }, [props.value])

  const calculateType = () => {
    if (props.type === "text") return "text"
    if (props.type === "password" && isSecret) return "password"
    if (props.type === "password" && !isSecret) return "text"
    return props.type
  }

  /* Password hidden icona tıklanıldığında */
  const handleClickEye = () => {
    SetIsSecret(prev => !prev)
  }

  const handleChange : React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const v = e.target.value;
    setValue(v)
    props.onChange?.(e, v)
  }

  return (
    <Styled style={props.style}>
      {/* Input sol icon */}
      {props.icon 
        ? <div className='icon'>
            <span className="material-symbols-outlined">
              {props.icon}
            </span>
          </div>  
        : null
      }

      <input name= {props.name} onChange={handleChange} type={calculateType()} value={value} placeholder={props.placeholder}/>

      {/* Input sağ iconn */}
      {props.type === "password" 
        ? <button onClick={handleClickEye} className='eye'>
            <span className="material-symbols-outlined">
              {isSecret ? "visibility_off" : "visibility"}
            </span>
          </button>  
        : null
      }
    </Styled>
  )
}

export default Input