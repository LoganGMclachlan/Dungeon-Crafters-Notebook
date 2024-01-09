import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { db } from "../../config/firebase"

export default function BlockOptions({colour,setBlocks,gameId,title,content,
    blocks,links,setLinks,close,blockLinks,block}){
    const [expandOptions,setExpandOptions] = useState(false)

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
                .then(docRef => {
                    // updates local copy of blocks
                    newBlock.id = docRef.id
                    setBlocks([...blocks,newBlock])
                })
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

            let filteredLinks = [...links]
            blockLinks.map(async link => {
                await deleteDoc(doc(db,"Links",link.linkId)).then(
                    filteredLinks = filteredLinks.filter(l => l.id !== link.linkId) 
                )
            })
            setLinks(filteredLinks)
            close()
        }
        catch(error){
            console.error(error)
            alert("Something went wrong, try again later.")
        }
    }

    async function createLink(linkTo){
        if(linkTo === block.id){alert("Cannot link a block to itself");return}
        let linkExists = false
        blockLinks.map(link => {if(link.id === linkTo){linkExists = true}})
        if(linkExists){alert("Selected block is already linked to this one");return}

        try{
            let link = {"block1":block.id,"block2":linkTo,"gameid":gameId}
            await addDoc(collection(db,"Links"), link)
            .then(docRef => {
                link.id = docRef.id
                setLinks([...links,link])
            })
        }
        catch(error){
            console.error(error)
            alert("Something went wrong, try again later.")
        }
    }

    return(
        <div style={{"display":"inline"}} onMouseLeave={() => setExpandOptions(false)}>
            <button className="options-btn" onMouseEnter={() => setExpandOptions(true)}
                style={{"backgroundColor":`${colour}`}}>Options</button>
            {expandOptions &&
            <ul className="options-collapse">
                <li onClick={e => Save(e)}>Save</li>
                {!block.new && <>
                    <li>
                        <label>Link to: </label> 
                        <select className="option-select" defaultValue="defualt"
                            onChange={e => {createLink(e.target.value);setExpandOptions(false)}}>
                            <option value="defualt" disabled>Select Block</option>
                            {blocks.map(b => <option value={b.id}>{b.title}</option>)}
                        </select>
                    </li>
                    <li>Add to Board</li>
                    <li onClick={Delete} style={{"color":"red"}}>Delete</li>
                </>}
            </ul>
            }
        </div>
    )
}