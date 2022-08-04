import React from "react";
import BaseTable from "@/components/BaseTable";
import * as UI from "@/libs/ui";
import { AiOutlineUser } from "react-icons/ai";
import { isEmpty } from "lodash-es";
import { AiOutlineMail, AiOutlineMessage } from "react-icons/ai";
import { MdOpenInNew } from "react-icons/md";
import { uniqueId } from "lodash-es";
import { openModalBottom } from "@/store/modal";

import { useGetCoHoiListQuery, useLazyDeleteCoHoiQuery } from "@/store/coHoi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store";

interface ICoHoiTable {
  filter?: any;
  customerId?: any;
  isShowKhachHangLink?: boolean;
  onSortChange?: (orderBy?: any) => any;
}

function CoHoiTable(props: ICoHoiTable) {
  const dispatch = useAppDispatch();

  const { filter, customerId, isShowKhachHangLink, onSortChange } = props;
  const [limit, setLimit] = React.useState(15);
  const [page, setPage] = React.useState(0);
  const navigate = useNavigate();

  const { data, isLoading, isFetching, refetch } = useGetCoHoiListQuery(
    {
      limit,
      page: page + 1,
      filter: filter,
      customerId,
    },
    { refetchOnMountOrArgChange: true }
  );

  const [dataSelected, setDataSelected] = React.useState<any>(null);

  const [deleteCoHoi] = useLazyDeleteCoHoiQuery();

  return (
    <BaseTable
      name="Cơ hội"
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
      height="calc(100vh - 270px)"
      toolbarAction={({ setSelectionModel }) => (
        <UI.HStack>
          {/* <UI.Button
            disabled={isEmpty(dataSelected) || dataSelected?.length > 1}
            color="error"
            variant="outlined"
            size="small"
            startIcon={<AiOutlineDelete size="16" />}
            onClick={() => {
              deleteCoHoi({ id: dataSelected?.[0]?.id })
                .unwrap()
                .finally(() => {
                  refetch();
                  setDataSelected([]);
                  setSelectionModel([]);
                });
            }}
          >
            Xóa
          </UI.Button> */}
          {isShowKhachHangLink && (
            <UI.Button
              disabled={isEmpty(dataSelected) || dataSelected?.length > 1}
              variant="outlined"
              size="small"
              startIcon={<AiOutlineUser size="16" />}
              onClick={() => {
                navigate(
                  `/khach_hang/${dataSelected?.[0]?.customer_id}/co_hoi`
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
              navigate(`/co_hoi/${dataSelected?.[0]?.id}`);
            }}
          >
            Chi tiết
          </UI.Button>
          <UI.Button
            disabled={isEmpty(dataSelected) || dataSelected?.length > 1}
            variant="outlined"
            size="small"
            startIcon={<AiOutlineMail size="16" />}
            onClick={() => {
              const id = uniqueId();
              dispatch(
                openModalBottom({
                  data: {
                    title: "Gửi email",
                    height: "800px",
                    width: "500px",
                    id: `email-${id}`,
                    type: "email-new",
                    recordId: dataSelected?.[0]?.customer_id,
                    customerId: dataSelected?.[0]?.customer_id,
                    objectId: "khach-hang",
                  },
                })
              );
            }}
          >
            Gửi email
          </UI.Button>
          <UI.Button
            disabled={isEmpty(dataSelected) || dataSelected?.length > 1}
            variant="outlined"
            size="small"
            startIcon={<AiOutlineMessage size="16" />}
            onClick={() => {
              const id = uniqueId();
              dispatch(
                openModalBottom({
                  data: {
                    title: "Gửi sms",
                    height: "620px",
                    width: "500px",
                    id: `gui-sms-${id}`,
                    type: "sms-new",
                    recordId: dataSelected?.[0]?.customer_id,
                    customerId: dataSelected?.[0]?.customer_id,
                    objectId: "khach-hang",
                  },
                })
              );
            }}
          >
            Gửi sms
          </UI.Button>
        </UI.HStack>
      )}
      columns={[
        { field: "code", headerName: "Mã cơ hội", width: 130 },
        {
          field: "name",
          headerName: "Tên cơ hội",
          width: 300,
        },
        {
          field: "phone",
          headerName: "Phone",
          width: 150,
          renderCell: (cellData) => cellData?.row?.khach_hang?.phone || "",
        },
        {
          field: "email",
          headerName: "Email",
          width: 150,
          renderCell: (cellData) => cellData?.row?.khach_hang?.email || "",
        },
        {
          field: "trang_thai",
          headerName: "Trạng thái",
          width: 200,
          renderCell: ({ value }) => value?.name,
        },
        {
          field: "tien_trinh",
          headerName: "Tiến trình",
          width: 200,
          renderCell: ({ value }) => value?.name,
        },
        {
          field: "nhan_vien_tao",
          headerName: "Nhân viên nhập",
          width: 200,
          renderCell: ({ value }) => value?.name,
        },
        {
          field: "created_at",
          headerName: "Ngày nhập",
          width: 200,
        },
        {
          field: "note",
          headerName: "Ghi chú",
          width: 200,
        },
      ]}
    />
  );
}

export default CoHoiTable;
