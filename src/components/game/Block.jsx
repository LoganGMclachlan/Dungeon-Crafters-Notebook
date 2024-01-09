import { useState } from "react"
import { db } from "../../config/firebase"
import { deleteDoc, doc } from "firebase/firestore"
import { useEffect } from "react"
import BlockOptions from "./BlockOptions"

export default function FolderList({block,setBlocks,close,blocks,colour,gameId,links,setLinks,select}){
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [blockLinks, setBlockLinks] = useState([])

    // updates local state data when new block is selceted
    useEffect(() => {
        setTitle(block.title)
        setContent(block.content)
        setBlockLinks(filterLinks())
    }, [block])

    useEffect(() => {
        setBlockLinks(filterLinks())
    }, [links])

    function filterLinks(){
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

    function handleClose(){
        if(content !== block.content){
            if(!window.confirm("Unsaved changes detected, are you sure you want to continue?")){
                return
            }
        }
        close()
    }

    async function deleteLink(linkId,linkTo){
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
            <div>
                <BlockOptions colour={colour} setBlocks={setBlocks} gameId={gameId} title={title}
                    content={content} blocks={blocks} links={links} setLinks={setLinks} close={close}
                    blockLinks={blockLinks} block={block}/>

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
                <span>
                    <span onClick={() => select(link)}>{link.title}</span>
                    <label onClick={() => deleteLink(link.linkId,link.title)}>X</label>
                </span>
                )}</p>
            </div>
        </div>
    )
}