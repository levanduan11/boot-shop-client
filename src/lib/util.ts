import { BodyData, HeaderData } from "@/store/model/model";
import { PayloadAction } from "@reduxjs/toolkit";

export function executeTime(time: number, action: (o: any) => any) {
  setTimeout(action, time)
}

export function buildAction<T = any>(type: (string | any), isBody: boolean = true, data?: T): PayloadAction<BodyData<T> | HeaderData<T>> {
  
  const payload: BodyData<T> | HeaderData<T> = isBody ? { data: data } : { ... data }

  return {
    type: type,
    payload,
  }
}

export function checkValidInput(invalid: boolean, touch: boolean) {
  let defaultClassName = 'form-control'
  if (touch) {
    if (invalid) {
      defaultClassName = `${defaultClassName} is-invalid`
    } else {
      defaultClassName = `${defaultClassName} is-valid`
    }
  }
  return defaultClassName
}