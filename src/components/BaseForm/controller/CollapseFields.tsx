import React from "react";
import { Button, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { IBaseController, IFormControl } from "../types";
import { AiFillDownCircle, AiFillLeftCircle } from "react-icons/ai";
import Collapse from "@mui/material/Collapse";
import { useBoolean } from "ahooks";

import BaseForm from "@/components/BaseForm";
import { Box, HStack, VStack } from "@chakra-ui/layout";
import produce from "immer";

export interface ICollapseFieldsController extends IBaseController {
  fields?: (IFormControl | boolean)[];
  templateColumns?: string;
  templateRows?: string;
  gap?: string;
  label?: string;
  defaultValues?: any;
}

function CollapseFields(props: ICollapseFieldsController) {
  const { fields, templateColumns, gap, field, name, label, defaultValues } =
    props;

  const [value, setValue] = React.useState<any[]>(field?.value || []);

  React.useEffect(() => {
    setValue(field?.value);
  }, [field?.value]);

  const handleWatchChange = (data: any) => handleSubmitData(data);

  const handleSubmitData = (data: any) => {
    field.onChange({
      name,
      target: {
        value: data,
      },
    });
  };
  const [open, setOpen] = useBoolean(false);

  return (
    <VStack w="100%" alignItems="flex-start" spacing="20px">
      <HStack w="100%" justifyContent="space-between" width="100%">
        <Typography variant="h6">{label}</Typography>
        <Button
          onClick={() => {
            setOpen.toggle();
            handleSubmitData(undefined);
          }}
          endIcon={open ? <AiFillDownCircle /> : <AiFillLeftCircle />}
          variant="text"
        >
          Xem thêm
        </Button>
      </HStack>
      <Collapse sx={{ width: "100%" }} in={open}>
        <Box w="100%" p={"12px"}>
          {open && (
            <BaseForm
              gap={gap}
              templateColumns={templateColumns}
              defaultValues={defaultValues}
              watchFields={fields.map((x) => {
                //@ts-ignore
                if (typeof x.name === "string") return x.name;
              })}
              onWatchChange={handleWatchChange}
              fields={fields}
            ></BaseForm>
          )}
        </Box>
      </Collapse>
    </VStack>
  );
}

const CollapseFieldsController = (props: ICollapseFieldsController) => (
  <Controller
    name={props.name || "name"}
    control={props.control}
    render={({ field }) => <CollapseFields {...props} field={field} />}
  />
);

export default CollapseFieldsController;
