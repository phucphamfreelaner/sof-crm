import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { IBaseController, TGetValues, TSetValue } from "../types";

export interface IInputController extends IBaseController {
  size?: "medium" | "small";
  textType?: "password" | "number" | "text";
  multiline?: boolean;
  maxRows?: number;
  rows?: number;
  onValueChange?: (
    data: any,
    {
      setValue,
      getValues,
    }: {
      setValue?: TSetValue;
      getValues?: TGetValues;
    }
  ) => any;
  setValue?: TSetValue;
  getValues?: TGetValues;
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
    onValueChange,
    setValue,
    getValues,
  } = props;

  return (
    <TextField
      {...field}
      onChange={(e) => {
        field.onChange?.(e);
        onValueChange?.(e.target.value, { setValue, getValues });
      }}
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
          fontSize: "1.1rem",
          background: "white",
          top: "-1px",
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
