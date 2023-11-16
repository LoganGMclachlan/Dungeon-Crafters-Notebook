

export default function FolderList({block}){

    return(
        <div className="block">
            <button>X</button>
            <h2>{block.title}</h2>
            <p>{block.content}</p>
            <button>Save</button>
            <button>Delete</button>
        </div>
    )
}