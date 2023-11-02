import { useState, useEffect, useCallback } from "react"
import { collection, getDocs } from "firebase/firestore"
import GameSnippet from "./GameSnippet"
import { db } from '../../config/firebase'

export default function SelectGame({userId}){
    const [games, setGames] = useState([])

    useEffect(() => {
        // gets games info when component loads
        getGames()
    }, [])

    const getGames = useCallback(async () => {
        try{
            const rawData = await getDocs(collection(db,"Games"))
            const filteredData = rawData.docs.map(doc => ({
                ...doc.data(), id: doc.id
            }))
            setGames(filteredData.filter(game => game.userid === userId))
        }
        catch(err){console.error(err)}
    })

    return (
        <>
            <h1>Select a Game</h1>
            {games.length > 0
            ?<div className="snippet-container">
                {games.map(game => 
                    <GameSnippet game={game} key={game.id}/>
                )}
            </div>
            :<p>You don't have any games yet.</p>}
        </>
    )
}