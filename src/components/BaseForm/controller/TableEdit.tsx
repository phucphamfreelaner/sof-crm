/* eslint-disable @typescript-eslint/no-empty-interface */
import React from "react";
import { Controller } from "react-hook-form";
import { IBaseController } from "../types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { keyBy, values } from "lodash-es";

export interface ITableEditController extends IBaseController {
  tableEditColumns?: GridColDef[];
}

function TableEditForm(props: ITableEditController) {
  const { field, tableEditColumns } = props;

  return (
    <DataGrid
      rowHeight={45}
      headerHeight={45}
      hideFooterSelectedRowCount
      hideFooter
      hideFooterPagination
      autoHeight
      disableSelectionOnClick
      disableColumnFilter
      disableColumnMenu
      disableColumnSelector
      disableDensitySelector
      rows={field?.value || []}
      columns={tableEditColumns || []}
      experimentalFeatures={{ newEditingApi: true }}
      processRowUpdate={(newRow, oldRow) => {
        const data = keyBy(field?.value, "id") as any;
        data[oldRow?.id] = newRow;
        field?.onChange(values(data));

        return newRow;
      }}
    />
  );
}

const TableEditFormController = (props: ITableEditController) => (
  <Controller
    name={props.name || "name"}
    control={props.control}
    render={({ field }) => <TableEditForm {...props} field={field} />}
  />
);

export default TableEditFormController;
