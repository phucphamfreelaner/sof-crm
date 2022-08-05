/* eslint-disable @typescript-eslint/no-empty-interface */
import React from "react";
import { Controller } from "react-hook-form";
import { IBaseController } from "../types";
import { DataGrid, GridColDef, useGridApiContext } from "@mui/x-data-grid";

import { keyBy, values } from "lodash-es";
import { Box, HStack } from "@chakra-ui/layout";
import Button from "@mui/material/Button";

export interface ITableEditController extends IBaseController {
  tableEditColumns?: GridColDef[];
  onTableEditAddRow?: () => any;
}

function TableEditForm(props: ITableEditController) {
  const { field, tableEditColumns, onTableEditAddRow } = props;

  const [rows, setRows] = React.useState(field?.value || []);

  return (
    <Box w="100%" pb="10px">
      <DataGrid
        rows={rows}
        headerHeight={42}
        rowHeight={42}
        hideFooterPagination
        autoHeight
        disableSelectionOnClick
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
        // rows={field?.value || []}
        columns={tableEditColumns || []}
        experimentalFeatures={{ newEditingApi: true }}
        components={{
          Footer: () => (
            <FooterComponent
              setRows={setRows}
              onTableEditAddRow={onTableEditAddRow}
            />
          ),
        }}
        sx={{
          ".MuiDataGrid-columnHeaders": {
            background: "#F3F4F6",
            textTransform: "uppercase",
          },
          boxShadow: 2,
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
          ".MuiDataGrid-cell": {
            borderBottom: "1px solid #eeeef9",
          },
          ".MuiDataGrid-columnHeaderTitle": {
            fontSize: 11,
            fontWeight: 600,
          },
        }}
        processRowUpdate={(newRow, oldRow) => {
          const data = keyBy(field?.value, "id") as any;
          data[oldRow?.id] = newRow;
          field?.onChange(values(data));

          return newRow;
        }}
      />
    </Box>
  );
}

const FooterComponent = ({ onTableEditAddRow, setRows }: any) => {
  return (
    <HStack w="100%" p="6px">
      {onTableEditAddRow && (
        <Button
          onClick={() => {
            const newData = onTableEditAddRow?.();
            setRows((oldRows: any) => [...oldRows, newData]);
          }}
          size="small"
          variant="outlined"
          sx={{ marginTop: "12px" }}
        >
          Add new
        </Button>
      )}
    </HStack>
  );
};

const TableEditFormController = (props: ITableEditController) => (
  <Controller
    name={props.name || "name"}
    control={props.control}
    render={({ field }) => <TableEditForm {...props} field={field} />}
  />
);

export default TableEditFormController;
