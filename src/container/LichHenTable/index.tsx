import React from "react";
import BaseTable from "@/components/BaseTable";
import numeral from "numeral";
import * as UI from "@/libs/ui";
import { isEmpty } from "lodash-es";
import { MdOpenInNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useGetLichHenQuery } from "@/store/lichHen";

interface ILichHenTable {
  filter?: any;
  customerId?: any;
  isShowKhachHangLink?: boolean;
  onSortChange?: (orderBy?: any) => any;
}

function LichHenTable(props: ILichHenTable) {
  const { filter, customerId, isShowKhachHangLink, onSortChange } = props;
  const [limit, setLimit] = React.useState(15);
  const [page, setPage] = React.useState(0);
  const navigate = useNavigate();

  const { data, isLoading, isFetching, refetch } = useGetLichHenQuery(
    {
      limit,
      page: page + 1,
      filter,
      customerId,
    },
    { refetchOnMountOrArgChange: true }
  );
  const [dataSelected, setDataSelected] = React.useState<any>(null);

  console.log(filter);

  return (
    <BaseTable
      name="Lịch Hẹn"
      pageSize={limit || 15}
      onPageSizeChange={(pageSize) => pageSize && setLimit(pageSize)}
      onSelectedChange={setDataSelected}
      isLoading={isLoading || isFetching}
      rows={data?.data || []}
      page={page}
      rowCount={
        data?.data?.length > 15 ? data?.data?.length + 1 : data?.data?.length
      }
      onPageChange={setPage}
      onSortChange={(mode) => {
        onSortChange({ order_by: { [mode?.[0].field]: mode?.[0]?.sort } });
      }}
      toolbarAction={({ setSelectionModel }) => (
        <UI.HStack>
          <UI.Button
            disabled={isEmpty(dataSelected) || dataSelected?.length > 1}
            variant="outlined"
            size="small"
            startIcon={<MdOpenInNew size="16" />}
            // onClick={() => {
            //   navigate(`/bao_gia/${dataSelected?.[0]?.id}`);
            // }}
          >
            Chi tiết
          </UI.Button>
        </UI.HStack>
      )}
      columns={[
        { field: "id", headerName: "ID", width: 80 },
        {
          field: "khach_hang",
          headerName: "Cách gọi khách hàng",
          renderCell: ({ value }) => value?.contact,
          width: 250,
        },
        {
          field: "ten",
          headerName: "Tiêu Đề",
          width: 150,
        },
        {
          field: "dia_diem",
          headerName: "Địa điểm",
          width: 150,
        },
        {
          field: "note",
          headerName: "Diễn giải",
          width: 130,
        },
        {
          field: "ngaybatdau",
          headerName: "Ngày bắt đầu",
          width: 200,
        },
        {
          field: "ngayketthuc",
          headerName: "Ngày kết thúc",
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

export default LichHenTable;
