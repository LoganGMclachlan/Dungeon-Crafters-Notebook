import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import CreateGame from './CreateGame'
import SelectGame from './SelectGame'
const About = lazy(() => import('./About'))
const Account = lazy(() => import('./Account'))
import "./home.css"

export default function Home({user,setUser}){
    const [tabSelected, setTabSelected] = useState("select_game")

    return(
    <div className='menu'>
    {user
        ?
        <>
            <div>
                {tabSelected === "select_game"
                ?<button className='tab selected' style={{"borderTopLeftRadius":"10px"}}>Select Game</button>
                :<button className='tab' onClick={() => setTabSelected("select_game")}>Select Game</button>
                }
                {tabSelected === "create_game"
                ?<button className='tab selected'>Create Game</button>
                :<button className='tab' onClick={() => setTabSelected("create_game")}>Create Game</button>
                }
                {tabSelected === "account"
                ?<button className='tab selected'>Account</button>
                :<button className='tab' onClick={() => setTabSelected("account")}>Account</button>
                }
                {tabSelected === "about"
                ?<button className='tab selected' style={{"borderTopRightRadius":"10px"}}>About</button>
                :<button className='tab' onClick={() => setTabSelected("about")}>About</button>
                }
            </div>
            <div className='container'>
                <Suspense fallback="Loading Tab...">
                    {tabSelected === "select_game" && <SelectGame userId={user.uid}/>}
                    
                    {tabSelected === "create_game" && <CreateGame userId={user.uid} goto={setTabSelected}/>}

                    {tabSelected === "about" && <About/>}

                    {tabSelected === "account" && <Account user={user} setUser={setUser}/>}
                </Suspense>
            </div>
        </>

        :
        <div className='container'>
            <h1>Welcome</h1>
            <p><Link to="login">Login</Link> to start creating</p>
        </div>
    }
    </div>
    )
}