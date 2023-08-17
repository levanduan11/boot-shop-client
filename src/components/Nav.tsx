"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/config/hooks'
import { loginReset, loginSelector } from '@/store/slice/loginslice'
import { decodeJwt } from '@/service/auth'
import storageService from '@/service/storage'
import Config from '@/constant/config'

export default function Nav() {
  const [username, setUsername] = useState<string | undefined>('')
  const { token } = useAppSelector(loginSelector)
  const tokenFromStorage = storageService.getItem(Config.ACCESS_TOKEN)

  const dispatch = useAppDispatch()
  const router = useRouter()
  function handleLogout(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    e.preventDefault()
    storageService.clear()
    dispatch(loginReset())
    router.refresh()
  }
  useEffect(() => {
    if ( tokenFromStorage) {
      const t = tokenFromStorage
      const body = decodeJwt(t)
      const now = new Date().getTime()
      if (now >= body?.exp!!) {
        console.log(body);
        
      }
      setUsername(body?.fullName)
    } else {
      router.push('/auth/login')
    }
  }, [router, tokenFromStorage, username])

  function handleChangePassword(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault()
    router.push('/auth/change-password')
  }

  return (
    <>
      <nav
        id="main-navbar"
        className="navbar navbar-expand-lg  navbar-light bg-primary fixed-top"
      >
        <div className="container">

          <button
            className="navbar-toggler bg-white"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <a className="navbar-brand" href="#">
            <h5 className="text-uppercase text-white mt-2">Boot shop manager</h5>
          </a>
          <div>

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {username ? username : 'profile'}
                </a>
                <ul className="dropdown-menu mt-3 bg-primary fw-bold" aria-labelledby="navbarDropdown">
                  <li>
                    <button
                      onClick={e => handleLogout(e)}
                      className='btn btn-dark dropdown-item text-white'
                    >
                      logout
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleChangePassword}
                      className='btn btn-dark dropdown-item text-white'
                    >
                      change password
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}
