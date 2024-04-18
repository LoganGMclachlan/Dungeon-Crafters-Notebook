import { useState, useEffect, useCallback } from "react"
import { collection, getDocs } from "firebase/firestore"
import GameSnippet from "./GameSnippet"
import { db } from '../../config/firebase'
import Hint from "../Hint"
import { selectGame } from "../HintMessages"

export default function SelectGame({userId}){
    const [games, setGames] = useState([])
    const [status, setStatus] = useState("ongoing")

    useEffect(() => {getGames()}, [])

    const getGames = useCallback(async () => {
        try{
            let failed = false
            // fetches data from firebase
            const rawData = await getDocs(collection(db,"Games"))
                .catch(err => {console.log(err); failed = true})
            const filteredData = rawData.docs.map(doc => ({
                ...doc.data(), id: doc.id
            }))

            if(failed){setStatus("failed"); return}
            setStatus("complete")
            setGames(filteredData.filter(game => game.userid === userId))
        }
        catch(err){console.error(err); setStatus("failed")}
    })

    return (
        <>
            <h1 style={{"display":"inline"}}>Select a Game</h1><Hint message={selectGame}/>
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