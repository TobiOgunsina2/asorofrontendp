import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    useEffect(()=> {
        const token = localStorage.getItem('access')
        if (token) {
            navigate('/learn')
        }
    },[])
    
  return (
    <div>
      <h1>Reconnect with your culture</h1>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>

    </div>
  )
}

export default Home
