import { addDoc, collection } from "firebase/firestore"
import { useState } from "react"
import { db } from "../../config/firebase"


export default function BoardControl({boards, select, gameId, setBoards}){
    const [newBoard, setNewBoard] = useState("")

    const createNewBoard = async () => {
        if(!navigator.onLine){ alert("Cannot create board while offline"); return}
        try{
            let board = {"title":newBoard,"gameid":gameId}
            await addDoc(collection(db,"Boards"),board)
            .then(docRef => board.id = docRef.id)
            setBoards([...boards, board])
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
            <button className="form-btn" style={{"backgroundColor":"red"}}>Delete Board</button>
        </div>
        <div>
            <input placeholder="Board Title..."
                className="form-input"
                onChange={e => setNewBoard(e.target.value)}/><br/>
            <button className="form-btn" onClick={() => createNewBoard()}>Create Board</button>
        </div>
    </div>
    )
}