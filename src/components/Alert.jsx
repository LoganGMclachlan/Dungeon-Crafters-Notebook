import "./styles.css"
import ReactDOM from 'react-dom';
import { useHotkeys } from "react-hotkeys-hook";

// Alert component
function Alert({message,type}){
    const close = () => ReactDOM.unmountComponentAtNode(document.getElementById("alert-container"));

    useHotkeys("return", close)

    return(
        <span id="alert" className={type}>
            <b>{type.toUpperCase()}!</b> {message}
            <button onClick={close}>X</button>
        </span>
    )
}

// function to insert alert component into DOM
const useAlert = (messageIn,typeIn) => ReactDOM.render(<Alert message={messageIn} type={typeIn}/>, 
    document.getElementById("alert-container"))

export default useAlert