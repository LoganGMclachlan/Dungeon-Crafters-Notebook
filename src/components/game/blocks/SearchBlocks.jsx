import { useRef, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook";

export default function SearchBlocks({select, blocks}){
    const [results, setResults] = useState([])
    const searchRef = useRef(null)

    function search(target){
        if(target === ""){ setResults([]); return }
        setResults(blocks.filter(block => 
            block.title.toLowerCase().includes(target.toLowerCase())
        ))
    }

    useHotkeys("shift+o", () => {
        searchRef.current.disabled = true
        const sleep = delay => {
            return new Promise(resolve => setTimeout(resolve, delay));
        }
        // sleeps for a moment to prevent "O" from being inputed into search bar
        sleep(1).then(() => {
            searchRef.current.disabled = false
            searchRef.current.focus()
        })
    })

    return(
        <>
        <input placeholder="Search..."
            className="search-bar"
            ref={searchRef}
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