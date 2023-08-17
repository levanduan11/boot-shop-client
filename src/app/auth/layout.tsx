import React from 'react'
import LoginLayout from '../../components/AuthLayout'

export default function AuthLayout({children}:{children:React.ReactNode}) {
  return (
    <LoginLayout>
      {children}
    </LoginLayout>
  )
}
