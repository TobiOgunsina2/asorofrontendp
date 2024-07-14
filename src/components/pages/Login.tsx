import React, {useState, useEffect} from 'react'

import { Link, useNavigate } from 'react-router-dom';
import api from '../../context/api';
import '../styles/login.css'
import Loader from './page_components/loader';

const Login = () => {

  const [username, setUsername] = useState('')
  
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  let loginUser = async(e: React.ChangeEvent<HTMLFormElement>) =>{
    e.preventDefault()
    console.log(e)
    setLoading(true)
    try {
      const res = await api.post('/api/token/', {'username': username, 'password':password})
      localStorage.setItem('access', res.data.access)
      localStorage.setItem('refresh', res.data.refresh)
      localStorage.setItem('user', res.data.user)
      navigate('/learn')
    } catch (error) {
        alert(error)
    } finally{
      setLoading(false)
    }

  }

  const linkToRegister = () => {
    navigate('/register')
  }

  const content = loading ? <Loader/> :  (
    <div className='login'>
      <form action="" onSubmit={loginUser} className='login-form'>
        <h1>Log in</h1>
        <h2><Link to='/'>Asoro</Link></h2>
        <input type="text" required={true} name="username" 
          className='username'
          value={username} 
          onChange={(e)=>setUsername(e.target.value)} 
          placeholder="Enter Username"
        />

        <input type="password" name="password" 
          className='password'
          required={true}
          value={password} 
          placeholder="Enter Password"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button type="submit" className='login-button'>Login{/*name*/}</button>

        <p className='link-to-register'>Not a member? <span onClick={linkToRegister}>Sign up here.</span></p>
      </form>
    </div>)
    return(content)
}

export default Login
