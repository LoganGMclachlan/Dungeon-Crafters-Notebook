import { useEffect, useState, useCallback } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { db } from '../../config/firebase'
import { getDoc, doc, getDocs, collection, query, where } from 'firebase/firestore'
import EditDetails from './EditDetails'
import Blocks from './blocks/Blocks'
import Navbar from './Navbar'
import Boards from './boards/Boards'
import Guide from './guides/Guide'
import "./game.css"
import { useHotkeys } from 'react-hotkeys-hook'

export default function Dashboard({user}){
    const location = useLocation()
    const [tabSelected, setTabSelected] = useState("blocks")
    const [game,setGame] = useState({"title":null,"colour":"red"})
    const [blocks, setBlocks] = useState([])
    const [links, setLinks] = useState([])
    const [boards, setBoards] = useState([])
    const [placements, setPlacements] = useState([])
    const [folders, setFolders] = useState([])

    useEffect(() => {
        // when page is loaded, fetches all game data from firebase
        getGameData()
        getData("Blocks").then(blocks => setBlocks(blocks))
        getData("Folders").then(folders => setFolders(folders))
        getData("Links").then(links => setLinks(links))
        getData("Boards").then(boards => setBoards(boards))
        getData("Placements").then(placements => setPlacements(placements))
    }, [])

    // enables use of hotkeys for navigating the dashboard
    useHotkeys("shift+1", () => setTabSelected("blocks"))
    useHotkeys("shift+2", () => setTabSelected("boards"))
    useHotkeys("shift+3", () => setTabSelected("details"))
    useHotkeys("shift+4", () => setTabSelected("guide"))

    // gets basic game details (title, colour, ect) from firebase
    const getGameData = useCallback(async () => {
        try{
            const rawData = await getDoc(doc(db, "Games", location?.state.gameid))
            const filteredData = {...rawData.data(), id: rawData.id}
            setGame(filteredData)
        }
        catch(err){console.error(err)}
    })

    // generic function to get some data from firebase
    const getData = useCallback(async collectionName => {
        try{
            const q = query(collection(db,collectionName),where('gameid','==',location?.state.gameid))
            const rawData = await getDocs(q)
            return rawData.docs.map(doc => ({
                ...doc.data(), id: doc.id
            }))
        }
        catch(err){console.error(err)}
    })

    return(
    <>
    {user
    ?
    <>
    <Navbar selected={tabSelected} setSelected={setTabSelected} game={game}/>

    <div>
        {game.title &&
            <>
            {tabSelected === "details" &&  
                <EditDetails game={game} setGame={setGame} 
                    details={[blocks,folders,links,boards,placements]}/>}
            
            {tabSelected === "blocks" && 
                <Blocks blocks={blocks} setBlocks={setBlocks} colour={game.colour} 
                    setLinks={setLinks} boards={boards} gameId={game.id} folders={folders}
                    setFolders={setFolders} links={links} setPlacements={setPlacements}
                    placements={placements}/>}
            
            {tabSelected === "boards" &&
                <Boards boards={boards} setBoards={setBoards} placements={placements} blocks={blocks} gameId={game.id}
                    setPlacements={setPlacements}/>}

            {tabSelected === "guide" && <Guide/>}
            </>
        }
    </div>
    </>

    : <h1 className='menu'>You must first <Link to="/login">login</Link> to access this page</h1>
    }
    </>
    )
}