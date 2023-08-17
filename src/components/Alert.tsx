"use client"

import { useAppDispatch, useAppSelector } from '@/config/hooks'
import { alertSelector, hideAlert } from '@/store/slice/alertslice'
import React from 'react'


export default function Alert() {
  const {show,valid,message} = useAppSelector(alertSelector)
  const dispatch = useAppDispatch()

  const className = valid
    ? "alert alert-success alert-dismissible fade show"
    : "alert alert-danger alert-dismissible fade show"

  return (
    <>
      {show && <div className={className} role="alert">
        <strong className='text-center d-flex justify-content-center'>{message}</strong>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={_=>dispatch(hideAlert())}
          ></button>
      </div>}
    </>
  )
}
