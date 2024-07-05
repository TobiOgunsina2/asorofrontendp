import React, {useState, useEffect} from 'react'

import { useNavigate } from 'react-router-dom';
import api from '../../context/api';

const Login = () => {

  const [username, setUsername] = useState('')
  
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  let loginUser = async(e: React.ChangeEvent<HTMLFormElement>) =>{
    e.preventDefault()

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

  const content = loading ? <h1>Loading...</h1> :  (
      <div>
      <h1>Login</h1>
      <form action="" onSubmit={loginUser}>
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
        <button type="submit" >Login{/*name*/}</button>
      </form>
    </div>)
    return(content)
}

export default Login
