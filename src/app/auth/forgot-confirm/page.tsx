"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function ForgotConfirm() {
  const searchParams = useSearchParams()
  const [time,setTime]=useState<number|string>(60)
  const email=searchParams.get('email')
  useEffect(() => {
    
  }, [email])
  
  return (
    <div className='p-4'>
      <h5 className='text-center'>Please check your email to confirm</h5>
      <p className='text-center text-danger'>
        expired is <span>{time}</span> minus
      </p>
    </div>
  )
}
