import { deleteDoc, doc } from "firebase/firestore"
import BlockList from "./BlockList"
import Accordion from "react-bootstrap/Accordion"
import { db } from "../../../config/firebase"
import useAlert from "../../Alert"

export default function FolderList({folders,blocks,select,newBlock,setFolders}){

    async function deleteFolder(folder){
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
        }
        // logs errors and alerts user of failure
        catch(error){
            console.error(error)
            useAlert("Cannot delete folder at this time, try again later!","failure")
        }
    }

    return(
        <Accordion className="accordion-container">
        {folders.map(folder =>
            <Accordion.Item id={folder.id} key={folder.id} eventKey={folder.id} style={{"border":"1px solid grey"}}>
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