import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { lazy } from 'react'
import Layout from './components/Layout'
import Home from './components/home/Home'
import NoPage from './components/NoPage'
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
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home user={user} logout={() => setUser(null)}/>}/>
        <Suspense fallback="Loading Page...">
          <Route path="login" element={<Login setUser={setUser}/>}/>
          <Route path="register" element={<Register setUser={setUser}/>}/>
          <Route path="dashboard" element={<Dashboard user={user}/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Suspense>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}
