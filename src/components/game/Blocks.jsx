import { useState } from "react"
import FolderList from "./FolderList"
import Block from "./Block"
import NewFolder from "./NewFolder"
import SearchBlocks from "./SearchBlocks"
import "./blocks.css"

export default function Blocks({blocks,gameId,setBlocks,folders,setFolders,colour,links,setLinks}){
    const [selected, setSelected] = useState(null)
    
    const newBlock = folderId => {
        setSelected({   // create new block object and sets it as selected
            "title":"New Block",
            "content":"",
            "gameid":gameId,
            "folderid":folderId,
            "new":true  // temporary prop, deleted when saved
        })
    }

    return(
    <div style={{"display":"flex"}} className="blocks-container">
        <div className="folderList">
            <SearchBlocks select={setSelected} blocks={blocks}/>
            
            {folders.length > 0 &&
                <FolderList folders={folders} blocks={blocks} select={setSelected}
                    newBlock={newBlock} setFolders={setFolders}/>
            }

            <NewFolder setFolders={setFolders} folders={folders} gameId={gameId}/>
        </div>

        {selected && 
            <Block block={selected} blocks={blocks} colour={colour} gameId={gameId} setLinks={setLinks}
            setBlocks={setBlocks} close={() => setSelected(null)} links={links} select={setSelected}/>
        }
    </div>
    )
}