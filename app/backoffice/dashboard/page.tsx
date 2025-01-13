'use client'
import { config } from '@/app/config'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Chart from 'apexcharts'
import dayjs from 'dayjs'
import Swal from 'sweetalert2'

function DashboardPage() {
  const [totalRepairRecords, setTotalRepairRecords] = useState(0)
  const [totalRepairRecordNotComplete, setTotalRepairRecordNotComplete] = useState(0)
  const [totalRepairRecordComplete, setTotalRepairRecordComplete] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [listYears, setListYears] = useState<number[]>([])
  const [listMonths, setListMonths] = useState(['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'])
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYearChartIncomePerMonth, setSelectedYearChartIncomePerMonth] = useState(new Date().getFullYear())
  const [listIncomePerMonth, setListIncomePerMonth] = useState([])

  const fetchData = async () => {
    fetchDataIncomePerDay()
    fetchDataChartIncomePerMonth()
  }

  const fetchDataIncomePerDay = async () => {
    try {
      const params = {
        year: selectedYear,
        month: selectedMonth + 1
      }
  
      const response = await axios.get(`${config.apiUrl}/api/repair-record/dashboard`, {
        params: params
      })
  
      setTotalRepairRecords(response.data.totalRepairRecords)
      setTotalRepairRecordNotComplete(response.data.totalRepairRecordNotComplete)
      setTotalRepairRecordComplete(response.data.totalRepairRecordComplete)
      setTotalAmount(response.data.totalAmount)
  
      let listIncomePerDays = []
      for (let i = 0; i < response.data.listIncomePerDays.length; i++) {
        listIncomePerDays.push(response.data.listIncomePerDays[i].amount)
      }
  
      renderChartIncomePerDays(listIncomePerDays)
      renderChartPie(
        response.data.totalRepairRecordComplete,
        response.data.totalRepairRecordNotComplete,
        response.data.totalRepairRecords
      )
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'การดึงข้อมูลล้มเหลว',
        text: error.message
      })
    }
  }

  const fetchDataChartIncomePerMonth = async () => {
    try {
      const params = {
        year: selectedYearChartIncomePerMonth
      }

      const response = await axios.get(`${config.apiUrl}/api/repair-record/income-per-month`, {
        params: params
      })

      let listIncomePerMonth = []

      for (let i = 0; i < response.data.length; i++) {
        let item = response.data[i].amount
        listIncomePerMonth.push(item)
      }

      renderChartIncomePerMonth(listIncomePerMonth)
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'การดึงข้อมูลล้มเหลว',
        text: error.message
      })
    }
  }

  const renderChartIncomePerDays = (data: number[]) => {
    // radom data 31 days
    // const data = Array.from({ length: 31 }, () => Math.floor(Math.random() * 10000))

    const options = {
      chart: {
        type: 'bar',
        height: 300,
        background: 'white',
      },
      series: [
        {
          data: data
        }
      ],
      xaxis: {
        categories: Array.from({ length: 31 }, (_, i) => `${i + 1}`)
      }
    }

    const chartIncomePerDays = document.getElementById('chartIncomePerDays')

    if (chartIncomePerDays) {
      const chart = new Chart(chartIncomePerDays, options)
      chart.render()
    }

  }

  const renderChartIncomePerMonth = (data: number[]) => {
    // radom data 12 month
    // const data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10000))

    const options = {
      chart: {
        type: 'bar',
        height: 300,
        background: 'white',
      },
      series: [
        {
          data: data
        }
      ],
      xaxis: {
        categories: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
      }
    }

    const chartIncomePerMonth = document.getElementById('chartIncomePerMonth')

    if (chartIncomePerMonth) {
      const chart = new Chart(chartIncomePerMonth, options)
      chart.render()
    }

  }

  const renderChartPie = (totalRepairRecordComplete: number, totalRepairRecordNotComplete: number, totalRepairRecords: number) => {
    const data = [totalRepairRecordComplete, totalRepairRecordNotComplete, totalRepairRecords]
    const options = {
      chart: {
        type: 'pie',
        height: 300,
        background: 'white'
      },
      series: data,
      labels: ['งานซ่อมเสร็จ', 'งานกำลังซ่อม', 'งานทั้งหมด']
    }

    const chartPie = document.getElementById('chartPie')
    const chart = new Chart(chartPie, options)
    chart.render()
  }

  useEffect(() => {
    // year 5 years ago to now
    const currentYear = dayjs().year()
    const currentMonth = dayjs().month()
    const listYear = Array.from({ length: 5 }, (_, i) => currentYear - i)
    setListYears(listYear)
    setSelectedYear(currentYear)
    setSelectedMonth(currentMonth)
    setSelectedYearChartIncomePerMonth(currentYear)

    fetchData()
  }, [])

  return (
    <>
      <div className='text-2xl font-bold'>Dashboard</div>
      <div className="flex mt-5 gap-4">
        <div className="w-1/4 bg-indigo-500 p-4 rounded-lg text-right">
          <div className='text-xl font-bold'>งานซ่อมทั้งหมด</div>
          <div className='text-4xl font-bold'>{totalRepairRecords}</div>
        </div>
        <div className="w-1/4 bg-pink-500 p-4 rounded-lg text-right">
          <div className='text-xl font-bold'>งานซ่อมเสร็จ</div>
          <div className='text-4xl font-bold'>{totalRepairRecordComplete}</div>
        </div>
        <div className="w-1/4 bg-orange-700 p-4 rounded-lg text-right">
          <div className='text-xl font-bold'>งานกำลังซ่อม</div>
          <div className='text-4xl font-bold'>{totalRepairRecordNotComplete}</div>
        </div>
        <div className="w-1/4 bg-green-500 p-4 rounded-lg text-right">
          <div className='text-xl font-bold'>รายได้เดือนนี้</div>
          <div className='text-4xl font-bold'>{totalAmount.toLocaleString()}</div>
        </div>
      </div>

      <div className='text-2xl font-bold mt-5 mb-2'>รายได้รายวัน</div>
      <div className='flex mb-3 mt-2 gap-4 items-end'>
        <div className="w-[100px]">
          <div>ปี</div>
          <select className='form-control' onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
            {listYears.map((year, index) => (
              <option value={year} key={index}>{year}</option>
            ))}
          </select>
        </div>

        <div className="w-[100px]">
          <div>เดือน</div>
          <select className='form-control' onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
            {listMonths.map((month, index) => (
              <option value={month} key={index}>{month}</option>
            ))}
          </select>
        </div>

        <div className='w-[200px] ms-2'>
          <button className='btn' style={{ paddingRight: '20px', paddingLeft: '10px'}} onClick={fetchDataIncomePerDay}>
            <i className='fa-solid fa-magnifying-glass ms-3 pe-3'></i>
            <span>แสดงข้อมูล</span>
          </button>
        </div>

      </div>
      <div id='chartIncomePerDays'></div>

      <div className='text-2xl font-bold mt-5 mb-2'>รายได้รายเดือน</div>
      <select className='form-control mb-2 mt-2' onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
        {listYears.map((year, index) => (
          <option value={year} key={index}>{year}</option>
        ))}
      </select>
      <button className='btn ms-2' style={{ paddingRight: '20px', paddingLeft: '10px'}} onClick={fetchDataChartIncomePerMonth}>
        <i className='fa-solid fa-magnifying-glass ms-3 pe-3'></i>
        <span>แสดงข้อมูล</span>
      </button>

      <div className='flex gap-4'>
        <div className='w-2/3'>
          <div id='chartIncomePerMonth'></div>
        </div>

        <div className='w-1/3'>
          <div id='chartPie'></div>
        </div>
      </div>

    </>
  )
}

export default DashboardPage