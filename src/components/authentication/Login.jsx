import React, { useState } from 'react'
import GoogleLogin from './GoogleLogin'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { useNavigate } from 'react-router-dom'

export default function Login({setUser}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function Login(e){
        e.preventDefault()
        if(email === "" || password === ""){
            alert("Email or password is empty.")
            return
        }

        try{
            await signInWithEmailAndPassword(auth, email, password)
            setUser(auth.currentUser)
            navigate("/")
        }
        catch(err){ console.error(err); alert("Incorrect email or password.") }
    }

    return(
    <>
        <GoogleLogin setUser={setUser}/>
        <p style={{"marginBottom":"0px"}}>or</p>
        <form onSubmit={e => Login(e)}>
            <input
                placeholder='email...'
                onChange={e => setEmail(e.target.value)}
                className='form-input'
            /><br/>
            <input
                placeholder='password...'
                onChange={e => setPassword(e.target.value)}
                className='form-input'
                type='password'
            /><br/>
            <button type='submit' className='form-btn'>Login</button>
        </form>
    </>
    )
}