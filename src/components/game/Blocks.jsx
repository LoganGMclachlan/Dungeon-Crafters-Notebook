import { useEffect, useState, useCallback } from "react"
import { db } from '../../config/firebase'
import { getDocs, collection } from 'firebase/firestore'
import FolderList from "./FolderList"
import Block from "./Block"

export default function Blocks({blocks,setBlocks,gameId}){
    const [folders, setFolders] = useState([])
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        getFolderData()
    }, [])

    const getFolderData = useCallback(async () => {
        try{
            const rawData = await getDocs(collection(db, "Folders"))
            const filteredData = rawData.docs.map(doc => ({
                ...doc.data(), id: doc.id
            }))
            console.log(filteredData)
            setFolders(filteredData.filter(folder => folder.gameid !== gameId))
        }
        catch(err){console.error(err)}
    })

    return(
        <div style={{"display":"flex"}}>
            <div className="folderList">
                <h2>Your Blocks</h2>
                {folders.length > 0 &&
                <FolderList folders={folders} setFolders={setFolders}
                    blocks={blocks} setBlocks={setBlocks}
                    select={setSelected}/>
                }
                <input placeholder="Folder title..." className="form-input"/>
                <button className="form-btn" style={{"marginBottom":"10px","width":"85%","padding":"5px"}}>
                    New Folder</button>
            </div>
            <div className="block">
                {selected && <Block block={selected}/>}
            </div>
        </div>
    )
}