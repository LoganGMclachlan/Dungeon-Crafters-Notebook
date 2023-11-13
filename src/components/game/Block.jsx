

export default function FolderList({block}){

    return(
        <div className="block">
            <h2>{block.title}</h2>
            <p>{block.content}</p>
        </div>
    )
}