import { useNavigate } from "react-router-dom"

export default function GameSnippet({game}){
    const navigate = useNavigate()

    function SelectGame(){
        localStorage.setItem("SELECTED_BLOCKS", "[]")
        localStorage.setItem("SELECTED_BOARD", "")
        navigate("/dashboard", {state:{gameid:game.id}})
    }

    return(
        <div className="game-snippet" style={{"backgroundColor":`${game.colour}`}}>
            <h3 onClick={() => SelectGame()}>{game.title}</h3>
        </div>
    )
}