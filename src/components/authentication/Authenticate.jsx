import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Register from './Register'
import Login from './Login'

export default function Authenticate({user,setUser}){
    const [tabSelected, setTabSelected] = useState("login")

    return(
    <div className='menu'>
    {!user
        ?
        <div>
            <div className='tab-container'>
                {tabSelected === "login"
                ?<button className='tab wide selected' style={{"borderTopLeftRadius":"10px"}}>Login</button>
                :<button className='tab wide' onClick={() => setTabSelected("login")}>Login</button>
                }
                {tabSelected === "register"
                ?<button className='tab wide selected' style={{"borderTopRightRadius":"10px"}}>Register</button>
                :<button className='tab wide' onClick={() => setTabSelected("register")}>Register</button>
                }
            </div>
            <div className='container'>
                {tabSelected === "login" &&
                    <Login setUser={setUser}/>
                }
                {tabSelected === "register" &&
                    <Register setUser={setUser}/>
                }
            </div>
        </div>

        :
        <>
            <h1>You are already logged in</h1>
            <p><Link to="/">Return</Link></p>
        </>
    }
    </div>
    )
}