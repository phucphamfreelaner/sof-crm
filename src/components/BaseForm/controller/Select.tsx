import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { IBaseController } from "../types";

export interface ISelectController extends IBaseController {
  size?: "medium" | "small";
  textType?: "password" | "number" | "text";
  selectOptions?: { value: any; label: string }[];
}

function InputForm(props: ISelectController) {
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
    selectOptions = [],
  } = props;

  return (
    <TextField
      {...field}
      fullWidth
      select
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
    >
      {selectOptions?.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

const SelectController = (props: ISelectController) => (
  <Controller
    name={props.name || "name"}
    control={props.control}
    render={({ field }) => <InputForm {...props} field={field} />}
  />
);

export default SelectController;
