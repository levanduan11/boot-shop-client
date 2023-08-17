"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
const classNameLink = "list-group-item list-group-item-action py-2 ripple"
const classNameLinkActive = "list-group-item list-group-item-action py-2 ripple active"
export default function SideBar() {
  const router = usePathname()

  return (
    <>
      <nav
        id="sidebarMenu"
        className="collapse d-lg-block sidebar collapse bg-white"
      >
        <div className="position-sticky">
          <div className="list-group list-group-flush mx-3 mt-4">
            <Link
              href="/"
              className={router === '/' ? classNameLinkActive : classNameLink}
              aria-current="true"
            >
              <i className="fa-solid fa-house me-3"></i>
              <span>dashboard</span>
            </Link>
            <Link
              href="/orders"
              className={router.includes('orders') ? classNameLinkActive : classNameLink}
            >
              <i className="fas fa-chart-bar fa-fw me-3"></i>
              <span>Orders</span>
            </Link>
            <Link
              href="/users"
              className={router.includes('users') ? classNameLinkActive : classNameLink}
            >
              <i className="fas fa-users fa-fw me-3"></i>
              <span>Users</span>
            </Link>

            <Link
              href="/settings"
              className={router.includes('settings') ? classNameLinkActive : classNameLink}
            >
              <i className="fa-solid fa-screwdriver-wrench me-3"></i>
              <span>settings</span>
            </Link>

          </div>
        </div>
      </nav>
    </>
  )
}
