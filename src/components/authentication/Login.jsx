import React, { useState } from 'react'
import GoogleLogin from './GoogleLogin'

export default function Login({setUser}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = (e) => {
        e.preventDefault()
        if(email === "" || password === ""){
            alert("Email or password is empty.")
            return
        }


    }

    return(
    <>
        <GoogleLogin setUser={setUser}/>
        <br/><p>or</p>
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
            <button type='submit' className='form-btn'>Login</button>
        </form>
    </>
    )
}