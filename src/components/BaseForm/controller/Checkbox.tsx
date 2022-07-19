import React from "react";
import {
  Checkbox,
  FormControlLabel,
  Typography,
  useTheme,
} from "@mui/material";

import { Controller } from "react-hook-form";
import { IBaseController } from "../types";
import { VStack } from "@chakra-ui/layout";

export interface ICheckboxController extends IBaseController {
  size?: "medium" | "small" | "large";
  textType?: "password" | "number" | "text";
}

function CheckboxForm(props: ICheckboxController) {
  const { palette } = useTheme();
  const {
    label,
    name,
    errorMessage,
    helperText = "",
    isDisabled,
    field,
    size,
  } = props;

  return (
    <VStack spacing={0} position="relative" w="100%" alignItems="flex-start">
      <FormControlLabel
        {...field}
        name={name}
        control={
          <Checkbox
            sx={{ py: 0 }}
            size={size}
            checked={+field?.value}
            {...field}
          />
        }
        label={label}
        disabled={isDisabled}
        sx={{ ".MuiFormControlLabel-label": { fontSize: "0.875rem" } }}
      />
      <VStack spacing={0} alignItems="flex-start" w="100%">
        {helperText && <Typography variant="caption">{helperText}</Typography>}
        {errorMessage && (
          <Typography variant="caption" color={palette.error.contrastText}>
            {errorMessage}
          </Typography>
        )}
      </VStack>
    </VStack>
  );
}

const CheckboxController = (props: ICheckboxController) => (
  <Controller
    name={props.name || "name"}
    control={props.control}
    render={({ field }) => <CheckboxForm {...props} field={field} />}
  />
);

export default CheckboxController;
