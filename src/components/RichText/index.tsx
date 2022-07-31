/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { CSSObject, Box, Typography } from "@mui/material";
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

function RichText(props: ILongText) {
  const {
    onBlur,
    onFocus,
    height = 200,
    width,
    onChange,
    defaultValue,
    isDisabled,
    label,
    sx,
  } = props;
  const editorRef = React.useRef(null);

  return (
    <Box sx={{ width: "100%", position: "relative", ...sx }}>
      {label && (
        <Typography
          top="0px"
          sx={{
            position: "absolute",
            zIndex: 2,
            background: "white",
            top: "-10px;",
            left: "10px;",
            fontWeight: 600,
            padding: "0 8px",
            color: "gray",
          }}
          variant="body2"
        >
          {label}
        </Typography>
      )}
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={defaultValue}
        apiKey="8wkmfe63h3pr6iwfenx4kaq3vcmwff0p260561zuu6sxhm6a"
        onBlur={() => {
          onBlur?.(editorRef.current.getContent());
        }}
        onFocus={() => {
          onFocus?.(editorRef.current.getContent());
        }}
        onChange={() => {
          onChange?.(editorRef.current.getContent());
        }}
        disabled={isDisabled}
        init={{
          height,
          width,
          menubar: false,
          statusbar: false,
          skin: "jam",
          icons: "jam",
          plugins: [
            "advlist",
            "autolink",
            "link",
            "lists",
            "charmap",
            "preview",
            "anchor",
            "pagebreak",
            "searchreplace",
            "wordcount",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "table",
            "emoticons",
          ],
          toolbar:
            "undo redo | styles | bold italic underline backcolor | alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | link emoticons preview fullscreen ",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px;}",
          toolbar_location: "bottom",
        }}
      />
    </Box>
  );
}

export default RichText;
