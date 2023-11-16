

export default function FolderList({block, getBlockData, close}){

    async function Save(){

    }

    async function Delete(){

    }



    return(
        <div className="block">
            <button className="x-btn" onClick={close}>X</button>
            <input
                value={block.title}
                className="block-title"/><br/>
            <textarea
                value={block.content}
                className="block-content"/><br/>
            <button className="form-btn" style={{"marginRight":"10px"}}>Save</button>
            <button className="form-btn">Link</button>
            <button className="form-btn" 
                style={{"float":"right","backgroundColor":"red"}}>Delete</button>
        </div>
    )
}