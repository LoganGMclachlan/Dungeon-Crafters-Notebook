import { useState } from "react"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../../config/firebase"

export default function CreateGame({userId, goto}){
    const [title, setTitle] = useState("")

    async function NewGame(){
        if(title === ""){
            alert("Enter a title for your game.")
            return
        }
        if(title === "Loading..."){
            alert("Invalid game title.")
            return
        }

        try{
            await addDoc(collection(db, "Games"), {
                "title":title,
                "userid": userId,
                "colour":"red"
            })
            goto("select_game")
        }
        catch(err){console.error(err)}
    }

    return (
        <>
            <h1>Create a Game</h1>
            <input
                placeholder="Title..."
                onChange={e => setTitle(e.target.value)}
                className='form-input'
            /><br/>
            <button onClick={() => NewGame()} className='form-btn'>Create</button>
        </>
    )
}