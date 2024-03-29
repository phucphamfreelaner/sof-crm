import React from "react";
import { DataGrid, GridColumns } from "@mui/x-data-grid";

interface IBaseTable {
  columns: GridColumns<any>;
  isLoading?: boolean;
  rows?: any[];
}

function BaseTable(props: IBaseTable) {
  const { columns, isLoading, rows } = props;

  return (
    <DataGrid
      autoHeight
      autoPageSize
      hideFooter
      paginationMode="server"
      loading={isLoading}
      rows={rows}
      headerHeight={42}
      rowHeight={42}
      hideFooterPagination
      hideFooterSelectedRowCount
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
      columns={columns}
    />
  );
}

export default BaseTable;
