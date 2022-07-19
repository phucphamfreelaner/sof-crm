import React from "react";
import "suneditor/dist/css/suneditor.min.css";
import { Helmet } from "react-helmet";
import plugins from "suneditor/src/plugins";

import suneditor from "suneditor";

interface ITextEditor {
  id?: string;
  onChange?: (content: any) => any;
  defaultValue?: string;
  value?: string;
  isDisabled?: boolean;
}

function TextEditor(props: ITextEditor) {
  const { id, onChange, defaultValue, value } = props;
  const editor = React.useRef<any>(null);

  React.useEffect(() => {
    editor.current = suneditor.create(id, {
      plugins: plugins,
      width: "100%",
      height: "150px",
      buttonList: [
        [
          "undo",
          "redo",
          "font",
          "fontSize",
          "formatBlock",
          "paragraphStyle",
          "blockquote",
          "bold",
          "underline",
          "italic",
          "strike",
          "subscript",
          "superscript",
          "fontColor",
          "hiliteColor",
          "textStyle",
          "removeFormat",
          "outdent",
          "indent",
          "align",
          "horizontalRule",
          "list",
          "lineHeight",
          "table",
          "link",
          "fullScreen",
        ],
      ],
    });
  }, []);

  React.useEffect(() => {
    if (editor.current) {
      editor.current.onChange = function (contents: string) {
        onChange?.(contents);
      };
      if (defaultValue) editor.current.setContents(defaultValue);
    }
  }, [editor.current]);

  React.useEffect(() => {
    if (value !== undefined) {
      editor.current.setContents(value);
    }
  }, [value]);

  return (
    <>
      <Helmet>
        <link
          href="https://cdn.jsdelivr.net/npm/suneditor@latest/dist/css/suneditor.min.css"
          rel="stylesheet"
        />
      </Helmet>
      <textarea id={id}>{value}</textarea>
    </>
  );
}

export default TextEditor;
