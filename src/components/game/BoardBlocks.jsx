import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../config/firebase"
import { useEffect, useState } from "react"
import { Editor } from "@tinymce/tinymce-react"
import { htmlToText } from "html-to-text"

export default function BoardBlocks({blocks,setPlacements,placements}){
    const [orderedBlocks,setOrderedBlocks] = useState([])

    useEffect(() => {
        setOrderedBlocks(blocks.sort((a, b) => b.content.length - a.content.length))
    }, [blocks])

    const deletePlacement = async block => {
        if(!window.confirm(`Are you sure you want to delete "${block.title}" from this board?`)){return}

        try{
            await deleteDoc(doc(db,"Placements",block.placement))
            setPlacements([...placements].filter(p => p.id !== block.placement))
        }
        catch(error){console.log(error);alert("something went wrong, try again later")}
    }

    return(
    <div className="board-blocks">
        {orderedBlocks.map(block => <div key={block.id}>
            <button className="x-btn" onClick={() => deletePlacement(block)}>X</button>
            <h2>{block.title}</h2>
            <span >
            {navigator.onLine
            ? <Editor 
                    apiKey={import.meta.env.VITE_TINY_API_KEY}
                    value={block.content}
                    disabled={true}
                    inline={true}
                    init={{
                        menubar:false,
                        toolbar:false,
                        resize:false
                    }}
                />
            : <textarea 
                value={htmlToText(block.content,{wordwrap: 80})}/>
            }
            
            </span>
        </div>)}
    </div>
    )
}