import { headings, numberedList, dottedList, table } from "./Templates"


export default function SelectTemplate({content,close}){

    return(
    <li>
        <label>Use Template: </label>
        <select className="option-select" defaultValue="defualt"
            onChange={e => {
                content[1](content[0] + e.target.value)
                close()
            }}>
            <option value="defualt" disabled>None</option>
            <option value={headings}>Headings</option>
            <option value={numberedList}>Numbered List</option>
            <option value={dottedList}>Dotted List</option>
            <option value={table}>Table</option>
        </select>
    </li>
    )
}