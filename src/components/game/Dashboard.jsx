import React from 'react'

export default function Dashboard({user}){
    return(
    <>
    {user
        ?
        <div>
            <h1>Dashboard</h1>
        </div>

        :
        <>
            <h1>You must first login to access this page</h1>
        </>
    }
    </>
    )
}