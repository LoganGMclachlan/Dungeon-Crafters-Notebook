import { useEffect, useState } from "react"
import { db } from "../../config/firebase"
import { updateDoc, doc, deleteDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

export default function EditDetails({game,setGame,details}){
    const navigate = useNavigate()
    const [newTitle, setNewTitle] = useState(game.title)
    const [newColour, setNewColour] = useState(game.colour)
    const [downloaded, setDownloaded] = useState(false)

    useEffect(() => {checkDownloaded()}, [])

    const checkDownloaded = () => {
        const localValue = localStorage.getItem("SAVED_GAMES")
        if(localValue === null) return
        const savedGames = JSON.parse(localValue)
        savedGames.map(saved => {if(saved.game.id === game.id){setDownloaded(true)}})
    }

    const downloadGame = () => {
        let savedGames = []
        const localValue = localStorage.getItem("SAVED_GAMES")
        if(localValue !== null) savedGames = JSON.parse(localValue)
        savedGames.push({"game":game,"blocks":details[0],"folders":details[1],
                            "links":details[2],"boards":details[3],"placements":details[4]})
        localStorage.setItem("SAVED_GAMES", JSON.stringify(savedGames))
        setDownloaded(true)
        alert(`Downloaded ${game.title}`)
    }

    const removeDownload = () => {
        if(!window.confirm("Remove this game from downloads?")){return}
        const localValue = localStorage.getItem("SAVED_GAMES")
        let savedGames = JSON.parse(localValue)
        savedGames = savedGames.filter(saved => saved.game.id !== game.id)
        localStorage.setItem("SAVED_GAMES", JSON.stringify(savedGames))
        setDownloaded(false)
    }

    const SaveDetails = async e => {
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
            console.log("Delete game: " + game.title)
            navigate("/")
        }
        catch(error){
            alert("there was a problem deleting this game try again later.")
            console.error(error)}
    }

    const exitGame = () => {
        localStorage.setItem("SELECTED_BLOCKS",JSON.stringify(null))
        localStorage.setItem("SELECTED_BOARD",JSON.stringify(null))
        navigate("/")
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

                    <div style={{"display":"flex","gap":"10px","flexWrap":"wrap","justifyContent":"center"}}>
                        <button type='submit' className='form-btn'>Save Details</button>
                        <button className='form-btn' onClick={() => exitGame()}>Exit Game</button>
                        <button className='form-btn red' onClick={() => deleteGame()}>Delete Game</button>
                        {downloaded 
                            ?<button className='form-btn' onClick={() => removeDownload()}>Downloaded</button>
                            :<button className='form-btn' onClick={() => downloadGame()}>Download Game</button>
                        }
                        <small>Download feature not yet fully functional.</small>
                    </div>
                </form>
                
            </div>
        </div>
    )
}