import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { IBaseController } from "../types";
import numeral from "numeral";

export interface IInputController extends IBaseController {
  size?: "medium" | "small";
  textType?: "password" | "number" | "text";
  multiline?: boolean;
  maxRows?: number;
  rows?: number;
}

function InputForm(props: IInputController) {
  const {
    isRequired,
    label,
    name,
    placeholder,
    errorMessage,
    helperText = "",
    isDisabled,
    field,
    size,
    textType = "text",
    multiline,
    maxRows,
    rows,
  } = props;

  return (
    <TextField
      {...field}
      fullWidth
      variant="outlined"
      multiline={multiline}
      rows={rows}
      maxRows={maxRows}
      label={label}
      id={name}
      error={!!errorMessage}
      helperText={helperText || errorMessage}
      placeholder={placeholder}
      disabled={isDisabled}
      required={isRequired}
      size={size}
      textType={textType}
      type={textType}
      InputProps={{
        startAdornment: <InputAdornment position="start"></InputAdornment>,
      }}
      sx={{
        ".MuiFormLabel-root": {
          fontSize: "1.3rem",
          background: "white",
          top: "-5px",
          padding: "0 4px",
        },
      }}
    />
  );
}

const InputController = (props: IInputController) => (
  <Controller
    name={props.name || "name"}
    control={props.control}
    render={({ field }) => <InputForm {...props} field={field} />}
  />
);

export default InputController;
