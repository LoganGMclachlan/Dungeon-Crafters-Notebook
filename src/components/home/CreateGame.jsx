import { useState } from "react"

export default function CreateGame({userId}){
    const [title, setTitle] = useState("")

    function NewGame(){
        if(title === ""){
            alert("Enter a title for your game.")
            return
        }

        // create new game property with title & default values
        // upload to firebase
        // go to game dashboard, pass game as state
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