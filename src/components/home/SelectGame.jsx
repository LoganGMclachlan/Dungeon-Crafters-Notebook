import { useState, useEffect, useCallback } from "react"
import { collection, getDocs } from "firebase/firestore"
import GameSnippet from "./GameSnippet"
import { db } from '../../config/firebase'

export default function SelectGame({userId}){
    const [games, setGames] = useState([])
    const [status, setStatus] = useState("ongoing")

    useEffect(() => {getGames()}, [])

    const getGames = useCallback(async () => {
        try{
            let failed = false
            const rawData = await getDocs(collection(db,"Games"))
            .catch(error => console.log(error), failed = true)
            const filteredData = rawData.docs.map(doc => ({
                ...doc.data(), id: doc.id
            }))
            setGames(filteredData.filter(game => game.userid === userId))
            if (failed){setStatus("failed")} else {setStatus("complete")}
        }
        catch(err){console.error(err); setStatus("failed")}
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
            :<p>
                {status === "ongoing" && <>Loading your games...</>}
                {status === "complete" && <>You don't have any games</>}
                {status === "failed" && <>There was an issue loading your games try again later</>}
            </p>}
        </>
    )
}