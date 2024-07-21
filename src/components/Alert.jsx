import "./styles.css"

export default function Alert({message,type}){
    const close = () => document.getElementById("alert").remove()

    return(
        <span id="alert" className={type}>
            <b>{type.toUpperCase()}!</b> {message}
            <button onClick={close}>X</button>
        </span>
    )
}