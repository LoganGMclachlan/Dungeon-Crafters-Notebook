import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'
const About = lazy(() => import('./About'))
const Account = lazy(() => import('./Account'))

export default function Home({user,logout}){
    const [tabSelected, setTabSelected] = useState("select_game")

    return(
    <div className='menu'>
    {user
        ?
        <>
            <div className='tab-container'>
                {tabSelected === "select_game"
                ?<button className='tab selected'>Select Game</button>
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
                ?<button className='tab selected'>About</button>
                :<button className='tab' onClick={() => setTabSelected("about")}>About</button>
                }
            </div>
            <div>
                <h1>Home</h1>
                <Suspense fallback="Loading Tab...">
                    {tabSelected === "select_game" &&
                    <>
                        <h1>Select a Game</h1>
                    </>
                    }

                    {tabSelected === "create_game" &&
                    <>
                        <h1>Create a Game</h1>
                    </>
                    }

                    {tabSelected === "about" && <About/>}

                    {tabSelected === "account" && <Account user={user} logout={logout}/>}
                </Suspense>
            </div>
        </>

        :
        <>
            <h1>Welcome</h1>
            <p><Link to="login">Login</Link> to start creating</p>
        </>
    }
    </div>
    )
}