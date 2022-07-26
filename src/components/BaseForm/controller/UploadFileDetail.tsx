/* eslint-disable @typescript-eslint/no-empty-interface */
import React from "react";
import { IBaseController, IFormControl } from "../types";
import axios from "axios";

import { Controller } from "react-hook-form";
import { Button, Typography, useTheme } from "@mui/material";
import { HStack, VStack } from "@chakra-ui/layout";
import BaseForm from "@/components/BaseForm";
import { useBoolean, useUpdateEffect } from "ahooks";
import { AiOutlineCloudUpload, AiOutlineDelete } from "react-icons/ai";
import { LOCAL_KEY } from "@/constants";
import { isArray, last } from "lodash-es";

export interface IUploadFileDetailController extends IBaseController {
  fields?: (IFormControl | boolean)[];
  templateColumns?: string;
  gap?: string;
  defaultArrayValue?: any[];
  watchFields?: string[];
  onWatchChange?: (value: any) => any;
  label?: string;
}

function UploadFileDetailForm(props: IUploadFileDetailController) {
  const {
    label,
    name,
    errorMessage,
    helperText = "",
    isDisabled,
    field,
    fields,
    gap,
    templateColumns,
    onWatchChange,
  } = props;
  const { palette } = useTheme();

  const [value, setValue] = React.useState<any[]>(field?.value || []);
  const [isLoading, setLoading] = useBoolean(false);

  useUpdateEffect(() => {
    field?.onChange(value);
  }, [value]);

  const handleChangeFieldValue = (path: number, data: any) => {
    const index = value?.findIndex((x) => x.path === path);
    if (index < 0) return;
    const _data = [...value];
    _data[index] = { ..._data[index], ...data };
    setValue(_data);
  };
  const handleRemoveFile = (path: string) => {
    setValue((s) => s.filter((x) => x?.path !== path));
  };
  return (
    <>
      <Button
        startIcon={<AiOutlineCloudUpload />}
        disabled={isDisabled}
        variant="contained"
        component="label"
        size="small"
      >
        <Typography variant="button">
          {!isLoading ? label : "Loading..."}
        </Typography>
        <input
          key={JSON.stringify(value)}
          disabled={isDisabled}
          onChange={(event: any) => {
            const files = event.nativeEvent.srcElement.files;
            setLoading.setTrue();
            axios
              .post(
                "https://apisf.interphase.vn/api/common/filemanager/upload-storages",
                files,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem(
                      LOCAL_KEY.TOKEN
                    )}`,
                  },
                }
              )
              .then((res) => {
                console.log("🚀 ~ res", res);
                if (isArray(value)) setValue((s) => [...s, ...res?.data?.data]);
                else setValue(res?.data?.data);
              })
              .finally(() => setLoading.setFalse());
          }}
          hidden
          accept="image/*"
          multiple
          id={name}
          type="file"
        />
      </Button>
      <VStack w="100%" pt="20px" spacing={"20px"}>
        {value?.map?.((item, index: number) => (
          <BaseForm
            key={index}
            gap={gap}
            templateColumns={templateColumns || "repeat(9, 1fr)"}
            defaultValues={item}
            watchFields={fields?.map?.((x) => {
              //@ts-ignore
              if (typeof x.name === "string") return x.name;
            })}
            onWatchChange={(data) => {
              handleChangeFieldValue(item?.path, data);
              onWatchChange?.(data);
            }}
            fields={[
              {
                name: "file",
                type: "file-info",
                fileName: last((item?.path as string)?.split("/")),
                fileType: "file",
                colSpan: 3,
              },
              ...fields,
              {
                name: "add",
                label: "aaa",
                type: "icon-button",
                icon: <AiOutlineDelete />,
                btnSize: "large",
                colSpan: 1,
                color: "error",
                onClick: () => handleRemoveFile(item?.path),
              },
            ]}
          ></BaseForm>
        ))}
      </VStack>
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

const UploadFileDetailController = (props: IUploadFileDetailController) => (
  <Controller
    name={props.name || "name"}
    control={props.control}
    defaultValue={new Date()}
    render={({ field }) => <UploadFileDetailForm {...props} field={field} />}
  />
);

export default UploadFileDetailController;
