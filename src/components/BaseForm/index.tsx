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

const CONTROLLER: any = {
  input: InputController,
};

const BaseForm = React.forwardRef((props: IBaseForm, ref?: any) => {
  const {
    defaultValues,
    onSubmit = () => {},
    schema,
    children,
    fields,
    gap,
    templateColumns,
    childrenRowSpan,
    childrenColSpan,
    onDirty,
    watchFields,
    watchDefaultValueFields,
    onWatchChange,
    footerStyle,
    sx,
  } = props;

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({
    defaultValues,
    resolver: yupResolver(yup.object().shape(schema)),
  });

  React.useImperativeHandle(
    ref,
    () => ({
      handleSubmit,
    }),
    [handleSubmit]
  );

  React.useEffect(() => {
    if (isDirty) onDirty?.(dirtyFields);
  }, [isDirty, JSON.stringify(dirtyFields)]);

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <Grid
        width="100%"
        templateColumns={templateColumns || "repeat(1, 1fr)"}
        gap={gap || 2}
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
            >
              <Component
                {...x}
                errorMessage={errors?.[x.name!]?.message}
                control={control}
              />
            </GridItem>
          );
        })}
        <GridItem
          rowSpan={childrenRowSpan || 1}
          colSpan={childrenColSpan || 1}
          sx={footerStyle}
        >
          {children}
        </GridItem>
      </Grid>
      {watchFields && !isEmpty(watchFields) && (
        <FieldWatched
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
}: {
  control: Control;
  watchFields: string[];
  watchDefaultValueFields?: any;
  onWatchChange?: (value: any) => any;
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
    onWatchChange?.(data);
  }, [value]);

  return <div />;
}

export default BaseForm;
