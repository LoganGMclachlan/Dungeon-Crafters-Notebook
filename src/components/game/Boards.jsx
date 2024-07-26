import { useEffect, useState } from "react";
import BoardBlocks from "./BoardBlocks";
import BoardControl from "./BoardControl";
import "./boards.css"

export default function Boards({boards, placements, blocks, gameId, setBoards, setPlacements}){
    const [selectedBoard, setSelectedBoard] = useState(() => {
        const localValue = localStorage.getItem("SELECTED_BOARD")
        if (localValue === "" || localValue === "undefined") return 
        return JSON.parse(localValue)
    })
    const [selectedBlocks, setSelectedBlocks] = useState([])

    useEffect(() => {localStorage.setItem("SELECTED_BOARD", JSON.stringify(selectedBoard))}
    , [selectedBoard])

    // filters block list for ones placed in selected board
    useEffect(() => {
        let filtered = []
        placements.filter(p => p.boardid === selectedBoard).map(p => {
            let block = blocks.find(b => b.id === p.blockid)
            block.placement = p.id
            filtered.push(block)
        })
        setSelectedBlocks(filtered)
    }, [selectedBoard,placements])

    // gets title of selcted board from id
    const getBoardTitle = id => {
        if (id === undefined) return ""
        return boards.filter(board => board.id == id)[0].title
    }

    return(
    <div className="boards-container">
        <h1 style={{"fontWeight":"bold"}}>{getBoardTitle(selectedBoard)}</h1>
        <BoardBlocks blocks={selectedBlocks} setPlacements={setPlacements} placements={placements} gameId={gameId}/>
        <BoardControl boards={boards} select={setSelectedBoard} gameId={gameId} setBoards={setBoards}
            placements={placements} setPlacements={setPlacements} selected={selectedBoard}/>
        <p className="board-control">
            Boards allow you to create custom collections of 
            information from your blocks. Use this tool to gather 
            all the info you would need for a session.
            Select a board to view the blocks within. You can click 
            on a block to expand or minimise it. Click the X button 
            to remove it from that board.
        </p>
    </div>
    )
}