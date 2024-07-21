import "./styles.css"
import ReactDOM from 'react-dom';

export default function Alert({message,type}){
    const close = () => ReactDOM.unmountComponentAtNode(document.getElementById("alert-container"));

    return(
        <span id="alert" className={type}>
            <b>{type.toUpperCase()}!</b> {message}
            <button onClick={close}>X</button>
        </span>
    )
}