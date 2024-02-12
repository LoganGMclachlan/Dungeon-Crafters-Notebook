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
            if(navigator.onLine){
                // fetches data from firebase
                const rawData = await getDocs(collection(db,"Games"))
                .catch(error => console.log(error), failed = true)
                const filteredData = rawData.docs.map(doc => ({
                    ...doc.data(), id: doc.id
                }))
                setGames(filteredData.filter(game => game.userid === userId))
            } else {
                // gets saved data from local storage if user is offline
                const localValue = localStorage.getItem("SAVED_GAMES")
                if (localValue !== null){
                    let savedGames = []
                    JSON.parse(localValue).map(saved => {
                        if (saved.game.userid === userId){
                            savedGames.push(saved.game)
                        }
                    })
                    setGames(savedGames)
                }
            }
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
                <Hint message={selectGame}/>
            </div>
            :<p>
                {status === "ongoing" && <>Loading your games...</>}
                {status === "complete" && <>You don't have any games</>}
                {status === "failed" && <>There was an issue loading your games try again later</>}
                <Hint message={selectGame}/>
            </p>}
        </>
    )
}