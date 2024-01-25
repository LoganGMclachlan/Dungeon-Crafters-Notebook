import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../config/firebase"


export default function BoardBlocks({blocks,setPlacements,placements}){

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
        {blocks.map(block => <div key={block.id}>
            <button className="x-btn" onClick={() => deletePlacement(block)}>X</button>
            <h2>{block.title}</h2>
            <p>{block.content}</p>
            {block.placement}<br/>
            {block.id}
        </div>)}
    </div>
    )
}