'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { config } from '@/app/config'
import Swal from 'sweetalert2'

function SideBar() {
    const [userLevel, setUserLevel] = useState('')

    let menuItems: any = []

    if (userLevel === 'admin') {
        menuItems = [
            { title: 'Dashboard', href: '/backoffice/dashboard', icon: 'fa-solid fa-chart-simple' },
            { title: 'พนักงานร้าน', href: '/backoffice/user', icon: 'fa-solid fa-users' },
            { title: 'บันทึกการซ่อม', href: '/backoffice/repair-record', icon: 'fa-solid fa-screwdriver' },
            { title: 'สถานะการซ่อม', href: '/backoffice/repair-status', icon: 'fa-solid fa-gear' },
            { title: 'รายงานรายได้', href: '/backoffice/income-report', icon: 'fa-solid fa-money-bill' },
            { title: 'ทะเบียนวัสดุ อุปกรณ์', href: '/backoffice/device', icon: 'fa-solid fa-box' },
            { title: 'ข้อมูลร้าน', href: '/backoffice/company', icon: 'fa-solid fa-shop' },
        ]
    } else if (userLevel === 'user') {
        menuItems = [
            { title: 'บันทึกการซ่อม', href: '/backoffice/repair-record', icon: 'fa-solid fa-screwdriver' },
        ]
    } else if (userLevel === 'engineer') {
        menuItems = [
            { title: 'สถานะการซ่อม', href: '/backoffice/repair-status', icon: 'fa-solid fa-gear' },
        ]
    }

    const fetchUserLevel = async () => {
        try {
            const token = localStorage.getItem(config.tokenKey)
            const response = await axios.get(`${config.apiUrl}/api/user/level`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            setUserLevel(response.data)
        } catch (error: any) {
            Swal.fire({
            icon: 'error',
            title: 'การดึงข้อมูลล้มเหลว',
            text: error.message
            })
        }
    }

    useEffect(() => {
        fetchUserLevel()
    }, [])

    return (
        <aside className='sidebar'>
            <div className='sidebar-header'>
                <i className='da-solid  da-user text-4xl mr-5'></i>
                <h1 className='text-xl font-bold'>Bun Service 2025</h1>
            </div>
            <nav className='sidebar-nav bg-gray-950 p-4 rounded-tl-3xl ml-4'>
                <ul>
                    {menuItems.map((item: any) => (
                        <li key={item.href}>
                            <Link href={item.href} className='sidebar-item'>
                                <i className={item.icon + 'mr-2 w-6'}></i>
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}

export default SideBar