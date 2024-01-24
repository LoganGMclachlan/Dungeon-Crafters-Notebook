import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { db } from "../../config/firebase"

export default function BlockOptions({colour,gameId,data,blocks,links,close,blockLinks,block,placements,boards}){
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
                    downloadBlock(newBlock)
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
                updateDownloadedBlock(newBlock)
            }
            alert("Block saved successfuly!")
        }
        catch(error){ console.error(error); alert("Failed to save this block, try again later.")}
    }

    const Delete = async () => {
        if(!navigator.onLine){ alert("Cannot delete blocks while offline"); return}
        if(!window.confirm("Are you sure you want to delete this block?")){ return }
        try{
            await deleteDoc(doc(db, "Blocks", block.id))
            blocks[1](blocks[0].filter(b => b.id != block.id))
            deleteBlockFromDownload(block.id)

            let filteredLinks = [...links[0]]
            blockLinks.map(async link => {
                await deleteDoc(doc(db,"Links",link.linkId)).then(
                    filteredLinks = filteredLinks.filter(l => l.id !== link.linkId),
                    deleteLinkFromDownload(filteredLinks)
                )
            })
            links[1](filteredLinks)
            close()
        }
        catch(error){
            console.error(error)
            alert("Something went wrong, try again later.")
        }
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
                downloadLink(link)
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
            .then(docRef => {
                placement.id = docRef.id
                placements[1]([...placements[0],placement])
                downloadPlacement(placement)
            })
        }
        catch(error){console.error(error);alert("Something went wrong, try again later.")}
    }

    const downloadPlacement = placement => {
        let localValue = JSON.parse(localStorage.getItem("SAVED_GAMES"))
        if(localValue === null) return
        localValue.map(game => {
            if(game.game.id === gameId){game.placements.push(placement)}
            return game
        })
        console.log(localValue.placements)
        localStorage.setItem("SAVED_GAMES", JSON.stringify(localValue))
    }

    const downloadBlock = newBlock => {
        let localValue = JSON.parse(localStorage.getItem("SAVED_GAMES"))
        if(localValue === null) return
        localValue.map(game => {
            if(game.game.id === gameId){game.blocks.push(newBlock)}
            return game
        })
        localStorage.setItem("SAVED_GAMES", JSON.stringify(localValue))
    }

    const updateDownloadedBlock = newBlock => {
        let localValue = JSON.parse(localStorage.getItem("SAVED_GAMES"))
        if(localValue === null) return
        localValue.map(game => {
            if(game.game.id === gameId){game.blocks = [...game.blocks.map(b => {
                if(b.id === newBlock.id){ return newBlock } else return b
            })]}
            return game
        })
        localStorage.setItem("SAVED_GAMES", JSON.stringify(localValue))
    }

    const deleteBlockFromDownload = id => {
        let localValue = JSON.parse(localStorage.getItem("SAVED_GAMES"))
        if(localValue === null) return
        localValue.map(game => {
            if(game.game.id === gameId){game.blocks = [...game.blocks.filter(b => b.id !== id)]}
            return game
        })
        localStorage.setItem("SAVED_GAMES", JSON.stringify(localValue))
    }

    const downloadLink = link => {
        let localValue = JSON.parse(localStorage.getItem("SAVED_GAMES"))
        if(localValue === null) return
        localValue.map(game => {
            if(game.game.id === gameId){game.links.push(link)}
            return game
        })
        localStorage.setItem("SAVED_GAMES", JSON.stringify(localValue))
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
        <div style={{"display":"inline"}} onMouseLeave={() => setExpandOptions(false)}>
            <button className="options-btn" onMouseEnter={() => setExpandOptions(true)}
                style={{"backgroundColor":`${colour}`}}>Options</button>
            {expandOptions &&
            <ul className="options-collapse">
                <li onClick={e => save(e)}>Save</li>
                {!block.new && <>
                    <li>
                        <label>Link to: </label> 
                        <select className="option-select" defaultValue="defualt"
                            onChange={e => {createLink(e.target.value);setExpandOptions(false)}}>
                            <option value="defualt" disabled>Select Block</option>
                            {blocks[0].map(b => <option value={b.id} key={b.id}>{b.title}</option>)}
                        </select>
                    </li>
                    <li>
                        <label>Add to Board: </label> 
                        <select className="option-select" defaultValue="defualt"
                            onChange={e => {createPlacement(e.target.value);setExpandOptions(false)}}>
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