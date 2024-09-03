import { addDoc, collection } from "firebase/firestore"
import { useState } from "react"
import { db } from "../../config/firebase"
import Alert from "../Alert"
import ReactDOM from 'react-dom'
import useAlert from "../Alert"

export default function NewFolder({setFolders, folders, gameId}){
    const [title, setTitle] = useState("")
    const [showForm,setShowForm] = useState(false)

    async function addNewFolder(e){
        e.preventDefault()
        // prevents invalid folder titles from being added
        if(title === ""){useAlert("Enter a title for this folder!","warning"); return}
        if(title.length > 25){
            useAlert("Folder title is too long, shorten to 25 characters ir less!","warning")
            return
        }

        try{
            // adds new folder to firebase collection
            await addDoc(collection(db, "Folders"), {
                "title":title,
                "gameid":gameId
            })
            .then(docRef => {
                setFolders([...folders,{"id":docRef.id,"title":title,"gameid":gameId}])
            })
            
            setTitle("")
            setShowForm(false)
        }
        // logs any errors and alerts user of failure
        catch(error){
            console.error(error)
            useAlert("Cannot create folder at this time, try again later!","failure")
        }
    } 

    return(
    <>
        {showForm &&
            <form onSubmit={e => addNewFolder(e)} className="new-folder">
                <input
                    placeholder="Folder title..."
                    className="form-input"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                /><br/>
                <button type="submit" className="form-btn">Create Folder</button><br/>
                <button onClick={() => setShowForm(false)} className="form-btn"
                    style={{"backgroundColor":"red"}}>Cancel</button>
            </form>
        }
        
        <button className="form-btn" onClick={() => setShowForm(true)}>New Folder</button>
    </>
    )
}