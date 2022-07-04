import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
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

function AutocompleteComponent(props: IAutocompleteController) {
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
    isLoading,
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
      onInputChange={(__, newInputValue) => {
        onSearchChangeDebounce(newInputValue);
      }}
      loading={isLoading}
      renderInput={(params) => {
        return (
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
          />
        );
      }}
    />
  );
}

const AutocompleteController = (props: IAutocompleteController) => (
  <Controller
    name={props.name || "name"}
    control={props.control}
    render={({ field }) => <AutocompleteComponent {...props} field={field} />}
  />
);

export default AutocompleteController;
