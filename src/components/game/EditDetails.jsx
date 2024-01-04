import { useState } from "react"
import { db } from "../../config/firebase"
import { updateDoc, doc, deleteDoc } from "firebase/firestore"
import { Link, useNavigate } from "react-router-dom"

export default function EditDetails({game,setGame}){
    const navigate = useNavigate()
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

    async function deleteGame(){
        if(!window.confirm("Are you sure you want to delete this game?")){return}

        try{
            await deleteDoc(doc(db, "Games", game.id))
            navigate("/")
        }
        catch(error){console.error(error)}
    }

    return(
        <div className="menu">
            <div className="container details">
                <h1>Details</h1>
                <form onSubmit={e => SaveDetails(e)}>
                    <label>Title:</label>
                    <input
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                        className='form-input'
                    /><br/>
                    <label>Colour:</label>
                    <select onChange={e => setNewColour(e.target.value)}
                        className='form-input' value={newColour}>
                        <option value="red">Red</option>
                        <option value="yellow">Yellow</option>
                        <option value="greenyellow">Green</option>
                        <option value="lightskyblue">Blue</option>
                        <option value="grey">Grey</option>
                    </select><br/>
                    <button type='submit' className='form-btn'>Save Details</button><hr/>
                </form>
                
                <Link to="/"><button className='form-btn' style={{"marginRight":"10px"}}>Exit Game</button></Link>
                <button  className='form-btn' style={{"backgroundColor":"red"}}
                    onClick={() => deleteGame()}>Delete Game</button>
            </div>
        </div>
    )
}