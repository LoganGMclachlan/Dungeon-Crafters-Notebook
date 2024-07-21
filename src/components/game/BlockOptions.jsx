import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { db } from "../../config/firebase"
import Hint from "../Hint"
import SelectTemplate from "./SelectTemplate"
import { blockOptions } from "../HintMessages"
import { Link } from "react-router-dom"
import Alert from "../Alert"
import ReactDOM from 'react-dom';

export default function BlockOptions({colour,gameId,data,blocks,links,closeBlock,
    blockLinks,block,placements,boards,content}){
    const [expandOptions,setExpandOptions] = useState(false)

    const save = async e => {
        e.preventDefault()
        setExpandOptions(false)
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
            ReactDOM.render(<Alert message="Block saved successfuly!" type="success"/>, 
                document.getElementById("alert-container"))
        }
        catch(error){
            console.error(error)
            ReactDOM.render(<Alert message="Cannot save block at this time, try again later." type="failure"/>, 
                document.getElementById("alert-container"))
        }
    }

    const Delete = async () => {
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
            ReactDOM.render(<Alert message="Cannot delete block at this time, try again later." type="failure"/>, 
                document.getElementById("alert-container"))
        }
    }

    const createLink = async linkTo => {
        if(linkTo === block.id){
            ReactDOM.render(<Alert message="Cannot link block to itself." type="warning"/>, 
            document.getElementById("alert-container"))
            return
        }
        let linkExists = false
        blockLinks.map(link => {if(link.id === linkTo){linkExists = true}})
        if(linkExists){
            ReactDOM.render(<Alert message="Selected block is already linked." type="failure"/>, 
            document.getElementById("alert-container"))
            return
        }

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
            ReactDOM.render(<Alert message="Cannot create links at this time, try again later." type="failure"/>, 
                document.getElementById("alert-container"))
        }
    }

    // places block into selected board
    const createPlacement = async placeIn => {
        try{
            let placement = {"blockid":block.id,"boardid":placeIn,"gameid":gameId}
            await addDoc(collection(db,"Placements"), placement)
                .then(docRef => {placement.id = docRef.id})

            placements[1]([...placements[0],placement])
            ReactDOM.render(<Alert message="Block placed into board successfuly!" type="success"/>, 
                document.getElementById("alert-container"))
        }
        catch(error){
            console.error(error)
            ReactDOM.render(<Alert message="Cannot place block in board at this time, try again later." type="failure"/>, 
                document.getElementById("alert-container"))
        }
    }

    return(
        <div style={{"display":"inline"}} onMouseLeave={() => setExpandOptions(false)}>
            <button className="options-btn" onMouseOver={() => setExpandOptions(true)}
                style={{"backgroundColor":`${colour}`}}>Options</button>
            <Hint message={blockOptions}/>

            {expandOptions &&
            <ul className="options-collapse">
                <li onClick={e => save(e)}>Save</li>

                <SelectTemplate content={content} close={close}/>

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
                    <li><Link to={"../share/" + block.id} target="_blank">Share</Link></li>
                    <li onClick={Delete} style={{"color":"red"}}>Delete</li>
                </>}
            </ul>
            }
            <div id="alert-container" style={{"display":"inline"}}/>
        </div>
    )
}