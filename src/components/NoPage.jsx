import { Link, useNavigate } from "react-router-dom"
import "./home/home.css"

export default function NoPage(){
    const navigate = useNavigate()

    return(
    <div className="menu">
        <h1 className="title">Page Not Found!</h1>
        <p style={{"textAlign":"center"}}>
            <u onClick={() => navigate("/")}>Return to Home</u>
        </p>
    </div>
    )
}