import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { IBaseController } from "../types";
import NumberFormat, { InputAttributes } from "react-number-format";

export interface IInputMaskController extends IBaseController {
  size?: "medium" | "small";
  textType?: "password" | "number" | "text";
  multiline?: boolean;
  maxRows?: number;
  rows?: number;
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumberFormatCustom = React.forwardRef<
  NumberFormat<InputAttributes>,
  CustomProps
>(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator=","
      suffix=" đ"
    />
  );
});

function InputMaskForm(props: IInputMaskController) {
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
      InputProps={{
        startAdornment: <InputAdornment position="start"></InputAdornment>,
        inputComponent: NumberFormatCustom as any,
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

const InputMaskController = (props: IInputMaskController) => (
  <Controller
    name={props.name || "name"}
    control={props.control}
    render={({ field }) => <InputMaskForm {...props} field={field} />}
  />
);

export default InputMaskController;
