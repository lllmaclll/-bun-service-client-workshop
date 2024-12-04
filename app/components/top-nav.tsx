'use client'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { config } from '../config'
import { useRouter } from 'next/navigation'

function TopNav() {
    const [name, setName] = useState('')
    const [level, setLevel] = useState('')
    const router = useRouter()

    const handleLogout = async () => {
        const button = await Swal.fire({
            title: 'ออกจากระบบ',
            text: 'คุณต้องการออกจากระบบ',
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true
        })

        if (button.isConfirmed) {
            localStorage.removeItem(config.tokenKey)
            localStorage.removeItem('bun_service_name')
            localStorage.removeItem('bun_service_level')

            router.push('/')
        }
    }

    const handleProfile = async () => {
        router.push('/backoffice/profile')
    }

    useEffect(() => {
        setName(localStorage.getItem('bun_service_name') || '')
        setLevel(localStorage.getItem('bun_service_level') || '')
    }, [])

  return (
    <nav className='bg-gray-800 shadow-sm'>
        <div className='mx-auto px-6'>
            <div className='flex h-16 justify-between items-center'>
                <div className='flex-shrink-0'>
                    <h1 className='text-xl font-bold'>Bun Service 2025</h1>
                </div>
                <div className='flex items-center'>
                    <span className='text-gray-200'>{name}</span>
                    <span className='text-indigo-400 ml-5 font-bold'>( {level} )</span>

                    <button className='bg-indigo-500 text-white px-4 py-2 rounded-md ml-5 hover:bg-indigo-600' onClick={handleProfile}>
                        <i className='fa-solid fa-user mr-3'></i>
                        <span>Profile</span>
                    </button>
                    <button className='bg-red-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-red-600' onClick={handleLogout}>
                        <i className='fa-solid fa-right-from-bracket mr-3'></i>
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default TopNav