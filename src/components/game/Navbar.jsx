import { useState } from "react"
import loading from "../../assets/YLWC.gif"
import DiceRoller from "./DiceRoller"
import { useHotkeys } from "react-hotkeys-hook"

export default function Navbar({selected,setSelected,game}){
    const [showNav,setShowNav] = useState(true)
    const toggleShow = () => {setShowNav(!showNav)}

    useHotkeys("shift+n", toggleShow)

    return(
    <>{showNav &&
        <div className='nav-bar' style={{"backgroundColor":`${game.colour}`}}>
            <h1 className='nav-title'>{game.title}</h1>

            {game.title === "Loading" && <img src={loading} className="loading-icon"/>}
            
            {selected === "blocks"
            ?<button className='nav-item' style={{"textDecoration":"underline"}}>Blocks</button>
            :<button className='nav-item' onClick={() => setSelected("blocks")}>Blocks</button>
            }
            {selected === "boards"
            ?<button className='nav-item' style={{"textDecoration":"underline"}}>Boards</button>
            :<button className='nav-item' onClick={() => setSelected("boards")}>Boards</button>
            }
            {selected === "details"
            ?<button className='nav-item' style={{"textDecoration":"underline"}}>Details</button>
            :<button className='nav-item' onClick={() => setSelected("details")}>Details</button>
            }

            <DiceRoller/>
        </div>
    }</>
    )
}