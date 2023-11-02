import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Dashboard({user}){
    const location = useLocation()
    const game = location.state?.game

    return(
    <>
    {user
        ?
        <div>
            <h1>Dashboard</h1>
            <p>{game.title}</p>
        </div>

        :
        <>
            <h1>You must first login to access this page</h1>
        </>
    }
    </>
    )
}