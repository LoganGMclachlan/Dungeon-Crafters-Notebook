import "./styles.css"
import ReactDOM from 'react-dom';
import { useHotkeys } from "react-hotkeys-hook";

export default function Alert({message,type}){
    const close = () => ReactDOM.unmountComponentAtNode(document.getElementById("alert-container"));

    useHotkeys("return", close)

    return(
        <span id="alert" className={type}>
            <b>{type.toUpperCase()}!</b> {message}
            <button onClick={close}>X</button>
        </span>
    )
}