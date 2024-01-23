import { useState } from "react"
import FolderList from "./FolderList"
import Block from "./Block"
import NewFolder from "./NewFolder"
import SearchBlocks from "./SearchBlocks"
import "./blocks.css"

export default function Blocks({blocks,gameId,setBlocks,folders,setFolders,colour,links,setLinks}){
    const [selected, setSelected] = useState([])
    
    const newBlock = folderId => {
        setSelected({   // create new block object and sets it as selected
            "title":"New Block",
            "content":"",
            "gameid":gameId,
            "folderid":folderId,
            "new":true  // temporary prop, deleted when saved
        })
    }

    // functions to add and remove blocks from selected list
    const addSelected = block => {
        if(!selected.includes(block)){
            setSelected([...selected,block])
        }
    }
    
    const removeSelected = blockId => setSelected([...selected].filter(b => b.id !== blockId))

    return(
    <div style={{"display":"flex"}} className="blocks-container">
        <div className="folderList">
            <SearchBlocks select={addSelected} blocks={blocks}/>
            
            {folders.length > 0 &&
                <FolderList folders={folders} blocks={blocks} select={addSelected}
                    newBlock={newBlock} setFolders={setFolders} gameId={gameId}/>
            }

            <NewFolder setFolders={setFolders} folders={folders} gameId={gameId}/>
        </div>

        <div className="block-list">
        {selected.map(block => 
            <Block block={block} blocks={blocks} colour={colour} gameId={gameId} setLinks={setLinks}
            setBlocks={setBlocks} close={() => removeSelected(block.id)} links={links} select={addSelected}/>

        )}
        </div>
    </div>
    )
}