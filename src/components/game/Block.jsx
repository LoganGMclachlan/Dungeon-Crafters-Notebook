import { useState } from "react"
import { db } from "../../config/firebase"
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { useEffect } from "react"

export default function FolderList({block,setBlocks,close,blocks,colour,gameId,links}){
    const [expandOptions,setExpandOptions] = useState(false)
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [blockLinks, setBlockLinks] = useState([])

    // updates local state data when new block is selceted
    useEffect(() => {
        setTitle(block.title)
        setContent(block.content)
        filterLinks()
    }, [block])

    function filterLinks(){
        let filtered = []
        links.map(link => {
            if(link.block1 === block.id){
                filtered.push(blocks.filter(b => b.id === link.block2)[0])
            } else 
            if(link.block2 === block.id){
                filtered.push(blocks.filter(b => b.id === link.block1)[0])
            }
        })
        setBlockLinks(filtered)
    }

    async function Save(e){
        e.preventDefault()
        setExpandOptions(false)
        let newBlock = block
        newBlock.title = title
        newBlock.content = content

        try{
            // checks wether to save new block or to update existing one
            if (block.new){ 
                delete newBlock.new
                await addDoc(collection(db, "Blocks"), newBlock)
                // adds new block to block list
                setBlocks([...blocks,newBlock])
            }else{
                await updateDoc(
                    doc(db,"Blocks",block.id),
                    {title:title,content:content}
                )
                // updates local block with given id
                setBlocks(blocks.map(b => {
                    if(b.id === newBlock.id){
                        return newBlock
                    }
                    return b
                }))
            }
            alert("Block saved successfuly!")
        }
        catch(error){
            console.error(error)
            alert("Failed to save this block, try again later.")
        }
    }

    async function Delete(){
        if(!window.confirm("Are you sure you want to delete this block?")){ return }
        try{
            await deleteDoc(doc(db, "Blocks", block.id))
            setBlocks(blocks.filter(b => b.id != block.id))
            close()
        }
        catch(error){
            console.error(error)
            alert("Something went wrong, try again later.")
        }
    }

    function handleClose(){
        if(content !== block.content){
            if(!window.confirm("Unsaved changes detected, are you sure you want to continue?")){
                return
            }
        }
        close()
    }

    return(
        <div className="block">
            <div>
                <div style={{"display":"inline"}} onMouseLeave={() => setExpandOptions(false)}>
                    <button className="options-btn" onMouseEnter={() => setExpandOptions(true)}
                        style={{"backgroundColor":`${colour}`}}>Options</button>
                    {expandOptions &&
                    <ul className="options-collapse">
                        <li onClick={e => Save(e)}>Save</li>
                        {!block.new && <>
                            <li>
                                <label>Link to: </label> 
                                <select className="option-select">
                                    {blocks.map(b => <option value={b.id}>{b.title}</option>)}
                                </select>
                            </li>
                            <li>Add to Board</li>
                            <li onClick={Delete} style={{"color":"red"}}>Delete</li>
                        </>}
                    </ul>
                    }
                </div>
                <button className="x-btn" onClick={handleClose}>X</button>
                <input
                    value={title}
                    className="block-title"
                    onChange={e => setTitle(e.target.value)}/><br/>
                <textarea
                    value={content}
                    className="block-content"
                    onChange={e => setContent(e.target.value)}/><br/>
                <p className="related-blocks"><b>Related: </b>
                    {blockLinks.map(link => <u onClick={() => alert(`selected block ${link.title}`)}>{link.title}, </u>)}
                </p>
            </div>
        </div>
    )
}