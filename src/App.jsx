import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from 'react'
import Layout from './components/Layout'
import Home from './components/home/Home'
const NoPage = lazy(() => import('./components/NoPage'))
const Login = lazy(() => import('./components/authentication/Login'))
const Register = lazy(() => import('./components/authentication/Register'))
const Dashboard = lazy(() => import('./components/game/Dashboard'))

export default function App() {
  // gets logged in user from local storage
  const [user, setUser] = useState(() => {
    const localValue = localStorage.getItem("CURRENT_USER")
    if (localValue === null) return null
    return JSON.parse(localValue)
  })

  // saves user to local storage when it changes
  useEffect(() => {
    localStorage.setItem("CURRENT_USER", JSON.stringify(user))
  }, [user])

  return (
    
  <Suspense fallback="Loading Page...">
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home user={user} logout={() => setUser(null)}/>}/>
          <Route path="login" element={<Login user={user} setUser={setUser}/>}/>
          <Route path="register" element={<Register user={user} setUser={setUser}/>}/>
          <Route path="dashboard" element={<Dashboard user={user}/>}/>
          <Route path="*" element={<NoPage/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
  </Suspense>
  )
}
