import React from 'react'
import '../Styles/DashBoard.css'
import Navbar from './Navbar'

const DashBoard = () => {
  return (
    <div>
        <Navbar/>
        <div>
            <h1>DashBoard</h1>
        </div>
        <div className='welcome'>
            <h1>Welcome Admin Panel</h1>
        </div>
    </div>
  )
}

export default DashBoard