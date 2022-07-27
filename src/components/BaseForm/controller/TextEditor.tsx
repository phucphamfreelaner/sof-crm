/* eslint-disable @typescript-eslint/no-empty-interface */
import React from "react";
import { Controller } from "react-hook-form";
import { IBaseController } from "../types";
import TextEditor from "@/components/RichText";
import { Typography, Box, useTheme } from "@mui/material";
import { VStack } from "@chakra-ui/layout";

export interface ITextEditorController extends IBaseController {
  id?: string;
}

function TextEditorPickerForm(props: ITextEditorController) {
  const { palette } = useTheme();
  const { label, errorMessage, helperText = "", isDisabled, field } = props;

  return (
    <Box
      sx={{
        position: "relative",
        padding: 1,
        border: "1px solid #65748B",
        borderColor: "#d4d8ddb0",
        borderRadius: "8px",
      }}
    >
      <Typography
        sx={{
          color: "#65748B",
          position: "absolute",
          top: "-12px",
          background: "white",
        }}
        variant="body2"
      >
        {label}
      </Typography>

      <TextEditor
        isDisabled={isDisabled}
        defaultValue={field?.value}
        onChange={(value) => field?.onChange(value)}
        isHiddenBorder
        height="100px"
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

const TextEditorController = (props: ITextEditorController) => (
  <Controller
    name={props.name || "name"}
    control={props.control}
    defaultValue={new Date()}
    render={({ field }) => <TextEditorPickerForm {...props} field={field} />}
  />
);

export default TextEditorController;
