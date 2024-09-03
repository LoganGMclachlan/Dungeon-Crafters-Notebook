import React, { useState } from 'react'
import GoogleLogin from './GoogleLogin'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { useNavigate } from 'react-router-dom'
import useAlert from '../Alert'

export default function Register({setUser}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const checkPassword = () => {
        if(email === ""){
            useAlert("You must provide an email!","warning")
            return false
        }
        if(password.length < 8){
            useAlert("Password must be at least 8 characters long!","warning")
            return false
        }
        if(!/[A-Z]/.test(password)){// ensures pw contains a upper case letter
            useAlert("Password must contain at least one uppercase letter!","warning")
            return false
        }
        if(!/[^A-Za-z0-9]/.test(password)){// ensures pw contains a special character
            useAlert("Password must contain at least one special character!","warning")
            return false
        }
        if(password !== confirmPassword){
            useAlert("Passwords do not match!","warning")
            return false
        }
        return true
    }

    const Register = async e => {
        e.preventDefault()
        if(!checkPassword()){ return }

        try{
            await createUserWithEmailAndPassword(auth, email, password)
            setUser(auth.currentUser)
            navigate("/")
        }
        catch(err){
            console.error(err)
            useAlert("Failed to create account, check your email is correct!","failure")
        }
    }

    return(
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
        <GoogleLogin setUser={setUser}/>
    </form>
    )
}