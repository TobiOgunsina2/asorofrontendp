import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/home.css'

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
      <header className='home-header'>
        <Link to='/'>Home</Link>
        <div className="header-left">
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </div>
      </header>
      <main className='home-main'>
        <section className="text">
          <h1 className='home-slogan'>Reconnect with your culture</h1>

        </section>

        <section className="home-image">
          <img src="./img" alt="yoruba image" />
        </section>
      </main>

    </div>
  )
}

export default Home
