/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useQuill } from "react-quilljs";
import { RichTextWrapStyled } from "./styles";
import { CSSObject } from "@mui/material";
import { useUpdateEffect } from "ahooks";

import "quill/dist/quill.snow.css";

interface ILongText {
  defaultValue?: string;
  onChange?: (value: any) => any;
  width?: string;
  height?: string;
  label?: string;
  sx?: CSSObject;
  isDisabled?: boolean;
  isHiddenBorder?: boolean;
}

function LongText(props: ILongText) {
  const {
    defaultValue,
    onChange,
    width = "100%",
    height = "auto",
    label,
    sx,
    isDisabled,
    isHiddenBorder,
  } = props;
  const [value, setValue] = React.useState<string>(defaultValue || "");

  useUpdateEffect(() => {
    onChange?.(value);
  }, [value]);

  const modules = {
    history: {
      delay: 1000,
      maxStack: 100,
      userOnly: false,
    },
    toolbar: {
      container: [
        ["undo"],
        ["redo"],
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
      ],
      handlers: {
        undo: function () {
          this.quill.history.undo();
        },
        redo: function () {
          this.quill.history.redo();
        },
      },
    },
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
  ];

  const { quill, quillRef, Quill } = useQuill({ modules, formats });

  if (Quill && !quill) {
    var icons = Quill.import("ui/icons");
    icons["undo"] = "undo";
    icons["redo"] = "redo";
  }

  const ReactQuillMemo = React.useMemo(
    () => (
      <RichTextWrapStyled
        isHiddenBorder={isHiddenBorder}
        minHeight={height}
        sx={{ width, ...sx }}
      >
        {label && <div className="quill-label">{label}</div>}
        <div ref={quillRef} />
      </RichTextWrapStyled>
    ),
    []
  );

  React.useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(value);
      quill.on("text-change", () => {
        setValue(quill.root.innerHTML);
      });
    }
  }, [quill]);

  return ReactQuillMemo;
}

export default LongText;
