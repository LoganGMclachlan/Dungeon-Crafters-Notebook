import { useState } from "react"
import { db } from "../../../config/firebase"
import { deleteDoc, doc } from "firebase/firestore"
import { useEffect } from "react"
import BlockOptions from "./BlockOptions"
import BlockEditor from "./BlockEditor"
import { useHotkeys } from "react-hotkeys-hook"
import useAlert from "../../Alert"

export default function FolderList({block,setBlocks,close,blocks,colour,gameId,
    links,setLinks,select,setPlacements,boards,placements}){
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [blockLinks, setBlockLinks] = useState([])

    useEffect(() => {
        // updates local state data when new block is selceted
        setTitle(block.title)
        setContent(block.content)
        // setBlockLinks(filterLinks())
    }, [block])

    useEffect(() => {
        // updates selected blocks link data when link array is updated
        setBlockLinks(filterLinks())
    }, [links])

    useEffect(() => {
        // auto updates local storage value for block on change
        let selected = JSON.parse(localStorage.getItem("SELECTED_BLOCKS"))
        if(selected === null || selected.length < 1) return
        
        for (let i=0; i<selected.length; i++){
            if(selected[i].id === block.id){
                selected[i].title = title
                selected[i].content = content
                localStorage.setItem("SELECTED_BLOCKS", JSON.stringify(selected))
                return
            }
        }
    }, [title,content])

    const filterLinks = () => {
        let filtered = []
        links.map(link => {
            if(link.block1 === block.id){
                let linked = blocks.filter(b => b.id === link.block2)[0]
                if(linked !== undefined){
                    linked.linkId = link.id
                    filtered.push(linked)
                }
            } else 
            if(link.block2 === block.id){
                let linked = blocks.filter(b => b.id === link.block1)[0]
                linked.linkId = link.id
                filtered.push(linked)
            }
        })
        return filtered
    }

    const handleClose = () => {// warns user of unsaved changes before closing block
        if(content !== block.content){
            if(!window.confirm("Unsaved changes detected, are you sure you want to continue?")){return}
        }
        close()
    }
    
    useHotkeys("shift+c",handleClose)

    const deleteLink = async (linkId,linkTo) => {
        if(!window.confirm(`Are you sure you want to delete the link to "${linkTo}"?`)){return}

        try{
            await deleteDoc(doc(db,"Links",linkId))
            let filtered = [...links].filter(link => link.id !== linkId)
            setLinks(filtered)
            deleteLinkFromDownload(filtered)
        }
        catch(error){
            console.error(error)
            useAlert("Cannot delete link at this time, try again later!","failure")
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
        <BlockOptions colour={colour} gameId={gameId} data={[title,content]} content={[content,setContent]}
            blocks={[blocks,setBlocks]} boards={boards} links={[links,setLinks]}
            closeBlock={close} blockLinks={blockLinks} block={block} placements={[placements,setPlacements]}/>

        <input value={title}
            className="block-title"
            onChange={e => setTitle(e.target.value)}/>

        <button className="x-btn" onClick={handleClose}>X</button><br/>

        <BlockEditor content={content} setContent={setContent}/>

        <p className="related-blocks">{blockLinks.map(link => 
        <span key={link.id}>
            <span onClick={() => select(link)}>{link.title}</span>
            <label onClick={() => deleteLink(link.linkId,link.title)}>X</label>
        </span>
        )}</p>
    </div>
    )
}