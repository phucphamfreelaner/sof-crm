import React from "react";
import { Controller } from "react-hook-form";
import { debounce, isNumber, isObject, isString } from "lodash-es";
import { TextField, Input } from "@mui/material";

import Autocomplete from "@mui/material/Autocomplete";
import { IBaseController } from "../types";
import { useUpdateEffect } from "ahooks";

export interface IAutocompleteController extends IBaseController {
  size?: "medium" | "small";
  isLoading?: boolean;
  onSearchChange?: (text: any) => any;
  onBlurChange?: (text: any) => any;
  autocompleteOptions?: { label: string; value: any }[];
  onGetDataByValue?: (data: any) => Promise<any>;
  mapValueKey?: string;
}

function AutocompleteComponent(props: IAutocompleteController) {
  const [open, setOpen] = React.useState(false);

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
    onGetDataByValue,
    mapValueKey = "name",
  } = props;

  const onSearchChangeDebounce = debounce(
    (text: string) => onSearchChange?.(text),
    300
  );

  const [value, setValue] = React.useState<any>(null);

  React.useEffect(() => {
    if (isString(field?.value) || isNumber(field?.value)) {
      onGetDataByValue?.(field?.value).then((data) =>
        setValue({ label: data?.[mapValueKey], value: field?.value })
      );
      return;
    }
    setValue(field?.value);
  }, [field?.value]);

  return (
    <Autocomplete
      {...field}
      fullWidth
      value={value}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      id={name}
      options={autocompleteOptions}
      sx={{ ".MuiIconButton-root": { border: "none !important" } }}
      onChange={(e: any, value) => {
        e.target.value = value;
        e.name = name;
        field.onChange(value);
        setValue(value);
      }}
      onInputChange={(__, newInputValue) => {
        if (open) onSearchChangeDebounce(newInputValue);
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
