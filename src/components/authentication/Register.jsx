import React, { useState } from 'react'
import GoogleLogin from './GoogleLogin'

export default function Register({setUser}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const login = (e) => {
        e.preventDefault()
        if(email === "" || password === ""){
            alert("Email or password is empty.")
            return
        }
        if(password !== confirmPassword){
            alert("Passwords do not match.")
            return
        }


    }

    return(
    <>
        <GoogleLogin setUser={setUser}/>
        <p style={{"marginBottom":"0px"}}>or</p>
        <form onSubmit={e => login(e)}>
            <input
                placeholder='email...'
                onChange={e => setEmail(e.target.value)}
                className='form-input'
            /><br/>
            <input
                placeholder='password...'
                onChange={e => setPassword(e.target.value)}
                className='form-input'
            /><br/>
            <input
                placeholder='confirm password...'
                onChange={e => setConfirmPassword(e.target.value)}
                className='form-input'
            /><br/>
            <button type='submit' className='form-btn'>Register</button>
        </form>
    </>
    )
}