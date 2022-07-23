import React from "react";
import "suneditor/dist/css/suneditor.min.css";
import plugins from "suneditor/src/plugins";
import Box from "@mui/material/Box";

import suneditor from "suneditor";
import { CSSObject } from "@emotion/react";
import { Typography } from "@mui/material";

interface ITextEditor {
  id?: string;
  onChange?: (content: any) => any;
  defaultValue?: string;
  value?: string;
  isDisabled?: boolean;
  sx?: CSSObject;
  height?: string;
  label?: string;
  hiddenBorder?: boolean;
  padding?: string;
  width?: string;
}

function TextEditor(props: ITextEditor) {
  const {
    id,
    onChange,
    defaultValue,
    value,
    sx,
    height = "150px",
    label,
    hiddenBorder,
    padding = "8px",
    width = "auto",
  } = props;

  const editor = React.useRef<any>(null);

  React.useEffect(() => {
    editor.current = suneditor.create(id, {
      mode: "balloon",
      plugins: plugins,
      width,
      height,
      buttonList: [
        ["undo", "redo", "font", "fontSize", "formatBlock"],
        [
          "bold",
          "underline",
          "italic",
          "strike",
          "subscript",
          "superscript",
          "removeFormat",
        ],

        [
          "fontColor",
          "hiliteColor",
          "outdent",
          "indent",
          "align",
          "horizontalRule",
          "list",
          "table",
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
    <Box
      sx={{
        ...sx,
        ".sun-editor": {
          borderRadius: "6px",
          overflow: "hidden",
          border: "none",
        },
        ".sun-editor-editable": {
          padding,
        },
        border: hiddenBorder ? "none" : "1px solid #dadada;",
        borderRadius: "6px",
        position: "relative",
      }}
    >
      {label && (
        <Typography
          fontWeight={600}
          color="text.secondary"
          sx={{
            background: "white",
            position: "absolute",
            top: "-12px",
            left: "4px",
            zIndex: 5,
            padding: "0 6px",
          }}
          variant="body2"
        >
          {label}
        </Typography>
      )}
      <textarea id={id}>{value}</textarea>
    </Box>
  );
}

export default TextEditor;
