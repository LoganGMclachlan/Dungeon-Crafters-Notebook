import { useState } from "react"
import { db } from "../../config/firebase"
import { deleteDoc, doc } from "firebase/firestore"
import { useEffect } from "react"
import BlockOptions from "./BlockOptions"
import BlockEditor from "./BlockEditor"
import { htmlToText } from "html-to-text"

export default function FolderList({block,setBlocks,close,blocks,colour,gameId,
    links,setLinks,select,setPlacements,boards,placements}){
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
            let filtered = [...links].filter(link => link.id !== linkId)
            setLinks(filtered)
            deleteLinkFromDownload(filtered)
        }
        catch(error){
            console.error(error)
            alert("Something went wrong, try again later.")
        }
    }

    const deleteLinkFromDownload = filtered => {
        let localValue = JSON.parse(localStorage.getItem("SAVED_GAMES"))
        if(localValue === null) return
        localValue.map(game => {
            if(game.game.id === gameId){game.links = filtered}
            return game
        })
        localStorage.setItem("SAVED_GAMES", JSON.stringify(localValue))
    }
    
    return(
    <div className="block">
        <BlockOptions colour={colour} gameId={gameId} data={[title,content]} setContent={setContent}
            blocks={[blocks,setBlocks]} boards={boards} links={[links,setLinks]}
            close={close} blockLinks={blockLinks} block={block} placements={[placements,setPlacements]}/>

        <button className="x-btn" onClick={handleClose}>X</button>
        <input
            value={title}
            className="block-title"
            onChange={e => setTitle(e.target.value)}/><br/>

            {navigator.onLine
            ? <BlockEditor content={content} setContent={setContent}/>
            : <textarea 
                value={htmlToText(content,{wordwrap: 80})}
                className="block-content"/>
            }

        <p className="related-blocks"><b>Related: </b>{blockLinks.map(link => 
        <span key={link.id}>
            <span onClick={() => select(link)}>{link.title}</span>
            <label onClick={() => deleteLink(link.linkId,link.title)}>X</label>
        </span>
        )}</p>
    </div>
    )
}