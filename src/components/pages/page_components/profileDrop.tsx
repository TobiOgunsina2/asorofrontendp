import React, { useEffect, useRef, useState } from 'react'
import '../../styles/profile.css'
import { Link } from 'react-router-dom'


const profileDrop = () => {
  const logout = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
  }

  const [dropdownToggle, setDropDownToggle] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleDropDownToggle = () => {
    setDropDownToggle(!dropdownToggle)
  }

  const handleClickOutside = (e: any)=> {
    if (dropdownRef.current && !dropdownRef.current.contains(e.targer)){
      setDropDownToggle(false)
    }
  }

  useEffect(()=>{
    document.addEventListener('mousedown', handleClickOutside)

    return ()=>document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className='menu-container' ref = {dropdownRef}>
      <button className='user-profile' onClick={handleDropDownToggle}>HA</button>
      <div className={`custom-profile-dropdown ${dropdownToggle ?'profile-active' : ''} `}>
        <div className="menu-items-div">
          <div className="menu-item">
            <Link className='menu-item-link' to="/profile">Profile</Link>
          </div>
          <div className="menu-item logout">
            <Link className='menu-item-link logout-link' onClick={logout} to="/">Logout</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default profileDrop
