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

    const joinRedirect = ()=>{
      navigate('/register')
    }
    
  return (
    <div className='home-page'>
      <header className='home-header'>
        <Link to='/'>Asoro</Link>
        <div className="header-left">
          <Link to='/login'>Login</Link>
          <Link to='/register'>Sign Up</Link>
        </div>
      </header>
      <main className='home-main'>
        <section className="home-text">
          <h1 className='home-slogan'>Reconnect with <br />your culture</h1>
          <p>Dive into immersive lessons that cover essential vocabulary, grammar, and pronunciation while exploring the vibrant traditions, music, and stories of the Yoruba people.</p>
          <button onClick={joinRedirect} className='home-start'>Join Now!</button>
        </section>

        <section className="home-image">
          <img src="./img" alt="yoruba image" />
        </section>
      </main>

    </div>
  )
}

export default Home
