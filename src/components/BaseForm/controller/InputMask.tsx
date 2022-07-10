import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { IBaseController, TGetValues, TSetValue } from "../types";
import NumberFormat, { InputAttributes } from "react-number-format";

export interface IInputMaskController extends IBaseController {
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
    onValueChange,
    getValues,
    setValue,
  } = props;

  return (
    <TextField
      {...field}
      onChange={(e) => {
        field.onChange(e);
        onValueChange?.(e.target.value, { getValues, setValue });
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
      InputProps={{
        startAdornment: <InputAdornment position="start"></InputAdornment>,
        inputComponent: NumberFormatCustom as any,
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

const InputMaskController = (props: IInputMaskController) => (
  <Controller
    name={props.name || "name"}
    control={props.control}
    render={({ field }) => <InputMaskForm {...props} field={field} />}
  />
);

export default InputMaskController;
