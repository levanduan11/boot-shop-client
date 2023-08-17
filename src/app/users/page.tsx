import React from 'react'
import { Metadata } from 'next'
import Layout from '../../components/Layout'

export const metadata: Metadata = {
  title: 'Users',
}
export default function Users() {
  return (
   <Layout>
      <h2 className=''>this is users page</h2>
    </Layout>
  )
}
