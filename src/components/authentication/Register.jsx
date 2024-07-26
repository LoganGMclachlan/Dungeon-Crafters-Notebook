import React, { useState } from 'react'
import GoogleLogin from './GoogleLogin'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { useNavigate } from 'react-router-dom'
import Alert from '../Alert'
import ReactDOM from 'react-dom'

export default function Register({setUser}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const checkPassword = () => {
        if(email === ""){
            ReactDOM.render(<Alert message="You must provide an email!" type="warning"/>, 
                document.getElementById("alert-container"))
            return false
        }
        if(password.length < 8){
            ReactDOM.render(<Alert message="Password must be at least 8 characters long!" type="warning"/>, 
                document.getElementById("alert-container"))
            return false
        }
        if(!/[A-Z]/.test(password)){
            ReactDOM.render(<Alert message="Password must contain at least one uppercase letter!" type="warning"/>, 
                document.getElementById("alert-container"))
            return false
        }
        if(!/[^A-Za-z0-9]/.test(password)){
            ReactDOM.render(<Alert message="Password must contain at least one special character!" type="warning"/>, 
                document.getElementById("alert-container"))
            return false
        }
        if(password !== confirmPassword){
            ReactDOM.render(<Alert message="Passwords do not match!" type="warning"/>, 
                document.getElementById("alert-container"))
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
        catch(err){console.error(err)
            ReactDOM.render(<Alert message="Failed to create account, check your email is correct!" type="Failure"/>, 
                document.getElementById("alert-container"))}
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