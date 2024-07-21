import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import api from "./api";


const RequireAuth = () => {
  const token = localStorage.getItem('access')
  const [isAuthorized, setIsAuthorized] = useState<null | boolean>(null)
  useEffect(()=> {
    auth().catch(()=> {setIsAuthorized(false)}
  )
  },[])

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh')
    try {
      const res = await api.post('/api/token/refresh/', {refresh: refreshToken})
      if (res.status=== 200) {
        localStorage.setItem('access', res.data.access)
        setIsAuthorized(true)
        return <Outlet/>
      } else{
        setIsAuthorized(false)
      }
    } catch (error) {
      setIsAuthorized(false)
    }
  }

  const auth = async () => {
    if (!token) {
      setIsAuthorized(false)
      return
    }
    const decoded = jwtDecode(token)
    const tokenExpiration = decoded.exp || -1
    const now = Date.now() / 1000
    if (tokenExpiration < now) {
      await refreshToken()
    } else {
      setIsAuthorized(true)
    }
  }

  const location = useLocation()
  if (isAuthorized === null) {
    return <></>
  }
  return (
    <div>
      {isAuthorized ? <Outlet/> : <Navigate to="/login" state={{from: location}} replace />}
    </div>
  )
}

export default RequireAuth
