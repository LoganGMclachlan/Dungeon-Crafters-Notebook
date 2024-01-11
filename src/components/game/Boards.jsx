import BoardBlocks from "./BoardBlocks";
import BoardControl from "./BoardControl";


export default function Boards({boards}){

    return(
    <div className="boards-container">
        <BoardBlocks/>
        <BoardControl boards={boards}/>
        <p className="board-control">
            Boards allow you to create custom collections of 
            information from your blocks. Use this tool to gather 
            all the info you would need for a session.
        </p>
    </div>
    )
}