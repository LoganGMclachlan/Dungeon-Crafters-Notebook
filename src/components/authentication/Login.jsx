import React from 'react'

export default function Login({user,setUser}){
    return(
    <>
    {!user
        ?
        <div>
            <h1>Login</h1>
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