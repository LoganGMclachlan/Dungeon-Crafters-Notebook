import BlockList from "./BlockList"
import Accordion from "react-bootstrap/Accordion";

export default function FolderList({folders,setFolders,blocks,setBlocks,select}){

    function newBlock(){
        // TODO
    }

    function deleteFolder(){
        // TODO
    }

    return(
        <Accordion className="accordion-container">
        {folders.map(folder =>
            <Accordion.Item key={folder.id} eventKey={folder.id} style={{"border":"1px solid grey"}}>
                <Accordion.Header>{folder.title}</Accordion.Header>
                <Accordion.Body style={{"padding":"10px"}}>
                    <div>
                    <BlockList blocks={blocks.filter(block => block.folderid === folder.id)} select={select}/>
                    <span>
                    <button style={{"width":"45%"}}>New Block</button>
                    <button style={{"width":"55%","backgroundColor":"red"}}>Delete Folder</button>
                    </span> 
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        )}
        </Accordion>
    )
}