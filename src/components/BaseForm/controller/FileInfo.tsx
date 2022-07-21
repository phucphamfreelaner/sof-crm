import React from "react";
import { CSSObject } from "@emotion/react";
import { Typography } from "@mui/material";
import { HStack, Box } from "@chakra-ui/layout";
import {
  AiOutlineFileImage,
  AiOutlineFilePdf,
  AiOutlineFile,
} from "react-icons/ai";

export interface IFileInfoController {
  sx?: CSSObject;
  fileType?: string;
  fileName?: string;
}

const FILE_ICONS = {
  image: <AiOutlineFileImage size="50px" />,
  pdf: <AiOutlineFilePdf size="50px" />,
  file: <AiOutlineFile size="50px" />,
};

function Info(props: IFileInfoController) {
  return (
    <HStack alignItems="flex-start" w="100%">
      <Box minW="50px">{FILE_ICONS?.[props?.fileType]}</Box>
      <Box w="100%">
        <Typography variant="body2">{props?.fileName}</Typography>
      </Box>
    </HStack>
  );
}

export default Info;
