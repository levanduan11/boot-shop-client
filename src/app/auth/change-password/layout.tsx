"use client"
import RequireAuth from '@/components/RequireAuth'
import React from 'react'

export default function ChangePasswordLayout({children}:{children:React.ReactNode}) {
  return (
    <RequireAuth>
      {children}
    </RequireAuth>
  )
}
