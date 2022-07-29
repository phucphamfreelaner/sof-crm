/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { CSSObject, styled, Avatar } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { stringAvatar } from "@/helper";
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
  srcAvatar?: string;
  nameAvatar?: string;
  sendMessage?: (data: any) => any;
}

function Comment(props: ILongText) {
  const {
    onBlur,
    onFocus,
    width,
    onChange,
    defaultValue,
    srcAvatar,
    nameAvatar = "null",
    sendMessage,
  } = props;
  const editorRef = React.useRef(null);

  return (
    <CommentStyled>
      <Avatar src={srcAvatar}>AD</Avatar>
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
          height: 60,
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
                sendMessage?.(editorRef.current.getContent());
              },
            });
          },
          plugins: ["autolink", "link", "fullscreen", "emoticons"],
          toolbar: "link emoticons | sendButton",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px;}",
          toolbar_location: "bottom",
          toolbar_items_size: "small",
        }}
      />
    </CommentStyled>
  );
}

const CommentStyled = styled("div")`
  display: flex;
  width: 100%;
  gap: 16px;
  .tox.tox-tinymce {
    flex-grow: 1;
  }
  .tox-toolbar__primary {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
`;

export default Comment;
