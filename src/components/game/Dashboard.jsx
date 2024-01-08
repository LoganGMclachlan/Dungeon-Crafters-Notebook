import { useEffect, useState, useCallback } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { db } from '../../config/firebase'
import { getDoc, doc, getDocs, collection } from 'firebase/firestore'
import EditDetails from './EditDetails'
import Blocks from './Blocks'
import Navbar from './Navbar'

export default function Dashboard({user}){
    const location = useLocation()
    const [tabSelected, setTabSelected] = useState("blocks")
    const [game,setGame] = useState({"title":"Loading...","colour":"red"})
    const [blocks, setBlocks] = useState([])
    const [links, setLinks] = useState([])
    const [boards, setBoards] = useState([])
    const [folders, setFolders] = useState([])

    useEffect(() => {
        getGameData()
        getBlockData()
        getFolderData()
        getLinkData()
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
            setBlocks(filteredData.filter(block => block.gameid === location?.state.gameid))
        }
        catch(err){console.error(err)}
    })

    const getFolderData = useCallback(async () => {
        try{
            const rawData = await getDocs(collection(db, "Folders"))
            const filteredData = rawData.docs.map(doc => ({
                ...doc.data(), id: doc.id
            }))
            setFolders(filteredData.filter(folder => folder.gameid === location?.state.gameid))
        }
        catch(err){console.error(err)}
    })

    const getLinkData = useCallback(async () => {
        try{
            const rawData = await getDocs(collection(db,"Links"))
            const filteredData = rawData.docs.map(doc => ({
                ...doc.data(), id: doc.id
            }))
            setLinks(filteredData.filter(link => link.gameid === location?.state.gameid))
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
        {game.title !== "Loading..." &&
        <>
        {tabSelected === "details" &&  
            <EditDetails game={game} setGame={setGame} details={[blocks,folders,links,boards]}/>}
        
        {tabSelected === "blocks" && 
            <Blocks blocks={blocks} setBlocks={setBlocks} colour={game.colour} setLinks={setLinks}
                gameId={game.id} folders={folders} setFolders={setFolders} links={links}/>}
        </>
        }
    </div>
    </>

    : <h1 className='menu'>You must first <Link to="/login">login</Link> to access this page</h1>
    }
    </>
    )
}