import { useCallback, useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import EditDetails from './EditDetails'
import { db } from "../../config/firebase"
import { getDoc, doc } from "firebase/firestore"

export default function Dashboard({user}){
    const location = useLocation()
    const [game, setGame] = useState()
    const [tabSelected, setTabSelected] = useState("details")

    useEffect(() => {
        // gets game info when component loads
        getGameInfo()
    }, [])

    const getGameInfo = useCallback(async () => {
        try{
            const rawData = await getDoc(doc(db, "Games", location.state?.gameid))
            const filteredData = {...rawData.data(), id: rawData.id}
            setGame(filteredData)
        }
        catch(err){console.error(err)}
    })


    return(
    <>
    {user
    ?
    <>
    {game &&
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
    }
    </>

    : <h1 className='menu'>You must first <Link to="/login">login</Link> to access this page</h1>
    }
    </>
    )
}