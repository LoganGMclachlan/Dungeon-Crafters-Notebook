import { Editor } from "@tinymce/tinymce-react";

export default function BlockEditor({content,setContent}){

    return(
    <Editor
        apiKey="c70a4j85ev1e4q1dopyxbpw772r0lz047pef9umlig63xfdh"
        initialValue={content}
        onEditorChange={(e,editor) => setContent(editor.getContent())}
        init={{
            height: 360,
            menubar: false,
            browser_spellcheck: true,
            toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help"
        }}
    />
    )
}