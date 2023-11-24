import { useState } from "react"
import { db } from "../../config/firebase"
import { addDoc, collection } from "firebase/firestore"

export default function FolderList({block, getBlockData, close}){
    const [processFinnished,setProcessFinnished] = useState(true)

    function Save(e){
        e.preventDefault()
        setProcessFinnished(false)
        try{
            // checks wether to save new block or to update existing one
            if (block.new){ AddNewBlock(block) }
            UpdateBlock(block)
        }
        catch(error){
            console.error(error)
            alert("Failed to save this block, try again later.")
        }
        finally{
            getBlockData()// refreshes block data
            setProcessFinnished(true)
        }
    }

    async function AddNewBlock(block){
        delete block.new// removes new property
        await addDoc(collection(db, "Blocks"), block)// adds new block to firebase
        
    }
    async function UpdateBlock(block){
        
    }

    async function Delete(){

    }



    return(
        <div className="block">
            <div>
                <button className="x-btn" onClick={close}>X</button>

                <input
                    value={block.title}
                    className="block-title"/><br/>
                <textarea
                    value={block.content}
                    className="block-content"/><br/>
            </div>

            <div>
                {processFinnished
                ?<button className="form-btn" style={{"marginRight":"10px"}}
                onClick={e => Save(e)}>Save</button>
                :<button className="form-btn" style={{"marginRight":"10px"}}
                    >Saving...</button>
                }
                
                <button className="form-btn">Link</button>

                {!block.new && <button className="form-btn" 
                    style={{"float":"right","backgroundColor":"red"}}>Delete</button>}
            </div>
        </div>
    )
}