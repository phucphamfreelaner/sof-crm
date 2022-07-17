import { useState, useRef, useEffect } from "react";
import * as UI from "@/libs/ui";
import { useNavigate } from "react-router-dom";
import { useGetHopDongListQuery } from "@/store/hopDong";
import numeral from "numeral";
import { MdCancel } from "react-icons/md";
import {
  AiFillCheckCircle,
  AiOutlineDownload,
  AiOutlinePrinter,
} from "react-icons/ai";
import { IoMdCreate } from "react-icons/io";
import { format } from "date-fns";
import SearchBar from "@/components/SearchBar";
import BaseTable from "@/components/BaseTable";
import { isEmpty } from "lodash-es";
import { LOCAL_KEY } from "@/constants";

const sortOptions = [
  {
    label: "Số HĐ",
    name: "code",
    type: "input",
  },
  {
    label: "Tiêu Đề",
    name: "name",
    type: "input",
  },
  {
    label: "Loại HĐ",
    name: "loai_hd_key",
    type: "input",
  },
  {
    label: "Còn Lại",
    name: "so_tien_con_lai",
    type: "input",
  },
  {
    label: "Đã Thu",
    name: "so_tien_da_thu",
    type: "input",
  },
  {
    label: "Tiền Gốc",
    name: "thanh_tien_goc",
    type: "input",
  },
  {
    label: "Tiền Hàng",
    name: "tong_tien",
    type: "input",
  },
  {
    label: "VAT",
    name: "vat",
    type: "select",
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
  },
  {
    label: "Kinh Doanh",
    name: "customer_id",
    type: "input",
  },
  {
    label: "Ngày Nhập",
    name: "created_at",
    type: "input",
  },
  {
    label: "Điện Thoại",
    name: "phone",
    type: "input",
  },
  {
    label: "Ngày Ký",
    name: "ngayky",
    type: "input",
  },
];

const orderOptions = [
  {
    label: "Giảm dần",
    value: "desc",
  },
  {
    label: "Tăng dần",
    value: "asc",
  },
];

function HopDongListContainer() {
  const navigate = useNavigate();
  const [sort, setSort] = useState(sortOptions[0].name);
  const [orderBy, setOrderBy] = useState(orderOptions[0].value);
  const [page, setPage] = useState(0);
  const [dataSelected, setDataSelected] = useState<any>(null);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const queryRef = useRef(null);
  const [totalPages, setTotalPages] = useState(rowsPerPage * (page + 1) + 1);

  const [filters, setFilters] = useState({
    query: "",
    order_by: "order_by[code]=desc",
    search: "",
  });

  const { data, isFetching, refetch, isLoading } = useGetHopDongListQuery({
    page: page + 1,
    limit: rowsPerPage,
    code: filters?.query,
    order_by: filters?.order_by,
    search: filters?.search,
  });

  const handleQueryChange = (event) => {
    event.preventDefault();
    setFilters((prevState) => ({
      ...prevState,
      query: queryRef.current?.value,
    }));
    setPage(0);
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

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleOrderChange = (event) => {
    setOrderBy(event.target.value);
  };

  useEffect(() => {
    setFilters((prevState) => ({
      ...prevState,
      order_by: `order_by[${sort}]=${orderBy}`,
    }));
  }, [orderBy, sort]);

  useEffect(() => {
    if (data?.data?.length === 0 || data?.data?.length < rowsPerPage) {
      setTotalPages(data?.data?.length);
    } else {
      setTotalPages(rowsPerPage * (page + 1) + 1);
    }
  }, [data]);

  return (
    <>
      <SearchBar
        sort={sort}
        orderBy={orderBy}
        queryRef={queryRef}
        sortOptions={sortOptions}
        orderOptions={orderOptions}
        handleQueryChange={handleQueryChange}
        handleOrderChange={handleOrderChange}
        handleSortChange={handleSortChange}
        handleOnchangeAdvanceSearch={handleOnchangeAdvanceSearch}
      />
      <BaseTable
        name="Báo giá"
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
        toolbarAction={({ setSelectionModel }) => (
          <UI.HStack>
            <UI.Button
              variant="outlined"
              size="small"
              color="success"
              disabled={isEmpty(dataSelected) || dataSelected?.length > 1}
              startIcon={<IoMdCreate size="16" />}
              onClick={() => {
                navigate(`/hop_dong/${dataSelected?.[0]?.id}/view`);
              }}
            >
              Tạo Đơn Hàng
            </UI.Button>
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
