import React from "react";
import { useGetBaoGiaQuery } from "@/store/baoGia";
import BaseTable from "@/components/BaseTable";
import numeral from "numeral";
import * as UI from "@/libs/ui";
import {
  AiOutlineUser,
  AiOutlinePrinter,
  AiOutlineDownload,
} from "react-icons/ai";
import { isEmpty } from "lodash-es";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineFileAdd,
} from "react-icons/ai";
import { MdOpenInNew } from "react-icons/md";

import { useLazyDeleteBaoGiaQuery } from "@/store/baoGia";
import { useNavigate } from "react-router-dom";
import { LOCAL_KEY } from "@/constants";

interface IBaoGiaTable {
  filter?: any;
  customerId?: any;
  isShowKhachHangLink?: boolean;
  onSortChange?: (orderBy?: any) => any;
}

function BaoGiaTable(props: IBaoGiaTable) {
  const { filter, customerId, isShowKhachHangLink, onSortChange } = props;
  const [limit, setLimit] = React.useState(15);
  const [page, setPage] = React.useState(0);
  const navigate = useNavigate();

  const { data, isLoading, isFetching, refetch } = useGetBaoGiaQuery(
    {
      limit,
      page: page + 1,
      filter,
      customerId,
    },
    { refetchOnMountOrArgChange: true }
  );

  const [dataSelected, setDataSelected] = React.useState<any>(null);

  const [deleteBaoGia] = useLazyDeleteBaoGiaQuery();

  return (
    <BaseTable
      name="Báo giá"
      pageSize={limit || 15}
      onPageSizeChange={(pageSize) => pageSize && setLimit(pageSize)}
      onSelectedChange={setDataSelected}
      isLoading={isLoading || isFetching}
      rows={data?.data || []}
      page={page}
      rowCount={data?.data?.length * 10}
      onPageChange={setPage}
      onSortChange={(mode) => {
        onSortChange({ order_by: { [mode?.[0].field]: mode?.[0]?.sort } });
      }}
      toolbarAction={({ setSelectionModel }) => (
        <UI.HStack>
          <UI.Button
            disabled={isEmpty(dataSelected) || dataSelected?.length > 1}
            color="error"
            variant="outlined"
            size="small"
            startIcon={<AiOutlineDelete size="16" />}
            onClick={() => {
              deleteBaoGia({ id: dataSelected?.[0]?.id })
                .unwrap()
                .then(() => {
                  refetch();
                  setDataSelected([]);
                  setSelectionModel([]);
                });
            }}
          >
            Xóa
          </UI.Button>
          {isShowKhachHangLink && (
            <UI.Button
              disabled={isEmpty(dataSelected) || dataSelected?.length > 1}
              variant="outlined"
              size="small"
              startIcon={<AiOutlineUser size="16" />}
              onClick={() => {
                navigate(
                  `/khach_hang/${dataSelected?.[0]?.customer_id}/bao_gia`
                );
              }}
            >
              Khách hàng
            </UI.Button>
          )}
          <UI.Button
            disabled={isEmpty(dataSelected) || dataSelected?.length > 1}
            variant="outlined"
            size="small"
            startIcon={<MdOpenInNew size="16" />}
            onClick={() => {
              navigate(`/bao_gia/${dataSelected?.[0]?.id}`);
            }}
          >
            Chi tiết
          </UI.Button>
          <UI.Button
            disabled={isEmpty(dataSelected) || dataSelected?.length > 1}
            variant="outlined"
            size="small"
            startIcon={<AiOutlinePrinter size="16" />}
            onClick={() => {
              navigate(`/bao_gia/${dataSelected?.[0]?.id}/view`);
            }}
          >
            Mẫu in
          </UI.Button>
          <UI.Button
            disabled={isEmpty(dataSelected) || dataSelected?.length > 1}
            variant="outlined"
            size="small"
            startIcon={<AiOutlineDownload size="16" />}
            onClick={() => {
              window.open(
                `https://apisf.interphase.vn/api/bao-gia/${
                  dataSelected?.[0]?.id
                }/download-doc?token=${localStorage.getItem(LOCAL_KEY?.TOKEN)}`,
                "_blank"
              );
            }}
          >
            Tải xuống
          </UI.Button>
          <UI.Button
            disabled={isEmpty(dataSelected) || dataSelected?.length > 1}
            variant="outlined"
            size="small"
            color="success"
            startIcon={<AiOutlineFileAdd size="16" />}
          >
            Tạo hợp đồng
          </UI.Button>
        </UI.HStack>
      )}
      columns={[
        { field: "code", headerName: "Mã báo giá", width: 130 },
        {
          field: "khach_hang",
          headerName: "Các gọi KH",
          width: 300,
          renderCell: ({ value }) => value?.contact || "---",
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
          width: 130,
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
          field: "created_at",
          headerName: "Ngày nhập",
          width: 200,
        },
      ]}
    />
  );
}

export default BaoGiaTable;
