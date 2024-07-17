import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../context/api'
import '../styles/register.css'
import Loader from './page_components/loader'

const Register = () => {
  
  const [username, setUsername] = useState('')
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()


  let registerUser = async(e: React.ChangeEvent<HTMLFormElement>) =>{
    e.preventDefault()

    setLoading(true)
    try {
      const res = await api.post('/api/user/register/', {'username': username, 'password':password, 'first_name': first, 'last_name': last})
      console.log(res.data)
      localStorage.setItem('access', res.data.access)
      localStorage.setItem('refresh', res.data.refresh)
      navigate('/learn')
    } catch (error) {
        alert(error)
    } finally{
      setLoading(false)
    }

  }

  const linkToLogin = () => {
    navigate('/login')
  }
  

  const content = loading ? <Loader/> :  (
      <div className='register'>
        <form action="" className='login-form' onSubmit={registerUser}>
          <h1>Sign Up</h1>
          <h2><Link to={'/'}>Asoro</Link></h2>


          <div className="personals">
            <input type="text" name="firstname" 
              required={true}
              value={first} 
              onChange={(e)=>setFirst(e.target.value)} 
              placeholder="Enter First Name"
            />
            <input type="text" name="lastname" 
              required={true}
              value={last} 
              onChange={(e)=>setLast(e.target.value)} 
              placeholder="Enter Last Name"
            />
          </div>

        <input type="text" name="username" 
          required={true}
          value={username} 
          className='register-username'
          onChange={(e)=>setUsername(e.target.value)} 
          placeholder="Enter Username"
        />
        

        <input type="password" name="password" 
          required={true}
          value={password} 
          className='register-password'
          placeholder="Enter Password"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button className='register-button' type="submit" >Register</button>
        <p className='link-to-login'>Already have an account? <span onClick={linkToLogin}>Log in here.</span></p>
      </form>
    </div>)
    return(content)
}

export default Register
