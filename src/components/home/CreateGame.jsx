import { useState } from "react"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../../config/firebase"
import { useNavigate } from "react-router-dom"
import useAlert from "../Alert"

export default function CreateGame({userId}){
    const [title, setTitle] = useState("")
    const navigate = useNavigate()

    async function NewGame(){
        if(title === ""){useAlert("Enter a title for your game!","warning");return}

        try{
            await addDoc(collection(db, "Games"), {
                "title":title,
                "userid": userId,
                "colour":"red"
            }).then(docRef => {
                localStorage.setItem("SELECTED_BLOCKS", "[]")
                localStorage.setItem("SELECTED_BOARD", "")
                navigate("/dashboard", {state:{gameid:docRef.id}})
            })
            
        }
        catch(err){console.error(err)
            ReactDOM.render(<Alert message="Cannot create game at this time, try again later!" type="failure"/>, 
                document.getElementById("alert-container"))}
    }

    return (
        <>
            <h1>Create a New Game</h1>
            <input
                placeholder="Title..."
                onChange={e => setTitle(e.target.value)}
                className='form-input'
            />
            <button onClick={() => NewGame()} className='form-btn'>Create</button>
        </>
    )
}