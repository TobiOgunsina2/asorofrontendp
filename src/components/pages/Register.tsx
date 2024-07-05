import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../context/api'

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
  

  const content = loading ? <h1>Loading...</h1> :  (
      <div>
        <h1><Link to={'/'}>Asoro</Link></h1>
      <h1>Create Your Account</h1>
      <form action="" onSubmit={registerUser}>
          <input type="text" name="firstname" 
            value={first} 
            onChange={(e)=>setFirst(e.target.value)} 
            placeholder="Enter First Name"
          />
          <input type="text" name="lastname" 
            value={last} 
            onChange={(e)=>setLast(e.target.value)} 
            placeholder="Enter Last Name"
          />

        <input type="text" name="username" 
          value={username} 
          onChange={(e)=>setUsername(e.target.value)} 
          placeholder="Enter Username"
        />
        

        <input type="password" name="password" 
          value={password} 
          placeholder="Enter Password"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button type="submit" >Register</button>
      </form>
    </div>)
    return(content)
}

export default Register
