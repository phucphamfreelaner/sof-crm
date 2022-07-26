import React from "react";
import * as UI from "@/libs/ui";
import { useUpdateEffect } from "ahooks";
import { AiFillSetting } from "react-icons/ai";
import {
  DataGrid,
  GridColumns,
  GridColumnVisibilityModel,
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
  toolbarAction?: ({
    setSelectionModel,
  }: {
    setSelectionModel?: (data?: any) => any;
  }) => React.ReactNode;
  name?: string;
  onSortChange?: (mode: any, detail: any) => any;
}

function BaseTable(props: IBaseTable) {
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
    onSortChange,
  } = props;

  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);

  useUpdateEffect(() => {
    onSelectedChange(
      compact(selectionModel.map((x) => keyBy(rows, "id")?.[x]))
    );
  }, [selectionModel]);

  const [columnVisibilityModel, setColumnVisibilityModel] =
    React.useState<GridColumnVisibilityModel>({});

  return (
    <div
      style={{
        height,
        width: "100%",
        position: "relative",
        background: "white",
        borderRadius: "8px",
      }}
    >
      <DataGrid
        localeText={{
          toolbarColumns: "Cấu hình cột",
          toolbarDensity: "Cấu hình hàng",
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
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) =>
          setColumnVisibilityModel(newModel)
        }
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
        onSortModelChange={onSortChange}
        checkboxSelection
        components={{
          Toolbar: () => (
            <CustomToolbar>
              {toolbarAction({ setSelectionModel })}
            </CustomToolbar>
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
        }}
        columns={columns}
      />
    </div>
  );
}

function CustomToolbar(props: any) {
  const { children } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <GridToolbarContainer>
      <UI.HStack
        w="100%"
        py="10px"
        px="8px"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        {children}
        <UI.IconButton onClick={handleClick}>
          <AiFillSetting />
        </UI.IconButton>
        <UI.Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <UI.List>
            <UI.ListItem>
              <GridToolbarColumnsButton />
            </UI.ListItem>
            <UI.ListItem>
              <GridToolbarDensitySelector />
            </UI.ListItem>
          </UI.List>
        </UI.Popover>
      </UI.HStack>
    </GridToolbarContainer>
  );
}

export default BaseTable;
