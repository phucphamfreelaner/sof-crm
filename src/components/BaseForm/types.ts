import React from "react";
import type { IInputController } from "./controller/Input";
import { CSSObject } from "@emotion/react";

export interface IBaseForm {
  defaultValues?: any;
  onSubmit?: (data: any) => any;
  schema?: any;
  children?: React.ReactNode;
  fields: (IFormControl | boolean)[];
  templateColumns?: string;
  gap?: string | number;
  childrenColSpan?: number;
  childrenRowSpan?: number;
  onDirty?: (dirtyFields: any) => any;
  watchFields?: string[];
  watchDefaultValueFields?: any;
  onWatchChange?: (value: any) => any;
  withLabel?: boolean;
  footerStyle?: React.CSSProperties;
  sx?: CSSObject;
}

export interface IBaseController {
  isRequired?: boolean;
  label?: string | React.ReactNode;
  name?: string;
  placeholder?: string;
  errorMessage?: string;
  helperText?: string;
  isDisabled?: boolean;
  control?: any;
  field?: any;
}

export type IFormControl = IBaseController &
  IInputController & {
    type: "input" | "select" | "label" | "checkbox" | "autocomplete";
    rowSpan?: number;
    colSpan?: number;
    selectOptions?: { value: any; label: string }[];
  };
