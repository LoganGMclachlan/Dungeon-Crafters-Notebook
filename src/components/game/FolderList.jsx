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
        <Accordion style={{width:50+'%'}}>
        {folders.map(folder =>
            <Accordion.Item key={folder.id} eventKey={folder.id}>
                <Accordion.Header>{folder.title}</Accordion.Header>
                <Accordion.Body>
                    <div>
                    <BlockList blocks={blocks.filter(block => block.folderid === folder.id)} select={select}/>
                    <button>New Block</button>
                    <button>Delete Folder</button>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        )}
        </Accordion>
    )
}