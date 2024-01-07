import { useState } from "react"
import { db } from "../../config/firebase"
import { updateDoc, doc, deleteDoc } from "firebase/firestore"
import { Link, useNavigate } from "react-router-dom"

export default function EditDetails({game,setGame,details}){
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
            // deletes all game blocks, folders, links, & boards
            details.map((info, i) => {
                console.log(info)
                switch (i) {    
                    case 0:
                        info.map(async block => await deleteDoc(doc(db,"Blocks",block.id)))
                        break;
                    case 1:
                        info.map(async folder => await deleteDoc(doc(db,"Folders",folder.id)))
                        break;
                    case 2:
                        info.map(async link => await deleteDoc(doc(db,"Links",link.id)))
                        break;
                    case 3:
                        info.map(async board => await deleteDoc(doc(db,"Boards",board.id)))
                        break;
                }
            })

            await deleteDoc(doc(db, "Games", game.id))
            navigate("/")
        }
        catch(error){
            alert("there was a problem deleting this game try again later.")
            console.error(error)}
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
                        <option value="rgb(155, 3, 155)">Purple</option>
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