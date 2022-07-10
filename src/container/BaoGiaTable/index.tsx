import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetBaoGiaQuery } from "@/store/baoGia";
import numeral from "numeral";
interface IBaoGiaTable {
  filter?: any;
}

function BaoGiaTable(props: IBaoGiaTable) {
  const { filter } = props;
  const [limit, setLimit] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const { data, isLoading, isFetching } = useGetBaoGiaQuery({
    limit,
    page: page + 1,
    filter,
  });

  return (
    <div style={{ height: "auto", width: "100%" }}>
      <DataGrid
        autoHeight
        autoPageSize
        headerHeight={70}
        pageSize={limit || 15}
        onPageSizeChange={(newSize) => setLimit(newSize)}
        rowsPerPageOptions={[15, 20, 30, 50, 80, 100]}
        disableColumnFilter
        paginationMode="server"
        loading={isLoading || isFetching}
        rows={data?.data || []}
        page={page}
        rowCount={data?.data?.length * 10}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        pagination
        filterMode="server"
        sortingMode="server"
        onPageChange={setPage}
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
        columns={[
          { field: "code", headerName: "Mã báo giá", width: 130 },
          {
            field: "khach_hang",
            headerName: "Các gọi KH",
            width: 250,
            renderCell: ({ value }) => value?.contact,
          },
          {
            field: "ngaybaogia",
            headerName: "Ngày báo giá",
            width: 150,
          },
          {
            field: "loai_tien",
            headerName: "Loại tiền",
            renderCell: ({ value }) => value?.name,
            width: 100,
          },
          {
            field: "tong_tien_goc",
            headerName: "Số tiền vốn",
            renderCell: ({ value }) => numeral(value).format("0,00"),
            width: 200,
          },
          {
            field: "tong_tien",
            headerName: "Số tiền",
            renderCell: ({ value }) => numeral(value).format("0,00"),
            width: 200,
          },
          {
            field: "tong_tien_vat",
            headerName: "Số tiền (VAT)",
            renderCell: ({ value }) => numeral(value).format("0,00"),
            width: 200,
          },
          {
            field: "nhan_vien_nhap",
            headerName: "Nhân viên nhập",
            renderCell: ({ value }) => value?.name,
            width: 200,
          },
          {
            field: "created_at",
            headerName: "Ngày nhập",
            width: 200,
          },
        ]}
      />
    </div>
  );
}

export default BaoGiaTable;
