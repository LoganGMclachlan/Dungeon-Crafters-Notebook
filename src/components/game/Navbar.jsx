export default function Navbar({selected,setSelected,game}){
    return(
    <div className='nav-bar' style={{"backgroundColor":""+game.colour}}>
        <h1 className='nav-title'>{game.title}</h1>
        
        {selected === "details"
        ?<button className='nav-item' style={{"textDecoration":"underline"}}>Details</button>
        :<button className='nav-item' onClick={() => setSelected("details")}>Details</button>
        }
        {selected === "blocks"
        ?<button className='nav-item' style={{"textDecoration":"underline"}}>Blocks</button>
        :<button className='nav-item' onClick={() => setSelected("blocks")}>Blocks</button>
        }
        {selected === "boards"
        ?<button className='nav-item' style={{"textDecoration":"underline"}}>Boards</button>
        :<button className='nav-item' onClick={() => setSelected("boards")}>Boards</button>
        }
        {selected === "maps"
        ?<button className='nav-item' style={{"textDecoration":"underline"}}>Maps</button>
        :<button className='nav-item' onClick={() => setSelected("maps")}>Maps</button>
        }
    </div>
    )
}