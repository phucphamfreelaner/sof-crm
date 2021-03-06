import { forwardRef } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { styled } from "@mui/material/styles";

const ScrollbarRoot = styled(SimpleBar)``;

export const Scrollbar = forwardRef((props: any, ref: any) => {
  return <ScrollbarRoot ref={ref} {...props} />;
});
