import React from "react";
import BaseTableDense from "@/components/BaseTableDense";
import { CurrencyType, ProductName, UnitName } from "../TableCellRender";
import * as UI from "@/libs/ui";

function ProductTableDense({ value }: { value: any }) {
  return (
    <BaseTableDense
      rows={value}
      columns={[
        {
          field: "product_id",
          headerName: "Tên sản phẩm",
          flex: 1,
          width: 200,
          renderCell: ({ value }) => {
            return <ProductName id={value} />;
          },
        },
        {
          field: "don_gia",
          headerName: "Đơn giá",
          width: 100,
          align: "center",
          headerAlign: "center",
        },
        {
          field: "so_luong",
          headerName: "Số lượng",
          width: 100,
          align: "center",
          headerAlign: "center",
        },
        {
          field: "loai_tien_key",
          headerName: "Loại tiền",
          width: 100,
          align: "center",
          headerAlign: "center",
          renderCell: ({ value }) => {
            return <CurrencyType code={value} />;
          },
        },
        {
          field: "don_vi_key",
          headerName: "Đơn vị tính",
          width: 100,
          align: "center",
          headerAlign: "center",
          renderCell: ({ value }) => {
            return <UnitName code={value} />;
          },
        },
        {
          field: "thanh_tien",
          headerName: "Thành tiền",
          align: "center",
          headerAlign: "center",
          width: 120,
        },
        {
          field: "thue",
          headerName: "Thuế, phí",
          align: "center",
          width: 120,
          headerAlign: "center",
        },
        {
          field: "tong_tien",
          headerName: "Tổng tiền",
          align: "center",
          headerAlign: "center",
          width: 120,
          renderCell: ({ row }) => {
            return (
              <UI.Typography variant="body2">
                {row?.thanh_tien + row?.thue}
              </UI.Typography>
            );
          },
        },
      ]}
    />
  );
}

export default ProductTableDense;
