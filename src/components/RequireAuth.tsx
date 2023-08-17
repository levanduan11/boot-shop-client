import Roles from '@/constant/auths'
import { hasRole } from '@/service/auth'
import { useRouter } from 'next/navigation'
import React from 'react'

const hasAuth = hasRole(Roles.ADMIN, Roles.USER)

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  
  const router = useRouter()

  if (!hasAuth) {
    router.push('/auth/login')
    router.refresh()
  }
  else {
    return (
      <>{children}</>
    )
  } 
}
