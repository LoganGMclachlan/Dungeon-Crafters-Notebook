import { useEffect, useState, useCallback } from "react"
import { db } from '../../config/firebase'
import { getDocs, collection } from 'firebase/firestore'
import FolderList from "./FolderList"
import Block from "./Block"
import NewFolder from "./NewFolder"

export default function Blocks({blocks,gameId,getBlockData}){
    const [folders, setFolders] = useState([])
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        getFolderData()
    }, [])

    const getFolderData = useCallback(async () => {
        try{
            console.log(gameId)
            const rawData = await getDocs(collection(db, "Folders"))
            const filteredData = rawData.docs.map(doc => ({
                ...doc.data(), id: doc.id
            }))
            console.log(filteredData)
            setFolders(filteredData.filter(folder => folder.gameid === gameId))
        }
        catch(err){console.error(err)}
    })

    
    async function newBlock(folderId){
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
                <h2>Your Blocks</h2>
                {folders.length > 0 &&
                <FolderList folders={folders} blocks={blocks} select={setSelected}
                    getFolderData={getFolderData} newBlock={newBlock}/>
                }

                <NewFolder getFolderData={getFolderData} gameId={gameId}/>
            </div>

            {selected && <Block block={selected}/>}
        </div>
    )
}