import  { useEffect, useState, useCallback } from "react"
import { db } from "../../config/firebase"
import { getDoc, doc } from "firebase/firestore"

const useFetchData = (gameId) => {
    const [status, setStatus] = useState('idle');
    const [game, setGame] = useState({"title":"Loading...","colour":"red"})
    const [folders, setFolders] = useState([])
    const [blocks, setBlocks] = useState([])

    const fetchData = useCallback(() => {
        getGameData()
        // getFolderData()
        // getBlockData()
    }, []);

    useEffect(() => {
        fetchData()
    }, [fetchData])

    async function getGameData(){
        try{
            const rawData = await getDoc(doc(db, "Games", gameId))
            const filteredData = {...rawData.data(), id: rawData.id}
            setGame(filteredData)
        }
        catch(err){console.error(err)}
    }

    async function getFolderData(){

    }

    return { status, game, folders, blocks }
}

export default useFetchData