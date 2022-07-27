/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useQuill } from "react-quilljs";
import { RichTextWrapStyled } from "./styles";
import "quill/dist/quill.snow.css";

interface ILongText {
  defaultValue?: string;
  onChange?: (value: any) => any;
  width?: string;
  height?: string;
}

const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

function LongText(props: ILongText) {
  const { defaultValue, onChange, width = "100%", height = "100%" } = props;
  const [value, setValue] = React.useState<string>(defaultValue || "");

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
      <RichTextWrapStyled style={{ width, height }}>
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
