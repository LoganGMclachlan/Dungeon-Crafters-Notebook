import { addDoc, collection } from "firebase/firestore"
import { useState } from "react"
import { db } from "../../config/firebase"


export default function NewFolder({setFolders, folders, gameId}){
    const [title, setTitle] = useState("")

    async function addNewFolder(e){
        e.preventDefault()
        // prevents invalid folder titles from being added
        if(title === ""){
            alert("Enter a title for your new folder first.")
            return
        }
        if(title.length > 25){
            alert("Folder titles cannot be longer than 25 digits long.")
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
        }
        // logs any errors and alerts user of failure
        catch(error){
            console.error(error)
            alert("Something went wrong and we coudlnt create your folder, please try again later")
        }
    } 


    return(
        <form onSubmit={e => addNewFolder(e)}>
            <input
                placeholder="Folder title..."
                className="form-input"
                style={{"width":"85%","marginBottom":"-5px"}}
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <button className="form-btn" style={{"width":"85%","padding":"5px"}}
                type="submit">New Folder</button>
        </form>
    )
}