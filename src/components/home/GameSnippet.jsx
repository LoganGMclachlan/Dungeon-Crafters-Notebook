import { useNavigate } from "react-router-dom"

export default function GameSnippet({game}){
    const navigate = useNavigate()

    function SelectGame(){
        navigate("/dashboard", {state:{game:game}})
    }

    return(
        <div className="game-snippet" style={{"backgroundColor":""+game.colour}}>
            <h3>{game.title}</h3>
            <button onClick={() => SelectGame()}>Select</button>
        </div>
    )
}