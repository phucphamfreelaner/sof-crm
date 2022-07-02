/* eslint-disable @typescript-eslint/no-empty-interface */
import React from "react";
import { Controller } from "react-hook-form";
import { IBaseController } from "../types";
import { debounce } from "lodash-es";
import { TextField } from "@mui/material";

export interface IAutocompleteController extends IBaseController {
  size?: "medium" | "small";
  isLoading?: boolean;
  onSearchChange?: (text: any) => any;
  onBlurChange?: (text: any) => any;
  autocompleteOptions?: { label: string; value: any }[];
}

function Autocomplete(props: IAutocompleteController) {
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
    autocompleteOptions = [],
    onSearchChange,
  } = props;

  const onSearchChangeDebounce = debounce(
    (text: string) => onSearchChange?.(text),
    300
  );

  return (
    <Autocomplete
      {...field}
      fullWidth
      id={name}
      options={autocompleteOptions}
      sx={{ ".MuiIconButton-root": { border: "none !important" } }}
      onChange={(e: any, value) => {
        e.target.value = value;
        e.name = name;
        field.onChange(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          label={label}
          error={!!errorMessage}
          helperText={helperText || errorMessage}
          placeholder={placeholder}
          disabled={isDisabled}
          required={isRequired}
          size={size}
          onChange={(e) => {
            onSearchChangeDebounce(e.target.value);
          }}
        />
      )}
    />
  );
}

const AutocompleteController = (props: IAutocompleteController) => (
  <Controller
    name={props.name || "name"}
    control={props.control}
    render={({ field }) => <Autocomplete {...props} field={field} />}
  />
);

export default AutocompleteController;
