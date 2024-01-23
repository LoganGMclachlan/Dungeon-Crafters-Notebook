import { deleteDoc, doc } from "firebase/firestore";
import BlockList from "./BlockList"
import Accordion from "react-bootstrap/Accordion";
import { db } from "../../config/firebase";

export default function FolderList({folders,blocks,select,newBlock,setFolders,gameId}){

    async function deleteFolder(folder){
        if(!navigator.onLine){ alert("Cannot delete folders while offline"); return}
        if(!window.confirm("Are you sure want to delete this folder & its blocks?")){ return }

        // gets all blocks with folder id
        const folderBlocks = blocks.filter(block => block.folderid === folder.id)
        try{
            // deletes all blocks within folder
            folderBlocks.map(async block => {
                await deleteDoc(doc(db, "Blocks", block.id))
            })
            // deletes folder
            await deleteDoc(doc(db, "Folders", folder.id))
            // filters folders
            setFolders(folders.filter(f => f.id !== folder.id))
            updateDownload(folder)
        }
        // logs errors and alerts user of failure
        catch(error){
            console.error(error)
            alert("Failed to delete this folder, try again later.")
        }
    }

    const updateDownload = folder => {
        let localValue = JSON.parse(localStorage.getItem("SAVED_GAMES"))
        if(localValue === null) return
        localValue.map(game => {
            if(game.game.id === gameId){game.folders = [...game.folders.filter(f => f.id !== folder.id)]}
        })
        localStorage.setItem("SAVED_GAMES", JSON.stringify(localValue))
    }

    return(
        <Accordion className="accordion-container">
        {folders.map(folder =>
            <Accordion.Item key={folder.id} eventKey={folder.id} style={{"border":"1px solid grey"}}>
                <Accordion.Header>{folder.title}</Accordion.Header>
                
                <Accordion.Body style={{"paddingTop":"20px","paddingLeft":"8px","paddingRight":"8px"}}>
                    <BlockList blocks={blocks.filter(block => block.folderid === folder.id)} select={select}/>
                    
                    <span className="folder-btn">
                        <button
                            onClick={() => newBlock(folder.id)}>New Block</button>

                        <button style={{"backgroundColor":"red"}}
                            onClick={() => deleteFolder(folder)}>Delete Folder</button>
                    </span>
                </Accordion.Body>
            </Accordion.Item>
        )}
        </Accordion>
    )
}