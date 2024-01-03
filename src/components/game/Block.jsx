import { useState } from "react"
import { db } from "../../config/firebase"
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { useEffect } from "react"

export default function FolderList({block, setBlocks, close, blocks}){
    const [processFinnished,setProcessFinnished] = useState(true)
    const [title, setTitle] = useState()
    const [content, setContent] = useState()

    // updates local state data when new block is selceted
    useEffect(() => {
        setTitle(block.title)
        setContent(block.content)
    }, [block])

    async function Save(e){
        e.preventDefault()
        setProcessFinnished(false)
        
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
        }
        catch(error){
            console.error(error)
            alert("Failed to save this block, try again later.")
        }
        finally{
            setProcessFinnished(true)
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



    return(
        <div className="block">
            <div>
                <button className="x-btn" onClick={close}>X</button>

                <input
                    value={title}
                    className="block-title"
                    onChange={e => setTitle(e.target.value)}/><br/>
                <textarea
                    value={content}
                    className="block-content"
                    onChange={e => setContent(e.target.value)}/><br/>
            </div>

            <div>
                {processFinnished
                    ?<button className="form-btn" style={{"marginRight":"10px"}}
                    onClick={e => Save(e)}>Save</button>
                    :<button className="form-btn" style={{"marginRight":"10px"}}
                        >Saving...</button>
                }
                
                <button className="form-btn">Link</button>

                {!block.new && <button className="form-btn" onClick={Delete}
                    style={{"float":"right","backgroundColor":"red"}}>Delete</button>}
            </div>
        </div>
    )
}