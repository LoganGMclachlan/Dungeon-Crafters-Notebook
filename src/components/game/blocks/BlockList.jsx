
export default function BlockList({blocks,select}){

    return(
        <ul className="block-snippets">
            {blocks.map(block => 
            <li key={block.id} onClick={() => select(block)}>
                <p>{block.title}</p>
            </li>
            )}
        </ul>
    )
}