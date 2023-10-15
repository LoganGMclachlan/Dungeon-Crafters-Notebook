import React from 'react'

export default function Register({user,setUser}){
    return(
    <>
    {!user
        ?
        <div>
            <h1>Register</h1>
        </div>

        :
        <>
            <h1>You are already logged in</h1>
            <p>Return</p>
        </>
    }
    </>
    )
}