import { useState } from "react";
import "./styles.css"

export default function Hint({ message }){
    const [visable, setVisable] = useState(false)

    return(
        <div 
            onMouseEnter={() => setVisable(true)}
            onMouseLeave={() => setVisable(false)}
            className="hint-container">
            <button className="hint-btn">?</button>
            {visable && <div className="hint-msg">{message}</div>}
        </div>
    )
}