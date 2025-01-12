'use client'
import { config } from '@/app/config'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Chart from 'apexcharts'

function DashboardPage() {
  const [totalRepairRecords, setTotalRepairRecords] = useState(0)
  const [totalRepairRecordNotComplete, setTotalRepairRecordNotComplete] = useState(0)
  const [totalRepairRecordComplete, setTotalRepairRecordComplete] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  const fetchData = async () => {
    const response = await axios.get(`${config.apiUrl}/api/repair-record/dashboard`)
    setTotalRepairRecords(response.data.totalRepairRecords)
    setTotalRepairRecordNotComplete(response.data.totalRepairRecordNotComplete)
    setTotalRepairRecordComplete(response.data.totalRepairRecordComplete)
    setTotalAmount(response.data.totalAmount)

    renderChartIncomePerDays()
    renderChartIncomePerMonth()
    renderChartPie(
      response.data.totalRepairRecordComplete,
      response.data.totalRepairRecordNotComplete,
      response.data.totalRepairRecords
    )
  }

  const renderChartIncomePerDays = () => {
    // radom data 31 days
    const data = Array.from({ length: 31 }, () => Math.floor(Math.random() * 10000))

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
    const chart = new Chart(chartIncomePerDays, options)
    chart.render()
  }

  const renderChartIncomePerMonth = () => {
    // radom data 12 month
    const data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10000))

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
        categories: [ 'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม' ]
      }
    }

    const chartIncomePerMonth = document.getElementById('chartIncomePerMonth')
    const chart = new Chart(chartIncomePerMonth, options)
    chart.render()
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
      <div id='chartIncomePerDays'></div>

      <div className='flex gap-4'>
        <div className='w-2/3'>
          <div className='text-2xl font-bold mt-5 mb-2'>รายได้รายเดือน</div>
          <div id='chartIncomePerMonth'></div>
        </div>
        <div className='w-1/3'>
          <div className='text-2xl font-bold mt-5 mb-2'>งานทั้งหมด</div>
          <div id='chartPie'></div>
        </div>
      </div>

    </>
  )
}

export default DashboardPage