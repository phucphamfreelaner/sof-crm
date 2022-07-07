import React from "react";
import { Button } from "@mui/material";
import { Controller } from "react-hook-form";
import { IBaseController, IFormControl } from "../types";
import { AiFillPlusCircle } from "react-icons/ai";

import BaseForm from "@/components/BaseForm";
import { VStack } from "@chakra-ui/layout";
import { AiOutlineDelete } from "react-icons/ai";
import { remove } from "lodash-es";

export interface IArrayFieldsController extends IBaseController {
  size?: "medium" | "small";
  textType?: "password" | "number" | "text";
  multiline?: boolean;
  maxRows?: number;
  rows?: number;
  fields?: (IFormControl | boolean)[];
  templateColumns?: string;
  gap?: string;
  defaultArrayValue?: any[];
  onAddRow?: () => any;
}

function ArrayFields(props: IArrayFieldsController) {
  const { fields, templateColumns, gap, field, onAddRow } = props;

  const [value, setValue] = React.useState<any[]>(field?.value);

  React.useEffect(() => {
    setValue(field?.value);
  }, [field?.value]);

  const handleAddRow = () => {
    const row = onAddRow();
    setValue((s: any) => [...s, row]);
  };

  const handleRemoveRow = (index: number) => {
    const arr = remove(value, (x, i) => {
      console.log("🚀 ~ file: ArrayFields.tsx ~ line 41 ~ arr ~ i", i);
      return i === index;
    });
    console.log("🚀 ~ file: ArrayFields.tsx ~ line 43 ~ arr ~ arr", arr);

    setValue(arr);
  };

  return (
    <VStack justifyContent="flex-end" alignItems="flex-end" spacing="20px">
      <Button
        onClick={handleAddRow}
        startIcon={<AiFillPlusCircle />}
        variant="contained"
      >
        Thêm
      </Button>
      {value?.map((x: any, index: number) => (
        <BaseForm
          gap={gap}
          templateColumns={templateColumns || "repeat(24, 1fr)"}
          defaultValues={x}
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
              onClick: () => handleRemoveRow(index),
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
