import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'

export default function Dashboard({user}){
    const location = useLocation()
    const [game, setGame] = useState(location.state?.game)
    const [tabSelected, setTabSelected] = useState("details")

    return(
    <>
    {user
        ?
        <>
        <div className='nav-bar' style={{"backgroundColor":""+game.colour}}>
            <h1 className='nav-title'>{game.title}</h1>
            {tabSelected === "details"
            ?<button className='nav-item' style={{"textDecoration":"underline"}}>Details</button>
            :<button className='nav-item' onClick={() => setTabSelected("details")}>Details</button>
            }
            {tabSelected === "blocks"
            ?<button className='nav-item' style={{"textDecoration":"underline"}}>Blocks</button>
            :<button className='nav-item' onClick={() => setTabSelected("blocks")}>Blocks</button>
            }
            {tabSelected === "boards"
            ?<button className='nav-item' style={{"textDecoration":"underline"}}>Boards</button>
            :<button className='nav-item' onClick={() => setTabSelected("boards")}>Boards</button>
            }
            {tabSelected === "maps"
            ?<button className='nav-item' style={{"textDecoration":"underline"}}>Maps</button>
            :<button className='nav-item' onClick={() => setTabSelected("maps")}>Maps</button>
            }
        </div>

        <div>
            {tabSelected === "details" && <EditDetails game={game} setGame={setGame}/>}
        </div>
        </>

        : <h1 className='menu'>You must first <Link to="/login">login</Link> to access this page</h1>
    }
    </>
    )
}