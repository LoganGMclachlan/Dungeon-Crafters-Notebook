import { deleteDoc, doc } from "firebase/firestore";
import BlockList from "./BlockList"
import Accordion from "react-bootstrap/Accordion";
import { db } from "../../config/firebase";

export default function FolderList({folders,blocks,select,getFolderData}){

    function newBlock(){
        // TODO
    }

    async function deleteFolder(folder){
        // makes user confirm their decision to delete 
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
            // notifies user
            alert("Folders deleted succesfuly")
        }
        // logs errors and alerts user of failure
        catch(error){
            console.error(error)
            alert("Failed to delete this folder, try again later.")
        }
    }

    return(
        <Accordion className="accordion-container">
        {folders.map(folder =>
            <Accordion.Item key={folder.id} eventKey={folder.id} style={{"border":"1px solid grey"}}>
                <Accordion.Header>{folder.title}</Accordion.Header>
                
                <Accordion.Body style={{"padding":"10px"}}>
                    <BlockList blocks={blocks.filter(block => block.folderid === folder.id)} select={select}/>
                    
                    <span>
                        <button style={{"width":"45%"}}>New Block</button>

                        <button style={{"width":"55%","backgroundColor":"red"}}
                            onClick={() => deleteFolder(folder)}>Delete Folder</button>
                    </span>
                </Accordion.Body>
            </Accordion.Item>
        )}
        </Accordion>
    )
}