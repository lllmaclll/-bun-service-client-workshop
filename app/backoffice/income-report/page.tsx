'use client'
import dayjs from 'dayjs'
import React, { useState } from 'react'

function IncomeReportPage() {
    const [startDate, setStartDate] = useState(dayjs().format('YYYY-MM-DD'))
    const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'))

  return (
    <div className='card'>
        <h1>รายงานรายได้</h1>
        <div className="card-body">
            <div className="flex gap-4 items-center">
                <div className="w-[100px] text-right">จากวันที่</div>
                <div className="w-[200px]">
                    <input type="date" className="form-control w-full" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>

                <div className="w-[100px] text-right">ถึงวันที่</div>
                <div className="w-[200px]">
                    <input type="date" className="form-control w-full" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>

                <div className="w-[200px]">
                    <button className="btn-primary" style={{ marginTop: '8px' }}>
                        <i className="fa-solid fa-search mr-3"></i>
                        <span>ค้นหา</span>
                    </button>  
                </div>
            </div>

        </div>
    </div>
  )
}

export default IncomeReportPage