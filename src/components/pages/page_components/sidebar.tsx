import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/sidebar.css'

const Sidebar = () => {
  return (
    <>
        <Link className='sidebar-link' to="/"><p>Asoro</p></Link>
        <Link className='sidebar-link' to="/learn"><p>Learn</p></Link>
        <Link className='sidebar-link' to="/review"><p>Review</p></Link>
        <Link className='sidebar-link' to="/videos"><p>Videos</p></Link>
    </>
  )
}

export default Sidebar
