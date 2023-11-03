import { useState } from "react"
import { db } from "../../config/firebase"
import { updateDoc, doc } from "firebase/firestore"
import { Link } from "react-router-dom"

export default function EditDetails({game, setGame}){
    const [newTitle, setNewTitle] = useState(game.title)
    const [newColour, setNewColour] = useState(game.colour)

    async function SaveDetails(e){
        e.preventDefault()
        if (newTitle === ""){
            alert("Please enter a title")
            return
        }

        setGame({...game,title:newTitle,colour:newColour})

        try{
            await updateDoc(
                doc(db, "Games", game.id),
                {title:newTitle,colour:newColour}
            )
        }
        catch(error){console.error(error)}
    }

    return(
        <div className="menu">
            <div className="container">
                <h1>Details</h1>
                <form onSubmit={e => SaveDetails(e)}>
                    <label>Title:</label>
                    <input
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                        className='form-input'
                    /><br/>
                    <label>Colour:</label>
                    <input
                        value={newColour}
                        onChange={e => setNewColour(e.target.value)}
                        className='form-input'
                    /><br/>
                    <button type='submit' className='form-btn'>Save Details</button>
                </form>
                
                <Link to="/"><button className='form-btn'>Exit Game</button></Link><br/>
                <button  className='form-btn' style={{"backgroundColor":"red"}}>Delete Game</button>
            </div>
        </div>
    )
}