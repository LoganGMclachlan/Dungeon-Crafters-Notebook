import { doc, getDoc } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../config/firebase"
import "./styles.css"
import { Editor } from "@tinymce/tinymce-react"
import { htmlToText } from "html-to-text"

export default function Share(){
    const { id } = useParams()
    const [block,setBlock] = useState("")

    useEffect(() => getBlock(), [])

    const getBlock = useCallback(async () => {
        try{
            const rawData = await getDoc(doc(db,"Blocks",id))
            setBlock(rawData.data())
        }
        catch(err){console.error(err)}
    })

    return(
        <div className="block-share">
            <h1>{block.title}</h1>
            {navigator.onLine
            ? <Editor 
                    apiKey="c70a4j85ev1e4q1dopyxbpw772r0lz047pef9umlig63xfdh"
                    value={block.content}
                    disabled={true}
                    inline={true}
                    init={{
                        menubar:false,
                        toolbar:false,
                        resize:false
                    }}
                />
            : <textarea value={htmlToText(block.content,{wordwrap: 80})}/>
            }
        </div>
    )
}