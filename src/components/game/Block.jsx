import { useState } from "react"
import { db } from "../../config/firebase"
import { deleteDoc, doc } from "firebase/firestore"
import { useEffect } from "react"
import BlockOptions from "./BlockOptions"

export default function FolderList({block,setBlocks,close,blocks,colour,gameId,links,setLinks,select}){
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [blockLinks, setBlockLinks] = useState([])

    useEffect(() => {
        setTitle(block.title)
        setContent(block.content)
        setBlockLinks(filterLinks())
    }, [block])    // updates local state data when new block is selceted

    useEffect(() => {
        setBlockLinks(filterLinks())
    }, [links])    // updates selected blocks link data when link array is updated

    const filterLinks = () => {
        let filtered = []
        links.map(link => {
            if(link.block1 === block.id){
                let linked = blocks.filter(b => b.id === link.block2)[0]
                linked.linkId = link.id
                filtered.push(linked)
            } else 
            if(link.block2 === block.id){
                let linked = blocks.filter(b => b.id === link.block1)[0]
                linked.linkId = link.id
                filtered.push(linked)            }
        })
        return filtered
    }

    const handleClose = () => {     // warns user of unsaved changes before closing block
        if(content !== block.content){
            if(!window.confirm("Unsaved changes detected, are you sure you want to continue?")){return}
        }
        close()
    }

    const deleteLink = async (linkId,linkTo) => {
        if(!navigator.onLine){ alert("Cannot delete links while offline"); return}
        if(!window.confirm(`Are you sure you want to delete the link to "${linkTo}"?`)){return}

        try{
            await deleteDoc(doc(db,"Links",linkId))
            let filtered = [...links]
            setLinks(filtered.filter(link => link.id !== linkId))
        }
        catch(error){
            console.error(error)
            alert("Something went wrong, try again later.")
        }
    }

    return(
    <div className="block">
        <BlockOptions colour={colour} gameId={gameId} data={[title,content]} blocks={[blocks,setBlocks]}
            links={[links,setLinks]} close={close} blockLinks={blockLinks} block={block}/>

        <button className="x-btn" onClick={handleClose}>X</button>
        <input
            value={title}
            className="block-title"
            onChange={e => setTitle(e.target.value)}/><br/>
        <textarea
            value={content}
            className="block-content"
            onChange={e => setContent(e.target.value)}/><br/>

        <p className="related-blocks"><b>Related: </b>{blockLinks.map(link => 
        <span key={link.id}>
            <span onClick={() => select(link)}>{link.title}</span>
            <label onClick={() => deleteLink(link.linkId,link.title)}>X</label>
        </span>
        )}</p>
    </div>
    )
}