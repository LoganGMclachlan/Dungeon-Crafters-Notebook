import { statBlock, encounterPlan, characterSheet } from "./Templates"

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
            <option value={statBlock}>Stat Block</option>
            <option value={encounterPlan}>Encounter Plan</option>
            <option value={characterSheet}>Character Sheet</option>
        </select>
    </li>
    )
}