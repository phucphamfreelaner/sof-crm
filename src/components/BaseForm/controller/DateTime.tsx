/* eslint-disable @typescript-eslint/no-empty-interface */
import React from "react";
import { Controller } from "react-hook-form";
import { IBaseController } from "../types";
import { DatePicker } from "@mui/x-date-pickers";
import { InputAdornment, TextField } from "@mui/material";

export interface IInputController extends IBaseController {
  size?: "medium" | "small";
  textType?: "date";
}

function DateTimePickerForm(props: IInputController) {
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
    <DatePicker
      {...field}
      disabled={isDisabled}
      label="Date Time picker"
      inputFormat="dd/MM/yyyy, HH:mm"
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            fullWidth
            variant="outlined"
            label={label}
            id={name}
            error={!!errorMessage}
            helperText={helperText || errorMessage}
            placeholder={placeholder}
            disabled={isDisabled}
            required={isRequired}
            name={name}
            size={size}
            type={textType}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />
        );
      }}
    />
  );
}

const DateTimeController = (props: IInputController) => (
  <Controller
    name={props.name || "name"}
    control={props.control}
    defaultValue={new Date()}
    render={({ field }) => <DateTimePickerForm {...props} field={field} />}
  />
);

export default DateTimeController;
