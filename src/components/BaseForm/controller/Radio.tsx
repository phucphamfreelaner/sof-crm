/* eslint-disable @typescript-eslint/no-empty-interface */
import React from "react";
import { Controller } from "react-hook-form";
import { IBaseController } from "../types";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  useTheme,
} from "@mui/material";
import { Stack, VStack } from "@chakra-ui/layout";

export interface IRadioController extends IBaseController {
  size?: "medium" | "small";
  radioOptions?: { value: any; label?: string }[];
  radioDirection?: "row" | "column";
}

function RadioPickerForm(props: IRadioController) {
  const { palette } = useTheme();

  const {
    label,
    errorMessage,
    helperText = "",
    isDisabled,
    field,
    size,
    radioOptions,
    radioDirection,
  } = props;

  return (
    <FormControl
      sx={{
        position: "relative",
        py: 1,
        px: 2,
        border: "1px solid #65748B",
        borderColor: "#d4d8ddb0",
        borderRadius: "8px",
        width: "100%",
      }}
    >
      <Typography
        sx={{
          color: "#65748B",
          position: "absolute",
          top: "-12px",
          background: "white",
        }}
        variant="body2"
      >
        {label}
      </Typography>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={field?.value}
        onChange={field?.onChange}
      >
        <Stack spacing={0} direction={radioDirection}>
          {radioOptions?.map((x) => (
            <div
              style={{
                width:
                  radioDirection === "row"
                    ? `calc(100% / ${radioOptions?.length} )`
                    : "100%",
              }}
              key={x.value}
            >
              <FormControlLabel
                disabled={isDisabled}
                value={x.value}
                control={<Radio size={size} />}
                label={x.label}
              />
            </div>
          ))}
        </Stack>
      </RadioGroup>
      <VStack spacing={0} alignItems="flex-start" w="100%">
        {helperText && <Typography variant="caption">{helperText}</Typography>}
        {errorMessage && (
          <Typography variant="caption" color={palette.error.contrastText}>
            {errorMessage}
          </Typography>
        )}
      </VStack>
    </FormControl>
  );
}

const RadioController = (props: IRadioController) => (
  <Controller
    name={props.name || "name"}
    control={props.control}
    defaultValue={new Date()}
    render={({ field }) => <RadioPickerForm {...props} field={field} />}
  />
);

export default RadioController;
