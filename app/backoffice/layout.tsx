import React from 'react'
import TopNav from '../components/top-nav'
import SideBar from '../components/sidebar'

function DashboardLayout({ children }: {
    children: React.ReactNode
}) {
  return (
    <div className='min-h-screen bg-gray-100'>
        <TopNav />

        <div className='flex bg-gray-800'>
            <SideBar />
            
            <main className='flex-1 p-6 bg-gradient-to-t from-gray-600 to-gray-950 rounded-tl-3xl'>
                {children}
            </main>
        </div>
    </div>
  )
}

export default DashboardLayout