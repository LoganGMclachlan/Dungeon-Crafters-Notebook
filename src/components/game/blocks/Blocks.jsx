import { useEffect, useState } from "react"
import FolderList from "./FolderList"
import Block from "./Block"
import NewFolder from "./NewFolder"
import SearchBlocks from "./SearchBlocks"
import "./blocks.css"

export default function Blocks({blocks,gameId,setBlocks,folders,setFolders,
    colour,links,setLinks,setPlacements,boards,placements}){
    const [selected, setSelected] = useState(() => {
        const localValue = localStorage.getItem("SELECTED_BLOCKS")
        if (JSON.parse(localValue) === null) return []
        return JSON.parse(localValue)
    })

    useEffect(() => {localStorage.setItem("SELECTED_BLOCKS", JSON.stringify(selected))}, [selected])
    
    const newBlock = folderId => {
        addSelected({   // create new block object and adds it to selected
            "title":"New Block",
            "content":"",
            "gameid":gameId,
            "folderid":folderId,
            "new":true  // temporary prop, deleted when saved
        })
    }

    // functions to add and remove blocks from selected list
    const addSelected = block => {
        if(!selected.includes(block) && selected.length < 2){
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
            <Block key={block.id} block={block} blocks={blocks} colour={colour} gameId={gameId} setLinks={setLinks}
                setBlocks={setBlocks} close={() => removeSelected(block.id)} links={links} select={addSelected}
                setPlacements={setPlacements} boards={boards} placements={placements}/>
        )}
        </div>
    </div>
    )
}