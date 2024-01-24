import { useEffect, useState } from "react";
import BoardBlocks from "./BoardBlocks";
import BoardControl from "./BoardControl";
import "./boards.css"

export default function Boards({boards, placements, blocks, gameId, setBoards, setPlacements}){
    const [selectedBoard, setSelectedBoard] = useState(() => {
        const localValue = localStorage.getItem("SELECTED_BOARD")
        if (localValue === null) return null
        return JSON.parse(localValue)
    })
    const [selectedBlocks, setSelectedBlocks] = useState([])

    useEffect(() => {localStorage.setItem("SELECTED_BOARD", JSON.stringify(selectedBoard))}, [selectedBoard])

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
        <BoardControl boards={boards} select={setSelectedBoard} gameId={gameId} setBoards={setBoards}
            placements={placements} setPlacements={setPlacements} selected={selectedBoard}/>
        <p className="board-control">
            Boards allow you to create custom collections of 
            information from your blocks. Use this tool to gather 
            all the info you would need for a session.
        </p>
    </div>
    )
}