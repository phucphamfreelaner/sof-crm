import { styled } from "@mui/material/styles";

export const RichTextWrapStyled: any = styled<any>("div")`
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  padding: 16px;
  border-radius: 6px;
  border: ${(props) => (!props?.isHiddenBorder ? "1px solid #bdbdbd" : "")};
  margin-bottom: 10px;

  .quill-label {
    position: absolute;
    background: white;
    top: -12px;
    padding: 0 4px;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.57;
    color: grey;
  }
  .ql-toolbar {
    border-radius: 4px;
    box-flex-group: white;
    margin-top: 4px;

    .ql-picker-options {
      margin-top: -150px !important;
      z-index: 2 !important;
    }
  }

  .ql-container {
    border: none;
    padding: 0;
    .ql-editor {
      padding: 0px;
      min-height: ${(props) => props?.minHeight || "50px"};
    }
  }
`;
