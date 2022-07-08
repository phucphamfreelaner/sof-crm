import React from "react";
import IconButton from "@mui/material/IconButton";
import { CSSObject } from "@emotion/react";
import { HStack } from "@chakra-ui/layout";

export interface IIconButtonFieldController {
  icon?: React.ReactNode;
  sx?: CSSObject;
  color?: any;
  btnSize?: "small" | "medium" | "large";
  onClick?: () => any;
}

function IconButtonField(props: IIconButtonFieldController) {
  const { icon, sx, color, btnSize, onClick } = props;
  return (
    <HStack h="100%" alignItems="center" justifyContent="center">
      <IconButton onClick={onClick} size={btnSize} color={color} sx={sx}>
        {icon}
      </IconButton>
    </HStack>
  );
}

export default IconButtonField;
