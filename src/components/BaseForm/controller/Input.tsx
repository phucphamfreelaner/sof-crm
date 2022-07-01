/* eslint-disable @typescript-eslint/no-empty-interface */
import React from "react";
import * as UI from "@mui/material";
import { Controller } from "react-hook-form";
import { IBaseController } from "../types";

export interface IInputController extends IBaseController {
  size?: "medium" | "small";
  textType?: "password" | "number" | "text";
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
  } = props;

  return (
    <UI.TextField
      {...field}
      fullWidth
      variant="outlined"
      label={label}
      id={name}
      error={!!errorMessage}
      helperText={helperText || errorMessage}
      placeholder={placeholder}
      disabled={isDisabled}
      required={isRequired}
      size={size}
      type={textType}
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
