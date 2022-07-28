/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { CSSObject } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";

interface ILongText {
  defaultValue?: string;
  onChange?: (value: any) => any;
  onBlur?: (value: any) => any;
  onFocus?: (value: any) => any;
  width?: string | number;
  height?: string | number;
  label?: string;
  sx?: CSSObject;
  isDisabled?: boolean;
  isHiddenBorder?: boolean;
}

function Comment(props: ILongText) {
  const {
    onBlur,
    onFocus,
    height = 200,
    width,
    onChange,
    defaultValue,
  } = props;
  const editorRef = React.useRef(null);

  return (
    <Editor
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={defaultValue}
      apiKey="8wkmfe63h3pr6iwfenx4kaq3vcmwff0p260561zuu6sxhm6a"
      onBlur={() => {
        onBlur(editorRef.current.getContent());
      }}
      onFocus={() => {
        onFocus(editorRef.current.getContent());
      }}
      onChange={() => {
        onChange(editorRef.current.getContent());
      }}
      init={{
        height,
        width,
        menubar: false,
        statusbar: false,
        skin: "jam",
        icons: "jam",
        setup: function (editor) {
          editor.ui.registry.addButton("sendButton", {
            text: "Send",
            icon: "comment",
            onAction: function (_) {
              console.log("send =>>>>", editorRef.current.getContent());
            },
          });
        },
        plugins: ["autolink", "link", "fullscreen", "emoticons"],
        toolbar: "link emoticons sendButton",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; line-height:0.3rem}",
        toolbar_location: "bottom",
        toolbar_items_size: "small",
      }}
    />
  );
}

export default Comment;
