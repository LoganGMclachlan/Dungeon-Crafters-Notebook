import { useState } from "react"

export default function DiceRoller(){
    const [result,setResult] = useState(null)
    const [dice,setDice] = useState(null)

    const roll = () => {
        setResult(Math.floor(Math.random() * dice) + 1)
        var div = document.getElementById("result")
        div.style.fontSize = "1.4em"
        setTimeout(()=>div.style.fontSize = "1.3em", 200)
        
    }

    return(
    <span style={{"marginTop":"10px","marginLeft":"auto"}}>
        <select  style={{"padding":"3px"}}
            onChange={e => {setDice(e.target.value);roll()}}>
            <option value={3}>d3</option>
            <option value={4}>d4</option>
            <option value={6}>d6</option>
            <option value={8}>d8</option>
            <option value={10}>d10</option>
            <option value={12}>d12</option>
            <option value={20} default>d20</option>
            <option value={100}>d100</option>
        </select>
        <button onClick={roll} style={{"border":"none","padding":"2px"}}>Roll!</button>
        <div className="roll-result">
            {result && <div id="result">{result}</div>}
        </div>
    </span>
    )
}