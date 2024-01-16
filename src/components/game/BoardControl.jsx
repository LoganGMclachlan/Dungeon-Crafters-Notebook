

export default function BoardControl({boards, select}){

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
            <input placeholder="Board Title..." className="form-input"/><br/>
            <button className="form-btn">Create Board</button>
        </div>
    </div>
    )
}