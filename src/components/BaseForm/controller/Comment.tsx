/* eslint-disable @typescript-eslint/no-empty-interface */
import React from "react";
import { Controller } from "react-hook-form";
import { IBaseController } from "../types";
import Comment from "@/components/Comment";
import { Typography, Box, useTheme } from "@mui/material";
import { VStack } from "@chakra-ui/layout";

export interface ICommentController extends IBaseController {
  id?: string;
}

function CommentPickerForm(props: ICommentController) {
  const { palette } = useTheme();
  const { errorMessage, helperText = "", isDisabled, field } = props;

  return (
    <Box>
      <Comment
        isDisabled={isDisabled}
        defaultValue={field?.value}
        onChange={(value) => field?.onChange(value)}
      />

      <VStack spacing={0} alignItems="flex-start" w="100%">
        {helperText && <Typography variant="caption">{helperText}</Typography>}
        {errorMessage && (
          <Typography variant="caption" color={palette.error.contrastText}>
            {errorMessage}
          </Typography>
        )}
      </VStack>
    </Box>
  );
}

const CommentController = (props: ICommentController) => (
  <Controller
    name={props.name || "name"}
    control={props.control}
    defaultValue={new Date()}
    render={({ field }) => <CommentPickerForm {...props} field={field} />}
  />
);

export default CommentController;
