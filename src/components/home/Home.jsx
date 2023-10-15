import React from 'react'

export default function Home({user,logout}){
    return(
    <div className='menu'>
    {user
        ?
        <>
            <h1>Home</h1>
            <p>{user.email}</p>
        </>

        :
        <>
            <h1>Not logged in, login</h1>
        </>
    }
    </div>
    )
}