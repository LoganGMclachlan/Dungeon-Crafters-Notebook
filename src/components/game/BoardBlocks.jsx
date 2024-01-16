

export default function BoardBlocks({blocks}){

    return(
    <div className="board-blocks">
        {blocks.map(block => <div key={block.id}>
            <h2>{block.title}</h2>
            <p>{block.content}</p>
        </div>)}
    </div>
    )
}