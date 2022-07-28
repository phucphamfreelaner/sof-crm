import React from "react";
import { CSSObject } from "@emotion/react";

import type { IInputController } from "./controller/Input";
import type { IAutocompleteController } from "./controller/Autocomplete";
import type { ICheckboxController } from "./controller/Checkbox";
import type { ISelectController } from "./controller/Select";
import type { ILableController } from "./controller/Label";
import type { IArrayFieldsController } from "./controller/ArrayFields";
import type { ICollapseFieldsController } from "./controller/CollapseFields";

import type { IIconButtonFieldController } from "./controller/IconButton";
import type { IRadioController } from "./controller/Radio";
import type { IUploadFileDetailController } from "./controller/UploadFileDetail";
import type { IFileInfoController } from "./controller/FileInfo";
import type { ITextEditorController } from "./controller/TextEditor";
import type { ICommentController } from "./controller/Comment";

export interface IBaseForm {
  id?: string;
  defaultValues?: any;
  onSubmit?: (data: any) => any;
  schema?: any;
  children?: React.ReactNode;
  fields: (IFormControl | boolean)[];
  templateColumns?: string;
  templateRows?: string;
  gap?: string | number;
  rowGap?: string | number;
  columnGap?: string | number;
  childrenColSpan?: number;
  childrenRowSpan?: number;
  onDirty?: (dirtyFields: any) => any;
  watchFields?: string[];
  watchDefaultValueFields?: any;
  onWatchChange?: (
    value: any,
    setValue: (name: string, value: any, config?: Object) => void
  ) => any;
  withLabel?: boolean;
  childrenSx?: React.CSSProperties;
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
  colEnd?: number;
  colStart?: number;
}

export type IFormControl = IBaseController &
  ILableController &
  IInputController &
  IAutocompleteController &
  ICheckboxController &
  ISelectController &
  IArrayFieldsController &
  IIconButtonFieldController &
  ICollapseFieldsController &
  IRadioController &
  IUploadFileDetailController &
  IFileInfoController &
  ITextEditorController &
  ICommentController & {
    type:
      | "input"
      | "select"
      | "label"
      | "checkbox"
      | "radio"
      | "autocomplete"
      | "array-fields"
      | "input-mask"
      | "collapse-fields"
      | "date-picker"
      | "text-editor"
      | "upload-file"
      | "upload-file-detail"
      | "file-info"
      | "comment"
      | "icon-button";
    rowSpan?: number;
    colSpan?: number;
  };

export type TGetValues = (payload?: string | string[]) => Object;
export type TSetValue = (name: string, value: any, config?: Object) => void;
