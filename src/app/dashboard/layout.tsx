import React from 'react'
import Header from './_components/header'

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout ({children}: DashboardLayoutProps) {
  return (
    <header>
      <Header />
      <div className='mx-5 md:mx-20 lg:mx-36'>
        {children}
      </div>
    </header>
  )
}
export default DashboardLayout
