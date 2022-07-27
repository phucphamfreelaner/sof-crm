import { styled } from "@mui/material/styles";

export const RichTextWrapStyled: any = styled<any>("div")`
  display: flex;
  flex-direction: column-reverse;
  padding: 16px;
  border-radius: 6px;
  border: 1px solid gray;
  margin-bottom: 10px;
  .ql-toolbar {
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
      min-height: 20px;
    }
  }
`;
