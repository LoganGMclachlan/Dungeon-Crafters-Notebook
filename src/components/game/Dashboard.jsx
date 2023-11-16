import { useEffect, useState, useCallback } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { db } from '../../config/firebase'
import { getDoc, doc, getDocs, collection } from 'firebase/firestore'
import EditDetails from './EditDetails'
import Blocks from './Blocks'

export default function Dashboard({user}){
    const location = useLocation()
    const [tabSelected, setTabSelected] = useState("details")
    const [game,setGame] = useState({"title":"Loading...","colour":"red"})
    const [blocks, setBlocks] = useState([])

    useEffect(() => {
        getGameData()
        getBlockData()
    }, [])

    // gets game info from id
    const getGameData = useCallback(async () => {
        try{
            const rawData = await getDoc(doc(db, "Games", location?.state.gameid))
            const filteredData = {...rawData.data(), id: rawData.id}
            setGame(filteredData)
        }
        catch(err){console.error(err)}
    })

    // gets list of blocks belonging to game
    const getBlockData = useCallback(async () => {
        try{
            const rawData = await getDocs(collection(db, "Blocks"))
            const filteredData = rawData.docs.map(doc => ({
                ...doc.data(), id: doc.id
            }))
            setBlocks(filteredData.filter(block => block.gameid !== game.id))
        }
        catch(err){console.error(err)}
    })

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
        {game.title !== "Loading..." &&
        <>
        {tabSelected === "details" && <EditDetails game={game} setGame={setGame}/>}
        
        {tabSelected === "blocks" && <Blocks blocks={blocks} setBlocks={setBlocks} gameId={game.id}/>}
        </>
        }
    </div>
    </>

    : <h1 className='menu'>You must first <Link to="/login">login</Link> to access this page</h1>
    }
    </>
    )
}