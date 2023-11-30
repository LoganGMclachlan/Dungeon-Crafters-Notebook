import React, { useState } from 'react'
import GoogleLogin from './GoogleLogin'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { useNavigate } from 'react-router-dom'


export default function Register({setUser}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    async function Register(e){
        e.preventDefault()
        if(email === "" || password === ""){
            alert("Email or password is empty.")
            return
        }
        if(password.length < 6){
            alert("Password must be at least 6 characters long.")
            return
        }
        if(password !== confirmPassword){
            alert("Passwords do not match.")
            return
        }

        try{
            await createUserWithEmailAndPassword(auth, email, password)
            setUser(auth.currentUser)
            navigate("/")
        }
        catch(err){ console.error(err); alert("Email is not valid.") }
    }

    return(
    <>
        <GoogleLogin setUser={setUser}/>
        <form onSubmit={e => Register(e)}>
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
            <input
                placeholder='confirm password...'
                onChange={e => setConfirmPassword(e.target.value)}
                className='form-input'
                type='password'
            /><br/>
            <button type='submit' className='form-btn'>Register</button>
        </form>
    </>
    )
}