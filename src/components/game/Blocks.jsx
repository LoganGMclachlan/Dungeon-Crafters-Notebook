import { useState } from "react"
import FolderList from "./FolderList"
import Block from "./Block"
import NewFolder from "./NewFolder"
import SearchBlocks from "./SearchBlocks"

export default function Blocks({blocks,gameId,setBlocks,folders,setFolders}){
    const [selected, setSelected] = useState(null)
    
    function newBlock(folderId){
        // create new block object and sets it as selected
        setSelected({
            "title":"New Block",
            "content":"",
            "gameid":gameId,
            "folderid":folderId,
            "new":true// determines to update old or add new when saved
        })
    }

    return(
        <div style={{"display":"flex"}}>
            <div className="folderList">
                <SearchBlocks select={setSelected} blocks={blocks}/>
                
                {folders.length > 0 &&
                <FolderList folders={folders} blocks={blocks} select={setSelected}
                    newBlock={newBlock} setFolders={setFolders}/>
                }

                <NewFolder setFolders={setFolders} folders={folders} gameId={gameId}/>
            </div>

            {selected && <Block block={selected} blocks={blocks} setBlocks={setBlocks} close={() => setSelected(null)}/>}
        </div>
    )
}