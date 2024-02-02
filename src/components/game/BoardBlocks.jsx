import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../config/firebase"
import { useEffect, useState } from "react"
import { Editor } from "@tinymce/tinymce-react"
import { htmlToText } from "html-to-text"

export default function BoardBlocks({blocks,setPlacements,placements,gameId}){
    const [orderedBlocks,setOrderedBlocks] = useState([])

    useEffect(() => {
        setOrderedBlocks(blocks.sort((a, b) => b.content.length - a.content.length))
    }, [blocks])

    const deletePlacement = async block => {
        if(!window.confirm(`Are you sure you want to delete "${block.title}" from this board?`)){return}

        try{
            await deleteDoc(doc(db,"Placements",block.placement))
            setPlacements([...placements].filter(p => p.id !== block.placement))

            let localValue = JSON.parse(localStorage.getItem("SAVED_GAMES"))
            if(localValue !== null) {
                localValue.map(game => {
                    if(game.game.id === gameId){
                        game.placements = [...game.placements.filter(p => p.id !== block.placement)]
                    }
                    return game
                })
                localStorage.setItem("SAVED_GAMES", JSON.stringify(localValue))
            }
        }
        catch(error){console.log(error);alert("something went wrong, try again later")}
    }

    const toggleExpand = e => {
        if(e.target.style.height === "150px"){
            e.target.style.height = `${e.target.scrollHeight}px`
        } else {
            e.target.style.height = '150px'
        }
    }

    return(
    <div className="board-blocks">
        {orderedBlocks.map(block => <div key={block.id}>
            <button className="x-btn" onClick={() => deletePlacement(block)}>X</button>
            <h2>{block.title}</h2>
            <span onClick={toggleExpand}>
            {navigator.onLine
            ? <Editor 
                    apiKey="c70a4j85ev1e4q1dopyxbpw772r0lz047pef9umlig63xfdh"
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