import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { db } from "../../config/firebase"
import { headings, numberedList, dottedList } from "./Templates"

export default function BlockOptions({colour,gameId,data,blocks,links,closeBlock,
    blockLinks,block,placements,boards,content}){
    const [expandOptions,setExpandOptions] = useState(false)

    const save = async e => {
        e.preventDefault()
        setExpandOptions(false)
        if(!navigator.onLine){ alert("Cannot save blocks while offline"); return}

        try{
            let newBlock = block
            newBlock.title = data[0]
            newBlock.content = data[1]
            // checks wether to save new block or to update existing one
            if (block.new){ 
                delete newBlock.new
                await addDoc(collection(db, "Blocks"), newBlock)
                .then(docRef => {
                    // updates local copy of blocks
                    newBlock.id = docRef.id
                    blocks[1]([...blocks[0],newBlock])
                })
            }else{
                await updateDoc(
                    doc(db,"Blocks",block.id),
                    {title:data[0],content:data[1]}
                )
                // updates local block with given id
                blocks[1](blocks[0].map(b => {
                    if(b.id === newBlock.id){
                        return newBlock
                    }
                    return b
                }))
            }
            alert("Block saved successfuly!")
        }
        catch(error){ console.error(error); alert("Failed to save this block, try again later.")}
    }

    const Delete = async () => {
        if(!navigator.onLine){ alert("Cannot delete blocks while offline"); return}
        if(!window.confirm("Are you sure you want to delete this block?")){ return }
        try{
            // removes block data
            await deleteDoc(doc(db, "Blocks", block.id))
            blocks[1](blocks[0].filter(b => b.id != block.id))

            // removes links with block id
            let filteredLinks = [...links[0]]
            blockLinks.map(async link => {
                await deleteDoc(doc(db,"Links",link.linkId)).then(
                    filteredLinks = filteredLinks.filter(l => l.id !== link.linkId),
                )
            })
            links[1](filteredLinks)

            // removes placements with block id
            placements.map(async placement => {
                if(placement.blockid === block.id){
                    await deleteDoc(doc(db,"Placements",placement.id))
                }
            })
            placements[1]([...placements[0].filter(p => p.blockid !== block.id)])
            closeBlock()
        }
        catch(error){
            console.error(error)
            alert("Something went wrong, try again later.")
        }
    }

    const deletePlacements = () => {

    }

    const createLink = async linkTo => {
        if(!navigator.onLine){ alert("Cannot link blocks while offline"); return}
        if(linkTo === block.id){alert("Cannot link a block to itself");return}
        let linkExists = false
        blockLinks.map(link => {if(link.id === linkTo){linkExists = true}})
        if(linkExists){alert("Selected block is already linked to this one");return}

        try{
            let link = {"block1":block.id,"block2":linkTo,"gameid":gameId}
            await addDoc(collection(db,"Links"), link)
            .then(docRef => {
                link.id = docRef.id
                links[1]([...links[0],link])
            })
        }
        catch(error){
            console.error(error)
            alert("Something went wrong, try again later.")
        }
    }

    const createPlacement = async placeIn => {
        if(!navigator.onLine){ alert("Cannot add to boards while offline"); return}

        try{
            let placement = {"blockid":block.id,"boardid":placeIn,"gameid":gameId}
            await addDoc(collection(db,"Placements"), placement)
            .then(docRef => {placement.id = docRef.id})
            placements[1]([...placements[0],placement])
            alert("Block added to selected board.")
        }
        catch(error){console.error(error);alert("Something went wrong, try again later.")}
    }

    const close = () => setExpandOptions(false)

    return(
        <div style={{"display":"inline"}}>
            <button className="options-btn" onClick={() => setExpandOptions(!expandOptions)}
                style={{"backgroundColor":`${colour}`}}>Options</button>
            {expandOptions &&
            <ul className="options-collapse">
                <li onClick={close}>Close Options</li>
                <li onClick={e => save(e)}>Save</li>
                <li>
                    <label>Use Template: </label>
                    <select className="option-select" defaultValue="defualt"
                        onChange={e => {content[1](content[0] + e.target.value);close()}}>
                        <option value="defualt" disabled>None</option>
                        <option value={headings}>Headings</option>
                        <option value={numberedList}>Numbered List</option>
                        <option value={dottedList}>Dotted List</option>
                    </select>
                </li>
                {!block.new && <>
                    <li>
                        <label>Link to: </label> 
                        <select className="option-select" defaultValue="defualt"
                            onChange={e => {createLink(e.target.value);close()}}>
                            <option value="defualt" disabled>Select Block</option>
                            {blocks[0].map(b => <option value={b.id} key={b.id}>{b.title}</option>)}
                        </select>
                    </li>
                    <li>
                        <label>Add to Board: </label> 
                        <select className="option-select" defaultValue="defualt"
                            onChange={e => {createPlacement(e.target.value);close()}}>
                            <option value="defualt" disabled>Select Board</option>
                            {boards.map(b => <option value={b.id} key={b.id}>{b.title}</option>)}
                        </select>
                    </li>
                    <li onClick={Delete} style={{"color":"red"}}>Delete</li>
                </>}
            </ul>
            }
        </div>
    )
}