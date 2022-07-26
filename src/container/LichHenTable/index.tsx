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
  search?: any;
  customerId?: any;
  onSortChange?: (orderBy?: any) => any;
}

function LichHenTable(props: ILichHenTable) {
  const { filter, customerId, search, onSortChange } = props;
  const [limit, setLimit] = React.useState(15);
  const [page, setPage] = React.useState(0);
  const navigate = useNavigate();

  const { data, isLoading, isFetching, refetch } = useGetLichHenQuery(
    {
      limit,
      page: page + 1,
      filter,
      search,
      customerId,
    },
    { refetchOnMountOrArgChange: true }
  );
  const [dataSelected, setDataSelected] = React.useState<any>(null);

  return (
    <BaseTable
      name="Lịch Hẹn"
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
            variant="outlined"
            size="small"
            startIcon={<MdOpenInNew size="16" />}
            onClick={() => {
              navigate(`/lich_hen/${dataSelected?.[0]?.id}`);
            }}
          >
            Chi tiết
          </UI.Button>
        </UI.HStack>
      )}
      columns={[
        { field: "id", headerName: "ID", width: 100 },
        {
          field: "khach_hang",
          headerName: "Cách gọi khách hàng",
          renderCell: ({ value }) => value?.contact,
          width: 300,
        },
        {
          field: "ten",
          headerName: "Tiêu Đề",
          width: 200,
        },
        {
          field: "diadiem",
          headerName: "Địa điểm",
          width: 200,
        },
        {
          field: "note",
          headerName: "Diễn giải",
          width: 200,
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
