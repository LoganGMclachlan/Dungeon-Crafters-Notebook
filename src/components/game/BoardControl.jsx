

export default function BoardControl({boards}){

    return(
    <div className="board-control">
        <div>
            <select defaultValue="default" className="form-input" style={{"width":"200px"}}>
                <option value="default" disabled>Select a Board</option>
                {boards.map(board => <option key={board.id}>{board.title}</option>)}
            </select><br/>
            <button className="form-btn" style={{"backgroundColor":"red"}}>Delete Board</button>
        </div>
        <div>
            <input placeholder="Board Title..." className="form-input"/><br/>
            <button className="form-btn">Create Board</button>
        </div>
    </div>
    )
}