import { useState } from "react"
import { db } from "../../config/firebase"
import { updateDoc, doc, deleteDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import JSZip from "jszip"
import { saveAs } from "file-saver"
import useAlert from "../Alert"

export default function EditDetails({game,setGame,details}){
    const navigate = useNavigate()
    const [newTitle, setNewTitle] = useState(game.title)
    const [newColour, setNewColour] = useState(game.colour)

    const SaveDetails = async e => {
        e.preventDefault()
        if (newTitle === ""){useAlert("Enter a title for your game!","warning"); return}

        try{
            await updateDoc(
                doc(db, "Games", game.id),
                {title:newTitle,colour:newColour}
            )
            setGame({...game,title:newTitle,colour:newColour})
        }
        catch(error){console.error(error)}
    }

    const deleteGame = async () => {
        if(!window.confirm("Are you sure you want to delete this game?")) return
        try{
            // deletes all game blocks, folders, links, & boards
            details.map((info, i) => {
                console.log(info)
                switch (i) {    
                    case 0:
                        info.map(async block => {await deleteDoc(doc(db,"Blocks",block.id)); console.log("Deleted block: " + block.title)})
                        break;
                    case 1:
                        info.map(async folder => {await deleteDoc(doc(db,"Folders",folder.id)); console.log("Deleted folder: " + folder.title)})
                        break;
                    case 2:
                        info.map(async link => {await deleteDoc(doc(db,"Links",link.id)); console.log("Deleted link: " + link.id)})
                        break;
                    case 3:
                        info.map(async board => {await deleteDoc(doc(db,"Boards",board.id)); console.log("Deleted board: " + board.title)})
                        break;
                    case 4:
                        info.map(async placement => {await deleteDoc(doc(db,"Placements",placement.id)); console.log("Deleted placement: " + placement.id)})
                        break;
                }
            })

            await deleteDoc(doc(db, "Games", game.id))
            console.log("Deleted game: " + game.title)
            navigate("/")
        }
        catch(error){
            useAlert("Cannot delete game at this time, try again later!","failure")
            console.error(error)}
    }

    const handleDownload = () => {
        const zip = new JSZip()
        details[0].map(block => zip.file(`${block.title}.html`,block.content))

        const getDate = () => {
            const date = new Date();
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        }

        zip.generateAsync({type:"blob"}).then(data => {
            saveAs(data,`${game.title}_data_${getDate()}.zip`)
        })
    }

    return(
        <div className="menu">
            <div className="container details">
                <h1>Game Details</h1>
                <form onSubmit={e => SaveDetails(e)}>
                    <input
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                        className='form-input'
                        placeholder="Enter a title..."
                    /><br/>

                    <select onChange={e => setNewColour(e.target.value)}
                        className='form-input' value={newColour}>
                        <option disabled>Select a Colour</option>
                        <option value="red">Red</option>
                        <option value="yellow">Yellow</option>
                        <option value="greenyellow">Green</option>
                        <option value="lightskyblue">Blue</option>
                        <option value="grey">Grey</option>
                        <option value="rgb(155, 3, 155)">Purple</option>
                    </select><br/>

                    <div className="details-buttons">
                        <button type='submit' className='form-btn'>Save Details</button>
                        <button className='form-btn' onClick={() => navigate("/")}>Exit Game</button>
                        <button className='form-btn red' onClick={deleteGame}>Delete Game</button>
                        <button className='form-btn' onClick={handleDownload}>Download Game</button>
                    </div>
                </form>
                
            </div>
        </div>
    )
}