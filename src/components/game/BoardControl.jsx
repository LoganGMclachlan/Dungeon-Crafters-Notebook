import { addDoc, collection, deleteDoc, doc } from "firebase/firestore"
import { useState } from "react"
import { db } from "../../config/firebase"

export default function BoardControl({boards,select,gameId,setBoards,placements,
    setPlacements,selected}){
    const [newBoard, setNewBoard] = useState("")

    const createNewBoard = async () => {
        if(!navigator.onLine){ alert("Cannot create board while offline"); return}
        try{
            let board = {"title":newBoard,"gameid":gameId}
            await addDoc(collection(db,"Boards"),board)
                .then(docRef => board.id = docRef.id)
            setBoards([...boards, board])
            select(board.id)
            setNewBoard("")
            alert("New Board Created!")
        }
        catch(error){console.log(error); alert("Something went wrong, try again later.")}
    }

    const deleteBoard = async () => {
        if(!selected){ alert("Select a board to delete."); return}
        if(!navigator.onLine){ alert("Cannot delete boards while offline"); return}
        if(!window.confirm("Are you sure you want to delete this board?")){ return }

        try{
            placements.map(async p => {
                if(p.boardid === selected){await deleteDoc(doc(db,"Placements",p.id))}
            })
            setPlacements([...placements].filter(p => p.boardid !== selected))
            await deleteDoc(doc(db,"Boards",selected))
            select(null)
        }
        catch(error){console.log(error); alert("Something went wrong, try again later.")}
    }

    return(
    <div className="board-control">
        <div>
            <select defaultValue="default" className="form-input" style={{"width":"200px"}}
                onChange={e => select(e.target.value)}>
                <option value="default" disabled>Select a Board</option>
                {boards.map(board => 
                    <option key={board.id} value={board.id}>{board.title}</option>
                )}
            </select><br/>
            <button className="form-btn" style={{"backgroundColor":"red"}}
                onClick={() => deleteBoard()}>Delete Board</button>
        </div>
        <div>
            <input placeholder="Board Title..."
                className="form-input"
                value={newBoard}
                onChange={e => setNewBoard(e.target.value)}/><br/>
            <button className="form-btn" onClick={() => createNewBoard()}>Create Board</button>
        </div>
    </div>
    )
}