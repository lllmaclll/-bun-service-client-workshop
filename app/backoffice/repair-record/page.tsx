'use client'
import Modal from '@/app/components/modal'
import React, { useState } from 'react'

function RepairReacordPage() {
    const [showModal, setShowModal] = useState(false)
    const [customerName, setCustomerName] = useState('')
    const [customerPhone, setCustomerPhone] = useState('')
    const [deviceName, setDeviceName] = useState('')
    const [deviceBarcode, setDeviceBarcode] = useState('')
    const [deviceSerial, setDeviceSerial] = useState('')
    const [problem, setProblem] = useState('')
    const [solving, setSolving] = useState('')
    const [deviceId, setDeviceId] = useState('')

    const handleShowModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }


  return (
    <div>
        <div className="card">
            <h1>บันทึกการซ่อม</h1>
            <div className="card-body">
                <button className="btn-primary" onClick={handleShowModal}>
                    <i className="fa-solid da-plus mr-3"></i>
                    <span>เพิ่มการซ่อม</span>
                </button>
            </div>
        </div>

        <Modal title="เพิ่มการซ่อม" isOpen={showModal} onClose={() => handleCloseModal()} size='xl'>
            <div className='flex gap-4'>
                <div className="w-1/2">
                    <div>ชื่อลูกค้า</div>
                    <input type="text" className='form-control w-full' />
                </div>
                
                <div className="w-1/2">
                    <div>เบอร์โทรศัพท์</div>
                    <input type="number" className='form-control w-full' />
                </div>
            </div>

            <div className='mt-5'>เบอร์โทรศัพท์</div>
            <input type="text" className='form-control w-full' />

            <div className='mt-5'>เบอร์โทรศัพท์</div>
            <input type="text" className='form-control w-full' />

            <div className='mt-5'>เบอร์โทรศัพท์</div>
            <input type="text" className='form-control w-full' />

            <div className='mt-5'>เบอร์โทรศัพท์</div>
            <input type="text" className='form-control w-full' />

            <div className='mt-5'>เบอร์โทรศัพท์</div>
            <input type="text" className='form-control w-full' />

            <div className='mt-5'>เบอร์โทรศัพท์</div>
            <input type="text" className='form-control w-full' />

            <div className='mt-5'>เบอร์โทรศัพท์</div>
            <input type="text" className='form-control w-full' />

        </Modal>
    </div>
  )
}

export default RepairReacordPage