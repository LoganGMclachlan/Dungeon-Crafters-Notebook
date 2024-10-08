import { useState } from 'react'
import GoogleLogin from './GoogleLogin'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { useNavigate } from 'react-router-dom'
import useAlert from '../Alert'

export default function Login({setUser}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function Login(e){
        e.preventDefault()
        try{
            await signInWithEmailAndPassword(auth, email, password)
            setUser(auth.currentUser)
            navigate("/")
        }
        catch(err){console.error(err); useAlert("Incorrect email or password!","failure")}
    }

    return(
    <>
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
            <GoogleLogin setUser={setUser}/>
        </form>
    </>
    )
}