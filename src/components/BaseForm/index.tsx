/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { GridItem, Grid } from "@chakra-ui/layout";
import { Control, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { compact, isEmpty, transform } from "lodash-es";
import { IBaseForm, IFormControl } from "./types";

import InputController from "./controller/Input";
import SelectController from "./controller/Select";
import LabelController from "./controller/Label";
import AutocompleteController from "./controller/Autocomplete";
import CheckboxController from "./controller/Checkbox";
import ArrayFieldsController from "./controller/ArrayFields";
import IconButtonController from "./controller/IconButton";
import InputMaskController from "./controller/InputMask";
import CollapseFieldsController from "./controller/CollapseFields";
import DateTimeController from "./controller/DateTime";
import TextEditorController from "./controller/TextEditor";
import Radio from "./controller/Radio";
import UploadImage from "./controller/UploadImage";
import UploadFileDetail from "./controller/UploadFileDetail";
import FileInfo from "./controller/FileInfo";
import Comment from "./controller/Comment";
import TableEditController from "./controller/TableEdit";

const CONTROLLER: any = {
  input: InputController,
  select: SelectController,
  checkbox: CheckboxController,
  autocomplete: AutocompleteController,
  label: LabelController,
  "array-fields": ArrayFieldsController,
  "collapse-fields": CollapseFieldsController,
  "icon-button": IconButtonController,
  "input-mask": InputMaskController,
  "date-picker": DateTimeController,
  "text-editor": TextEditorController,
  radio: Radio,
  "upload-file": UploadImage,
  "upload-file-detail": UploadFileDetail,
  "file-info": FileInfo,
  comment: Comment,
  "table-edit": TableEditController,
};

const BaseForm = React.forwardRef((props: IBaseForm, ref?: any) => {
  const {
    id,
    defaultValues,
    onSubmit = () => {},
    schema,
    children,
    fields,
    gap,
    rowGap,
    columnGap,
    templateColumns,
    templateRows,
    childrenRowSpan,
    childrenColSpan,
    onDirty,
    watchFields,
    watchDefaultValueFields,
    onWatchChange,
    childrenSx,
    sx,
  } = props;

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    setValue,
    getValues,
    setFocus,
  } = useForm({
    defaultValues,
    resolver: yupResolver(yup.object().shape(schema)),
  });

  React.useImperativeHandle(
    ref,
    () => ({
      handleSubmit,
      setValue,
      setFocus,
      getValues,
    }),
    [handleSubmit]
  );

  React.useEffect(() => {
    if (isDirty) onDirty?.(dirtyFields);
  }, [isDirty, JSON.stringify(dirtyFields)]);

  return (
    <form id={id} style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <Grid
        width="100%"
        templateColumns={templateColumns || "repeat(1, 1fr)"}
        templateRows={templateRows}
        gap={gap || 2}
        rowGap={rowGap}
        columnGap={columnGap}
        sx={sx}
      >
        {/* @ts-ignore */}
        {compact(fields)?.map((x: IFormControl, i) => {
          const Component = CONTROLLER?.[x.type];
          return (
            <GridItem
              key={i}
              rowSpan={x?.rowSpan || 1}
              colSpan={x?.colSpan || 1}
              colStart={x?.colStart}
              colEnd={x?.colEnd}
            >
              <Component
                {...x}
                setValue={setValue}
                getValues={getValues}
                errorMessage={errors?.[x.name!]?.message}
                control={control}
              />
            </GridItem>
          );
        })}
        <GridItem
          rowSpan={childrenRowSpan || 1}
          colSpan={childrenColSpan || 1}
          sx={childrenSx}
        >
          {children}
        </GridItem>
      </Grid>
      {watchFields && !isEmpty(watchFields) && (
        <FieldWatched
          setValue={setValue}
          control={control}
          watchFields={watchFields}
          watchDefaultValueFields={watchDefaultValueFields}
          onWatchChange={onWatchChange}
        />
      )}
    </form>
  );
});

function FieldWatched({
  control,
  watchFields,
  watchDefaultValueFields,
  onWatchChange,
  setValue,
}: {
  control: Control;
  watchFields: string[];
  watchDefaultValueFields?: any;
  onWatchChange?: (
    value: any,
    setValue: (name: string, value: any, config?: Object) => void
  ) => any;
  setValue?: (name: string, value: any, config?: Object) => void;
}) {
  const value = useWatch({
    control,
    name: watchFields,
    defaultValue: watchDefaultValueFields,
  });

  React.useEffect(() => {
    const data = transform(
      watchFields,
      (res, key, index) => {
        res[key] = value[index];
        return res;
      },
      {} as any
    );
    onWatchChange?.(data, setValue);
  }, [value]);

  return <div />;
}

export default BaseForm;
