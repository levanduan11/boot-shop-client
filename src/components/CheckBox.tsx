
import React from 'react'
type Props = React.HTMLProps<HTMLInputElement> & {
  textLabel: string,
  register: any
}
export default function CheckBox({ textLabel, register, ...rest }: Props) {
  return (
    <div className="mb-3 form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id="rememberMe"
        {...register}
        {...rest}
      />
      <label className="form-check-label" htmlFor="rememberMe">{textLabel}</label>
    </div>
  )
}
