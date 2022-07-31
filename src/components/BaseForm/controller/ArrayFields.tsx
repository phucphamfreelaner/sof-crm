import React from "react";
import { Button, Box, useTheme, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { IBaseController, IFormControl, TSetValue } from "../types";
import { AiFillPlusCircle } from "react-icons/ai";

import BaseForm from "@/components/BaseForm";
import { HStack, VStack, Stack } from "@chakra-ui/layout";
import { AiOutlineDelete } from "react-icons/ai";
import produce from "immer";

export interface IArrayFieldsController extends IBaseController {
  fields?: (IFormControl | boolean)[];
  templateColumns?: string;
  gap?: string;
  defaultArrayValue?: any[];
  onAddRow?: (index: any) => any;
  watchFields?: string[];
  onWatchChange?: (value: any) => any;
  addBtnLabel?: string;
  label?: string;
  direction?: "column" | "row";
}

function ArrayFields(props: IArrayFieldsController) {
  const {
    fields,
    templateColumns,
    gap,
    field,
    onAddRow,
    name,
    onWatchChange,
    addBtnLabel,
    label,
    direction,
  } = props;
  const { palette } = useTheme();
  const [value, setValue] = React.useState<any[]>(field?.value || []);

  React.useEffect(() => {
    setValue(field?.value);
  }, [field?.value]);

  const handleAddRow = () => {
    const row = onAddRow(value.length + 1);
    const nextState = [...value, row];
    setValue(nextState);
    handleSubmitData(nextState);
  };

  const handleRemoveRow = (id: number) => {
    const nextState = value.filter((x) => x._id !== id);
    setValue(nextState);
    handleSubmitData(nextState);
  };
  const handleChangeFieldValue = (id: number, data: any) => {
    const _index = value.findIndex((y) => y._id === id);
    if (_index < 0) return;
    const nextState = produce(value, (draft) => {
      draft[_index] = { ...data, _id: id };
    });
    setValue(nextState);
    handleSubmitData(nextState);
  };

  const handleSubmitData = (data: any) => {
    field.onChange({
      name,
      target: {
        value: data,
      },
    });
  };

  return (
    <VStack justifyContent="flex-end" alignItems="flex-end" spacing="20px">
      {label && (
        <Typography variant="h6" mr={"auto"}>
          {label}
        </Typography>
      )}
      {addBtnLabel && handleAddRow && (
        <Button
          onClick={handleAddRow}
          startIcon={<AiFillPlusCircle />}
          variant="contained"
          size="small"
        >
          {addBtnLabel || "Thêm"}
        </Button>
      )}
      <Stack
        w="100%"
        direction={direction}
        flexWrap="wrap"
        spacing={0}
        gap="10px"
      >
        {value?.map((x: any) => (
          <Box
            key={x._id}
            sx={{
              borderColor: palette.grey[200],
              borderWidth: "1px",
              borderStyle: "solid",
              py: 2,
              px: 2,
              borderRadius: "12px",
              minWidth: "200px",
            }}
          >
            <BaseForm
              key={x._id}
              gap={gap}
              templateColumns={templateColumns || "repeat(1, 1fr)"}
              defaultValues={x}
              watchFields={fields.map((x) => {
                //@ts-ignore
                if (typeof x.name === "string") return x.name;
              })}
              onWatchChange={(data, setValue) => {
                handleChangeFieldValue(x._id, data);
                onWatchChange?.(data);
              }}
              fields={[
                ...fields,
                {
                  name: "delete",
                  type: "icon-button",
                  icon: <AiOutlineDelete />,
                  btnSize: "small",
                  color: "error",
                  onClick: () => handleRemoveRow(x._id),
                },
              ]}
            ></BaseForm>
          </Box>
        ))}
      </Stack>
    </VStack>
  );
}

const ArrayFieldsController = (props: IArrayFieldsController) => (
  <Controller
    name={props.name || "name"}
    control={props.control}
    render={({ field }) => <ArrayFields {...props} field={field} />}
  />
);

export default ArrayFieldsController;
