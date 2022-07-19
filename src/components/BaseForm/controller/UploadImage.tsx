/* eslint-disable @typescript-eslint/no-empty-interface */
import React from "react";
import { Controller } from "react-hook-form";
import { IBaseController } from "../types";
import { Button, Typography, useTheme } from "@mui/material";
import { HStack, VStack } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { useUpdateEffect } from "ahooks";
import { AiOutlineCloudUpload } from "react-icons/ai";

export interface IUploadImageController extends IBaseController {}

function UploadImageForm(props: IUploadImageController) {
  const {
    label,
    name,
    errorMessage,
    helperText = "",
    isDisabled,
    field,
  } = props;
  const { palette } = useTheme();

  const [value, setValue] = React.useState<any>(null);

  useUpdateEffect(() => {
    field?.onChange(value);
  }, [value]);

  return (
    <>
      <Button
        startIcon={<AiOutlineCloudUpload />}
        disabled={isDisabled}
        variant="contained"
        component="label"
      >
        <Typography>{label}</Typography>

        <input
          disabled={isDisabled}
          onChange={(event: any) => {
            const files = event.nativeEvent.srcElement.files;
            const myFiles = [];
            let isFilesReady = false;
            const filePromises = Object.entries(files).map((item, i) => {
              return new Promise<void>((resolve, reject) => {
                const [index, file] = item as [any, any];
                const reader = new FileReader();
                reader.readAsBinaryString(file);

                reader.onload = function (event) {
                  myFiles[i] = `data:${file.type};base64,${btoa(
                    //@ts-ignore
                    event.target.result
                  )}`;
                  resolve();
                };
                reader.onerror = function () {
                  console.log("can't read the file");
                  reject();
                };
              });
            });

            Promise.all(filePromises)
              .then(() => {
                isFilesReady = true;
                setValue(myFiles);
              })
              .catch((error) => {
                console.log(error);
                console.log("something wrong happened");
              });
          }}
          hidden
          accept="image/*"
          multiple
          id={name}
          type="file"
        />
      </Button>
      <HStack pt="20px" spacing={"20px"}>
        {value?.map((img, index) => (
          <Image
            boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
            border="6px solid white"
            key={index}
            borderRadius="12px"
            src={img}
            w="120px"
            h="120px"
          />
        ))}
      </HStack>
      <VStack spacing={0} alignItems="flex-start" w="100%">
        {helperText && <Typography variant="caption">{helperText}</Typography>}
        {errorMessage && (
          <Typography variant="caption" color={palette.error.contrastText}>
            {errorMessage}
          </Typography>
        )}
      </VStack>
    </>
  );
}

const DateTimeController = (props: IUploadImageController) => (
  <Controller
    name={props.name || "name"}
    control={props.control}
    defaultValue={new Date()}
    render={({ field }) => <UploadImageForm {...props} field={field} />}
  />
);

export default DateTimeController;
