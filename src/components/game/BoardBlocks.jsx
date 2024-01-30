import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../config/firebase"
import { useRef } from "react"


export default function BoardBlocks({blocks,setPlacements,placements,gameId}){

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
            e.target.style.height = `${Math.min(e.target.scrollHeight, 400)}px`
        } else {
            e.target.style.height = '150px'
        }
    }

    return(
    <div className="board-blocks">
        {blocks.map(block => <div key={block.id}>
            <button className="x-btn" onClick={() => deletePlacement(block)}>X</button>
            <h2>{block.title}</h2>
            <textarea className="board-content" 
                value={block.content}
                onClick={toggleExpand}
                readOnly={true}
            />
        </div>)}
    </div>
    )
}