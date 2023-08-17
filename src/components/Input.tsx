import { checkValidInput } from '@/lib/util'
import React from 'react'
type Props = React.HTMLProps<HTMLInputElement> & {
  valid: boolean,
  touch: boolean,
  textLabel?: string,
  textInput?: string,
  errorMessage?: string,
  register: any
}
export default function Input({
  valid,
  touch,
  textLabel='',
  textInput='',
  register,
  errorMessage,
  type = 'text',
  ...rest
}: Props) {
  return (
    <div className="mb-3">
      <label htmlFor={textInput} className="form-label">{textLabel}</label>
      <input
        type={type}
        className={checkValidInput(valid, touch)}
        id={textInput}
        placeholder={textLabel}
        {...register}
        {...rest}
      />
      {valid &&
        (<span className='invalid-feedback'>{errorMessage}</span>)}
    </div>
  )
}
