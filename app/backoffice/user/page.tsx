'use client'
import Modal from '@/app/components/modal'
import { config } from '@/app/config'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

function UserPage() {
    const [showModal, setShowModal] = useState(false)
    const [users, setUsers] = useState([])
    const [levels, setLevels] = useState(['admin', 'user', 'engineer'])
    const [id, setId] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [level, setLevel] = useState('admin')
    const [departments, setDepartments] = useState([])
    const [departmentId, setDepartmentId] = useState('')
    const [sections, setSections] = useState([])
    const [sectionId, setSectionId] = useState('')

    const fetchSections = async (departmentId: string) => {
        const response = await axios.get(`${config.apiUrl}/api/section/list-by-department/${departmentId}`)
        setSections(response.data)
        setSectionId(response.data[0].id)
    }

    const fetchDepartments = async () => {
        const response = await axios.get(`${config.apiUrl}/api/department/list`)
        setDepartments(response.data)
        setDepartmentId(response.data[0].id)
        fetchSections(response.data[0].id)
    }

    const fetchUsers = async () => {
        const response = await axios.get(`${config.apiUrl}/api/user/list`)
        setUsers(response.data)
    }

    const handleShowModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleSave = async () => {
        try {
            if (password !== confirmPassword) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Password and Confirm Password do not match'
                })

                return
            }

            const payload = {
                username: username,
                password: password,
                level: level,
                sectionId: parseInt(sectionId + "")
            }

            if (id === '') {
                await axios.post(`${config.apiUrl}/api/user/create-user`, payload)
            } else {
                await axios.put(`${config.apiUrl}/api/user/update-user/${id}`, payload)
                setId('')
            }

            fetchUsers()
            handleCloseModal()
            
            setUsername('')
            setPassword('')
            setConfirmPassword('')
            setLevel('admin')
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message
            })
        }
    }

    const handleEdit = async (user: any) => {
        setId(user.id)
        setUsername(user.username)
        setPassword('')
        setConfirmPassword('')
        setLevel(user.level)

        const selectedDepartmentId = user?.section?.department?.id ?? (departments[0] as any).id;
        setDepartmentId(selectedDepartmentId);
        
        await fetchSections(selectedDepartmentId);

        const sectionId = user?.section?.id;
        setSectionId(sectionId);

        setShowModal(true)
    }

    const handleDelete = async (id: string) => {
        try {
            const button = await config.confirmDialog()

            if (button.isConfirmed) {
                await axios.delete(`${config.apiUrl}/api/user/remove-user/${id}`)
                fetchUsers()
            }

        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message
            })
        }
    }

    const handleChangeDepartment = (departmentId: string) => {
        setDepartmentId(departmentId)
        fetchSections(departmentId)
    }

    useEffect(() => {
        fetchUsers()

        const initializeData = async () => {
            await fetchDepartments();
            if (departments.length > 0) {
                const initialDepartmentId = (departments[0] as any).id;
                setDepartmentId(initialDepartmentId);
                await fetchSections(initialDepartmentId);
            }
        }
        initializeData();
    }, [])

  return (
    <div className='card'>
        <h1>พนักงานร้าน</h1>
        <div className="card-body">
            <button className="btn btn-primary" onClick={handleShowModal}>
                <i className='fa-solid fa-plus mr-2'></i>
                <span>เพิ่มข้อมูล</span>
            </button>

            <table className='table table-striped mt-2'>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th style={{ width: '100px' }}>Level</th>
                        <th>แผนก</th>
                        <th>ฝ่าย</th>
                        <th className='text-center' style={{ width: '220px' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: any) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.level}</td>
                            <td>{user?.section?.department?.name}</td>
                            <td>{user?.section?.name}</td>
                            <td className='text-center'>
                                <button className='btn-edit' onClick={() => handleEdit(user)}>
                                    <i className="fa-solid fa-edit mr-2"></i>
                                    <span>แก้ไข</span>
                                </button>
                                <button className='btn-delete' onClick={() => handleDelete(user.id)}>
                                    <i className="fa-solid fa-trash mr-2"></i>
                                    <span>ลบ</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <Modal title="เพิ่มข้อมูลพนักงาน" isOpen={showModal} onClose={() => handleCloseModal()}>
            <div className="flex gap-4">
                <div className="w-1/2">
                    <div>Department</div>
                    <select 
                        className="form-control w-full" 
                        value={departmentId} 
                        onChange={(e) => handleChangeDepartment(e.target.value)}
                    >
                        {departments.map((department: any) => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-1/2">
                    <div>Section</div>
                    <select 
                        className="form-control w-full" 
                        value={sectionId} 
                        onChange={(e) => setSectionId(e.target.value)}
                    >
                        {sections.map((section: any) => (
                            <option key={section.id} value={section.id}>
                                {section.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className='mt-5'>Username</div>
            <input type="text" className='form-control' value={username}  onChange={(e) => setUsername(e.target.value)} />

            <div className='mt-5'>Password</div>
            <input type="password" className='form-control' value={password}  onChange={(e) => setPassword(e.target.value)} />

            <div className='mt-5'>Confirm Password</div>
            <input type="password" className='form-control' value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value)} />

            <div className='mt-5'>Level</div>
            <select className='form-control w-full' value={level} onChange={(e) => setLevel(e.target.value)}>
                {levels.map((level: any) => (
                    <option key={level} value={level}>{level}</option>
                ))}
            </select>

            <button className='btn btn-primary mt-5' onClick={handleSave}>
                <i className="fa-solid fa-check mr-2"></i>
                <span>บันทึก</span>
            </button>

        </Modal>
    </div>
  )
}

export default UserPage