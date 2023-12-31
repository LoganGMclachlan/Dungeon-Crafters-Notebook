import { useState } from "react"

export default function SearchBlocks({select, blocks}){
    const [results, setResults] = useState([])

    function search(target){
        if(target === ""){ setResults([]); return }
        setResults(blocks.filter(block => 
            block.title.toLowerCase().includes(target.toLowerCase())
        ))
    }

    return(
        <>
        <input placeholder="Search..."
            className="search-bar"
            onChange={e => search(e.target.value)}
            onClick={e => search(e.target.value)}/>
        <ul className="search-results">
            {results.map(block => 
                <li onClick={() => {select(block);search("")}}>{block.title}</li>
            )}
        </ul>
        </>
    )
}