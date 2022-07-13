import React from "react";
import * as UI from "@/libs/ui";
import { useUpdateEffect } from "ahooks";

import {
  DataGrid,
  GridColumns,
  GridSelectionModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { keyBy, compact } from "lodash-es";

interface IBaseTable {
  columns: GridColumns<any>;
  height?: string;
  onPageSizeChange?: (pageSize: number) => any;
  onSelectedChange?: (data: any) => any;
  isLoading?: boolean;
  rows?: any[];
  rowCount?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => any;
  toolbarAction?: React.ReactNode;
  name?: string;
}

function BaseTable(props: IBaseTable) {
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);

  useUpdateEffect(() => {
    onSelectedChange(
      compact(selectionModel.map((x) => keyBy(rows, "id")?.[x]))
    );
  }, [selectionModel]);

  const {
    columns,
    height = "calc(100vh - 400px)",
    pageSize = 15,
    name = "dòng",
    onPageSizeChange,
    onSelectedChange,
    isLoading,
    rows,
    rowCount,
    page,
    onPageChange,
    toolbarAction,
  } = props;
  return (
    <div
      style={{
        height,
        width: "100%",
        position: "relative",
      }}
    >
      <DataGrid
        localeText={{
          toolbarColumns: "Cột",
          toolbarDensity: "Hàng",
          toolbarDensityComfortable: "Rộng rãi",
          toolbarDensityCompact: "Thu gọn",
          toolbarDensityStandard: "Bình thường",
          columnsPanelHideAllButton: "Ẩn toàn bộ",
          columnsPanelShowAllButton: "Hiển thị toàn bộ",
          columnsPanelTextFieldLabel: "Tìm kiếm",
          columnsPanelTextFieldPlaceholder: "Tên cột",
          footerRowSelected: (counter) => (
            <UI.Typography sx={{ textTransform: "lowercase" }}>
              Chọn {counter} {name}
            </UI.Typography>
          ),
        }}
        keepNonExistentRowsSelected
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
        rowsPerPageOptions={[15, 20, 30, 50, 80, 100]}
        disableColumnFilter
        paginationMode="server"
        loading={isLoading}
        rows={rows}
        page={page}
        rowCount={rowCount}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        filterMode="server"
        sortingMode="server"
        onPageChange={onPageChange}
        checkboxSelection
        components={{
          Toolbar: () => <CustomToolbar>{toolbarAction}</CustomToolbar>,
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
        }}
        columns={columns}
      />
    </div>
  );
}

function CustomToolbar(props: any) {
  const { children } = props;
  return (
    <GridToolbarContainer>
      <UI.HStack
        w="100%"
        py="10px"
        px="8px"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        {children}
        <UI.HStack>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
        </UI.HStack>
      </UI.HStack>
    </GridToolbarContainer>
  );
}

export default BaseTable;
