import { useAppSelector } from '@/config/hooks'
import { spinnerSelector } from '@/store/slice/spiner.slice'
import React from 'react'

export default function Spinner() {
  const {show}=useAppSelector(spinnerSelector)
  return (
    <>
      {show && (<div className="text-center m-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>)}
    </>
  )
}
