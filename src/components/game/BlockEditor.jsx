import { Editor } from "@tinymce/tinymce-react";

export default function BlockEditor({content,setContent}){

    return(
    <Editor
        apiKey={import.meta.env.VITE_TINY_API_KEY}
        value={content}
        onEditorChange={(e,editor) => setContent(editor.getContent())}
        init={{
            height: 360,
            menubar: false,
            browser_spellcheck: true,
            resize:false,
            plugins: ["table","lists"],
            toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | bullist numlist outdent indent | " +
                "table tabledelete | tableprops tablerowprops tablecellprops | " + 
                "tableinsertrowbefore tableinsertrowafter tabledeleterow | " + 
                "tableinsertcolbefore tableinsertcolafter tabledeletecol"
        }}
        //  toolbar: 

    />
    )
}