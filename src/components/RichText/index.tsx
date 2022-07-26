/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useQuill } from "react-quilljs";
// import "quill/dist/quill.snow.css";

interface ILongText {
  defaultValue?: string;
  onChange?: (value: any) => any;
}

function LongText(props: ILongText) {
  const { defaultValue, onChange } = props;
  const [value, setValue] = React.useState<string>(defaultValue || "");

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
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
    "link",
    "image",
    "video",
  ];

  const { quill, quillRef } = useQuill({ modules, formats });

  const ReactQuillMemo = React.useMemo(
    () => (
      <div style={{ width: "100%", height: "100%" }}>
        <div ref={quillRef} />
      </div>
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
