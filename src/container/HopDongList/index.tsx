import { useState, useRef, useEffect } from "react";
import * as UI from "@/libs/ui";
import { useNavigate } from "react-router-dom";
import {
  useGetHopDongListQuery,
  useLazyDeleteHopDongQuery,
  useLazyGetHopDongByNameQuery,
} from "@/store/hopDong";
import numeral from "numeral";
import { MdCancel, MdOpenInNew } from "react-icons/md";
import {
  AiFillCheckCircle,
  AiOutlineDownload,
  AiOutlinePrinter,
  AiOutlineUser,
  AiOutlineMessage,
  AiOutlineMail,
} from "react-icons/ai";
import { IoMdCreate } from "react-icons/io";
import { format } from "date-fns";
import SearchBar from "@/components/SearchBar";
import BaseTable from "@/components/BaseTable";
import { isEmpty } from "lodash-es";
import { LOCAL_KEY } from "@/constants";
import { uniqueId } from "lodash-es";
import { openModalBottom } from "@/store/modal";
import { useAppDispatch } from "@/store";
import { useLazyGetViewBaoGiaQuery } from "@/store/baoGia";

const advanceSearchOptions = [
  {
    label: "Số HĐ",
    name: "code",
    type: "input",
    size: "small",
  },
  {
    label: "Loại HĐ",
    name: "loai_hd_key",
    type: "input",
    size: "small",
  },
  {
    label: "Còn Lại",
    name: "so_tien_con_lai",
    type: "input",
    size: "small",
  },
  {
    label: "Đã Thu",
    name: "so_tien_da_thu",
    type: "input",
    size: "small",
  },
  {
    label: "Tiền Gốc",
    name: "thanh_tien_goc",
    type: "input",
    size: "small",
  },
  {
    label: "Tiền Hàng",
    name: "tong_tien",
    type: "input",
    size: "small",
  },
  {
    label: "VAT",
    name: "vat",
    type: "select",
    size: "small",
    selectOptions: [
      {
        label: "Có",
        value: "1",
      },
      {
        label: "Không",
        value: "0",
      },
    ],
  },
  {
    label: "Tổng Tiền",
    name: "tong_tien_vat",
    type: "input",
    size: "small",
  },
  {
    label: "Kinh Doanh",
    name: "customer_id",
    type: "input",
    size: "small",
  },
  {
    label: "Ngày Nhập",
    name: "created_at",
    type: "input",
    size: "small",
  },
  {
    label: "Điện Thoại",
    name: "phone",
    type: "input",
    size: "small",
  },
  {
    label: "Ngày Ký",
    name: "ngayky",
    type: "input",
    size: "small",
  },
];

function HopDongListContainer(props) {
  const dispatch = useAppDispatch();
  const [getViewBaoGia, { data: fileViewBaoGia }] = useLazyGetViewBaoGiaQuery();
  const navigate = useNavigate();
  const { customerId, isHiddenKhachHang, isHiddenSearchBar } = props;
  const [page, setPage] = useState(0);
  const [dataSelected, setDataSelected] = useState<any>(null);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(rowsPerPage * (page + 1) + 1);

  const [filters, setFilters] = useState({
    query: "",
    order_by: "order_by[code]=desc",
    search: "",
  });

  const { data, isFetching, refetch, isLoading } = useGetHopDongListQuery({
    page: page + 1,
    limit: rowsPerPage,
    name: filters?.query,
    order_by: filters?.order_by,
    search: filters?.search,
    customerQuery: customerId ? `&customer_id=${customerId}` : "",
  });

  const handleOnchangeBaseSearch = (data) => {
    setFilters((prevState) => ({
      ...prevState,
      query: data?.hopdong_name?.label ? data?.hopdong_name?.label : "",
    }));
  };

  const handleOnchangeAdvanceSearch = (data) => {
    let advance_search = "";
    for (const key in data) {
      if (data[key]) {
        if (key === "page") {
          setPage(data[key]);
        } else {
          advance_search += `&s[${key}]=${data[key]}`;
        }
      }
    }
    setFilters((prevState) => ({
      ...prevState,
      search: advance_search,
    }));
  };

  useEffect(() => {
    if (data?.data?.length === 0 || data?.data?.length < rowsPerPage) {
      setTotalPages(data?.data?.length);
    } else {
      setTotalPages(rowsPerPage * (page + 1) + 1);
    }
  }, [data]);

  const [deleteHopDong] = useLazyDeleteHopDongQuery();

  const [
    searchHopDong,
    {
      data: hopDongSearchData,
      isLoading: isLoadingSearchHopDong,
      isFetching: isFetchingSearchHopDong,
    },
  ] = useLazyGetHopDongByNameQuery();

  return (
    <>
      {!isHiddenSearchBar && (
        <SearchBar
          baseSearchOptions={[
            {
              name: "hopdong_name",
              label: "Tìm kiếm tên hợp đồng",
              type: "autocomplete",
              colSpan: 8,
              isLoading: isLoadingSearchHopDong || isFetchingSearchHopDong,
              autocompleteOptions: hopDongSearchData,
              onSearchChange: (data) => {
                searchHopDong({ name: data ? data : "" });
              },
              placeholder: "Tất cả",
              size: "small",
            },
          ]}
          advanceSearchOptions={advanceSearchOptions}
          handleOnchangeBaseSearch={handleOnchangeBaseSearch}
          handleOnchangeAdvanceSearch={handleOnchangeAdvanceSearch}
        />
      )}
      <BaseTable
        name="Hợp Đồng"
        pageSize={rowsPerPage || 15}
        onPageSizeChange={(newSize) => {
          newSize == 0 ? setRowsPerPage(15) : setRowsPerPage(newSize);
        }}
        isLoading={isLoading || isFetching}
        rows={data?.data || []}
        page={page}
        onSelectedChange={setDataSelected}
        rowCount={totalPages}
        onPageChange={setPage}
        onSortChange={(mode) => {
          setFilters((prevState) => ({
            ...prevState,
            order_by: `order_by[${mode?.[0]?.field}]=${mode?.[0]?.sort}`,
          }));
        }}
        height="calc(100vh - 330px)"
        toolbarAction={({ setSelectionModel }) => (
          <UI.HStack>
            {/* <UI.Button
              disabled={isEmpty(dataSelected) || dataSelected?.length > 1}
              color="error"
              variant="outlined"
              size="small"
              startIcon={<AiOutlineDelete size="16" />}
              onClick={() => {
                deleteHopDong({ id: dataSelected?.[0]?.id })
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
            <UI.Button
              disabled={isEmpty(dataSelected) || dataSelected?.length > 1}
              variant="outlined"
              size="small"
              startIcon={<MdOpenInNew size="16" />}
              onClick={() => {
                navigate(`/hop_dong/${dataSelected?.[0]?.id}`);
              }}
            >
              Chi tiết
            </UI.Button>
            <UI.Button
              variant="outlined"
              size="small"
              color="success"
              disabled
              startIcon={<IoMdCreate size="16" />}
              onClick={() => {
                navigate(`/hop_dong/${dataSelected?.[0]?.id}/view`);
              }}
            >
              Tạo Đơn Hàng
            </UI.Button>

            {!isHiddenKhachHang && (
              <UI.Button
                disabled={isEmpty(dataSelected) || dataSelected?.length > 1}
                variant="outlined"
                size="small"
                startIcon={<AiOutlineUser size="16" />}
                onClick={() => {
                  navigate(
                    `/khach_hang/${dataSelected?.[0]?.customer_id}/hop_dong`
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
              startIcon={<AiOutlinePrinter size="16" />}
              onClick={() => {
                navigate(`/hop_dong/${dataSelected?.[0]?.id}/view`);
              }}
            >
              Mẫu in
            </UI.Button>
            <UI.Button
              variant="outlined"
              size="small"
              disabled={isEmpty(dataSelected) || dataSelected?.length > 1}
              startIcon={<AiOutlineDownload size="16" />}
              onClick={() => {
                window.open(
                  `https://apisf.interphase.vn/api/hop-dong/${
                    dataSelected?.[0]?.id
                  }/download-doc?token=${localStorage.getItem(
                    LOCAL_KEY?.TOKEN
                  )}`,
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
              startIcon={<AiOutlineMail size="16" />}
              onClick={() => {
                const id = uniqueId();
                getViewBaoGia({ id: dataSelected?.[0]?.id })
                  .unwrap()
                  .then((res) => {
                    dispatch(
                      openModalBottom({
                        data: {
                          title: "Gửi email",
                          height: "800px",
                          width: "500px",
                          id: `email-${id}`,
                          type: "email-new",
                          customerId: dataSelected?.[0]?.baogia?.customer_id,
                          recordId: dataSelected?.[0]?.id,
                          objectId: "hop-dong",
                          isUploadFile: true,
                          file: res,
                        },
                      })
                    );
                  });
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
                      customerId: dataSelected?.[0]?.baogia?.customer_id,
                      recordId: dataSelected?.[0]?.id,
                      objectId: "hop-dong",
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
          { field: "code", headerName: "Số HĐ", width: 130 },
          {
            field: "name",
            headerName: "Tiêu Đề",
            width: 350,
          },
          {
            field: "loai_hop_dong",
            headerName: "Loại HĐ",
            width: 150,
            renderCell: ({ value }) => value?.name,
          },
          {
            field: "so_tien_con_lai",
            headerName: "Còn Lại",
            width: 150,
            renderCell: ({ value }) => numeral(value).format("0,00"),
          },
          {
            field: "so_tien_da_thu",
            headerName: "Đã Thu",
            width: 150,
            renderCell: ({ value }) => numeral(value).format("0,00"),
          },
          {
            field: "thanh_tien_goc",
            headerName: "Tiền Gốc",
            width: 150,
            renderCell: ({ value }) => numeral(value).format("0,00"),
          },
          {
            field: "tong_tien",
            headerName: "Tiền Hàng",
            width: 150,
            renderCell: ({ value }) => numeral(value).format("0,00"),
          },
          {
            field: "vat",
            headerName: "VAT",
            width: 150,
            renderCell: ({ value }) => {
              if (value === 0)
                return <MdCancel color={"red"} fontSize={"15px"} />;
              else {
                return <AiFillCheckCircle color={"green"} fontSize={"15px"} />;
              }
            },
          },
          {
            field: "tong_tien_vat",
            headerName: "Tổng Tiền",
            width: 150,
            renderCell: ({ value }) => numeral(value).format("0,00"),
          },
          {
            field: "nhan_vien_tao",
            headerName: "Kinh Doanh",
            width: 150,
            renderCell: ({ value }) => value?.name,
          },
          {
            field: "created_at",
            headerName: "Ngày nhập",
            width: 150,
            renderCell: ({ value }) => format(new Date(value), "dd MMM yyyy"),
          },
          {
            field: "khach_hang",
            headerName: "Phone",
            width: 150,
            renderCell: ({ value }) => value?.phone,
          },
          {
            field: "ngayky",
            headerName: "Ngày Ký",
            width: 150,
          },
          {
            field: "bao_gia_co_hoi_tien_trinh",
            headerName: "Tiến Trình (Cơ Hội)",
            width: 200,
            renderCell: ({ value }) => value?.co_hoi?.tien_trinh?.name,
          },
        ]}
      />
    </>
  );
}

export default HopDongListContainer;
