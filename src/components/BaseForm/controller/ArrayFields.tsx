import React from "react";
import { Button } from "@mui/material";
import { Controller } from "react-hook-form";
import { IBaseController, IFormControl, TSetValue } from "../types";
import { AiFillPlusCircle } from "react-icons/ai";

import BaseForm from "@/components/BaseForm";
import { VStack } from "@chakra-ui/layout";
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
  } = props;

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
      <Button
        onClick={handleAddRow}
        startIcon={<AiFillPlusCircle />}
        variant="contained"
      >
        {addBtnLabel || "Thêm"}
      </Button>
      {value?.map((x: any) => (
        <BaseForm
          key={x._id}
          gap={gap}
          templateColumns={templateColumns || "repeat(24, 1fr)"}
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
              name: "add",
              label: "aaa",
              type: "icon-button",
              icon: <AiOutlineDelete />,
              btnSize: "large",
              colSpan: 1,
              color: "error",
              onClick: () => handleRemoveRow(x._id),
            },
          ]}
        ></BaseForm>
      ))}
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
