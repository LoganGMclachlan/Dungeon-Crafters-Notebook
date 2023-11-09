import { useContext, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import EditDetails from './EditDetails'
import useFetchData from './useFetchData'
import { GameContext, FolderContext, BlockContext } from "./GameContext"

export default function Dashboard({user}){
    const location = useLocation()
    const [tabSelected, setTabSelected] = useState("details")
    const [game, setGame] = useContext(GameContext)
    // const [, setFolders] = useContext(FolderContext)
    // const [blocks, setBlocks] = useContext(BlockContext)

    useEffect(() => {
        configContext()
    },[])

    function configContext(){
        const data = useFetchData(location?.state.gameid)
        if (data.status === "fetched"){
            setGame(data.game)
            // setFolders(data.folders)
            // setBlocks(data.blocks)
        }
    }

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
        {game.title != "Loading..." && tabSelected === "details" && <EditDetails/>}   
    </div>
    </>

    : <h1 className='menu'>You must first <Link to="/login">login</Link> to access this page</h1>
    }
    </>
    )
}