import { useEffect, useState } from "react";
import BoardBlocks from "./BoardBlocks";
import BoardControl from "./BoardControl";
import "./boards.css"

export default function Boards({boards, placements, blocks, gameId, setBoards}){
    const [selectedBoard, setSelectedBoard] = useState(null)
    const [selectedBlocks, setSelectedBlocks] = useState([])

    useEffect(() => {
        let filtered = []
        placements.filter(p => p.boardid === selectedBoard).map(p => {
            filtered.push(blocks.find(b => b.id === p.blockid))
        })
        setSelectedBlocks(filtered)
    }, [selectedBoard])

    return(
    <div className="boards-container">
        <BoardBlocks blocks={selectedBlocks}/>
        <BoardControl boards={boards} select={setSelectedBoard} gameId={gameId} setBoards={setBoards}/>
        <p className="board-control">
            Boards allow you to create custom collections of 
            information from your blocks. Use this tool to gather 
            all the info you would need for a session.
        </p>
    </div>
    )
}