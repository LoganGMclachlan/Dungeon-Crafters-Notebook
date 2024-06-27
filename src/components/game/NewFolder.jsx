import { addDoc, collection } from "firebase/firestore"
import { useState } from "react"
import { db } from "../../config/firebase"
import Hint from "../Hint"
import { folder } from "../HintMessages"

export default function NewFolder({setFolders, folders, gameId}){
    const [title, setTitle] = useState("")
    const [showForm,setShowForm] = useState(false)

    async function addNewFolder(e){
        e.preventDefault()
        if(!navigator.onLine){ alert("Cannot create folders while offline"); return}
        // prevents invalid folder titles from being added
        if(title === ""){alert("Enter a title for your new folder first."); return}
        if(title.length > 25){alert("Folder titles cannot be longer than 25 digits long."); return}

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
            alert("Something went wrong and we coudlnt create your folder, please try again later")
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