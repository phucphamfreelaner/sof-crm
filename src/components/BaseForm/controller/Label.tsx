import React from "react";
import Box from "@mui/material/Box";
import { CSSObject } from "@emotion/react";

export interface ILableController {
  labelContent?: React.ReactNode;
  sx?: CSSObject;
}

function Label(props: ILableController) {
  return <Box sx={props.sx}>{props.labelContent}</Box>;
}

export default Label;
