import { useEffect, useRef, useState } from 'react'
import '../../styles/profile.css'
import { Link, useNavigate } from 'react-router-dom'


const profileDrop = (props: {shortened: string}) => {
  const logout = () => {
    localStorage.clear()
    nav('/')
  }

  const [dropdownToggle, setDropDownToggle] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleDropDownToggle = () => {
    setDropDownToggle(!dropdownToggle)
  }

  const handleClickOutside = (e: any)=> {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)){
      setDropDownToggle(false)
    }
  }

  useEffect(()=>{
    document.addEventListener('mousedown', handleClickOutside)

    return ()=>document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  const nav = useNavigate()

  return (
    <div className='menu-container' ref = {dropdownRef}>
      <button className='user-profile' onClick={handleDropDownToggle}>{props.shortened}</button>
      <div className={`custom-profile-dropdown ${dropdownToggle ?'profile-active' : ''} `}>
        <div className="menu-items-div">
          <div className="menu-item">
            <Link className='menu-item-link' to="/profile">Profile</Link>
          </div>
          <div onClick={logout} className="menu-item logout">
            <p className='logout-p'>Logout</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default profileDrop
