//"use client"
import React from 'react'
import SideBar from "./SideBar";
import Nav from "./Nav";
import { useRouter } from 'next/navigation';
import RequireAuth from './RequireAuth';

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <>
      <RequireAuth>
        <header>
          <SideBar />
          <Nav />
        </header>
        <main className="">
          <div className="container text-dark pt-4">
            {children}
          </div>
        </main>
        <footer>
          this is footer
        </footer>
      </RequireAuth>
    </>
  )
}
