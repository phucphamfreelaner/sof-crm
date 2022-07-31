import React from "react";
import BaseTableDense from "@/components/BaseTableDense";
import { CurrencyType, ProductName, UnitName } from "../TableCellRender";
import * as UI from "@/libs/ui";
import { FiExternalLink } from "react-icons/fi";
import numeral from "numeral";

function ProductTableDense({ value }: { value: any }) {
  return (
    <BaseTableDense
      rows={value}
      columns={[
        {
          field: "product_id",
          headerName: "Tên sản phẩm",
          flex: 1,
          minWidth: 120,
          renderCell: ({ value }) => {
            return <ProductName id={value} />;
          },
        },
        {
          field: "url",
          headerName: "Đường dẫn",
          flex: 1,
          minWidth: 70,
          renderCell: ({ value }) => {
            return (
              <UI.Link href={value} variant="caption" target="_blank">
                <FiExternalLink /> {value}
              </UI.Link>
            );
          },
        },
        {
          field: "so_luong",
          headerName: "Số lượng",
          width: 90,
          align: "center",
          headerAlign: "center",
          renderCell: ({ value }) => {
            return <UI.Typography variant="caption">{value}</UI.Typography>;
          },
        },
        {
          field: "don_vi_key",
          headerName: "Đơn vị",
          width: 70,
          align: "center",
          headerAlign: "center",
          renderCell: ({ value }) => {
            return <UnitName code={value} />;
          },
        },
        {
          field: "don_gia",
          headerName: "Đơn giá",
          width: 70,
          align: "center",
          headerAlign: "center",
          renderCell: ({ value }) => {
            return (
              <UI.Typography variant="caption">
                {numeral(value).format("0,0")}
              </UI.Typography>
            );
          },
        },
        {
          field: "thue",
          headerName: "Thuế",
          align: "center",
          width: 70,
          headerAlign: "center",
          renderCell: ({ value }) => {
            return (
              <UI.Typography variant="caption">
                {numeral(value).format("0,0")}
              </UI.Typography>
            );
          },
        },

        {
          field: "phu_thu",
          headerName: "Phụ thu",
          align: "center",
          width: 70,
          headerAlign: "center",
          renderCell: ({ value }) => {
            return (
              <UI.Typography variant="caption">
                {numeral(value).format("0,0")}
              </UI.Typography>
            );
          },
        },
        {
          field: "phi_khac",
          headerName: "Phí khác",
          align: "center",
          width: 70,
          headerAlign: "center",
          renderCell: ({ value }) => {
            return (
              <UI.Typography variant="caption">
                {numeral(value).format("0,0")}
              </UI.Typography>
            );
          },
        },
        {
          field: "thanh_tien_goc_locate",
          headerName: "Tổng đơn",
          align: "center",
          width: 90,
          headerAlign: "center",
          renderCell: ({ value }) => {
            return (
              <UI.Typography variant="caption">
                {numeral(value).format("0,0")}
              </UI.Typography>
            );
          },
        },

        {
          field: "loai_tien_key",
          headerName: "Loại tiền",
          width: 90,
          align: "center",
          headerAlign: "center",
          renderCell: ({ value }) => {
            return <CurrencyType code={value} />;
          },
        },
        {
          field: "note",
          headerName: "Ghi chú",
          align: "center",
          headerAlign: "center",
          renderCell: ({ value }) => {
            return (
              <UI.Tooltip title={value}>
                <UI.Typography variant="caption">{value}</UI.Typography>
              </UI.Tooltip>
            );
          },
        },
      ]}
    />
  );
}

export default ProductTableDense;
