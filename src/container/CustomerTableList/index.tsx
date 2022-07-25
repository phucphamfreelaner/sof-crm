import { useState, useRef, useEffect } from "react";
import * as UI from "@/libs/ui";
import {
  AiFillPlusCircle,
  AiOutlineDelete,
  AiFillCheckCircle,
} from "react-icons/ai";
import { useGetCustomerListQuery } from "@/store/customer";
import Loading from "@/components/Loading";
import { useNavigate } from "react-router-dom";
import { useLazySearchKhachHangListQuery } from "@/store/khachHang";
import SearchBar from "@/components/SearchBar";
import BaseTable from "@/components/BaseTable";
import { isEmpty } from "lodash-es";
import DeleteCustomerModal from "@/modal/DeleteCustomerModal";
import { MdCancel, MdOpenInNew } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import { format } from "date-fns";

function CustomerTableListContainer() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [
    searchKhachHang,
    {
      data: khachHangData,
      isLoading: isLoadingKhachHang,
      isFetching: isFetchingKhachHang,
    },
  ] = useLazySearchKhachHangListQuery();

  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [totalPages, setTotalPages] = useState(rowsPerPage * (page + 1) + 1);
  const [filters, setFilters] = useState({
    query: "",
    order_by: "order_by[code]=desc",
    search: "",
  });
  const { data, isFetching, refetch, isLoading } = useGetCustomerListQuery(
    {
      page: page + 1,
      limit: rowsPerPage,
      contact: filters?.query,
      order_by: filters?.order_by,
      search: filters?.search,
    },
    { refetchOnMountOrArgChange: true }
  );

  const handleOnchangeBaseSearch = (data) => {
    setFilters((prevState) => ({
      ...prevState,
      query: data?.customer_id?.label ? data?.customer_id?.label : "",
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

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    if (data?.data?.length === 0 || data?.data?.length < rowsPerPage) {
      setTotalPages(data?.data?.length);
    } else {
      setTotalPages(rowsPerPage * (page + 1) + 1);
    }
  }, [data]);

  const [dataSelected, setDataSelected] = useState<any>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // useEffect(()=>{
  //   searchKhachHang({name: ""})
  // },[])

  return (
    <>
      <UI.Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <UI.Container maxWidth="xl">
          <UI.Box sx={{ mb: 4 }}>
            <UI.Grid container justifyContent="space-between" spacing={3}>
              <UI.Grid item>
                <UI.Typography variant="h4">Khách hàng</UI.Typography>
              </UI.Grid>
              <UI.Grid item>
                <UI.Button
                  size="small"
                  startIcon={<AiFillPlusCircle fontSize="small" />}
                  variant="contained"
                  onClick={() => {
                    navigate(`/khach_hang/new`);
                  }}
                >
                  Thêm mới
                </UI.Button>
              </UI.Grid>
            </UI.Grid>
          </UI.Box>
          <UI.Card>
            <UI.Divider />
            <SearchBar
              baseSearchOptions={[
                {
                  name: "customer_id",
                  label: "Tìm kiếm tên khách hàng",
                  type: "autocomplete",
                  colSpan: 8,
                  isLoading: isLoadingKhachHang || isFetchingKhachHang,
                  autocompleteOptions: khachHangData,
                  onSearchChange: (data) => {
                    searchKhachHang({ name: data ? data : "" });
                  },
                  placeholder: "Tất cả",
                },
              ]}
              advanceSearchOptions={[
                {
                  name: "code",
                  type: "input",
                  label: "Mã khách hàng",
                },
                {
                  name: "phone",
                  type: "input",
                  label: "Di động",
                },
                {
                  name: "email",
                  type: "input",
                  label: "Email",
                },
                {
                  name: "create_by",
                  type: "input",
                  label: "Nhân viên nhập",
                },
                {
                  name: "phone2",
                  type: "input",
                  label: "Điện thoại bàn",
                },
                {
                  name: "note",
                  type: "input",
                  label: "Ghi chú",
                },
                {
                  type: "select",
                  name: "da_cham_soc",
                  label: "Chăm sóc",
                  selectOptions: [
                    {
                      label: "Đã chăm sóc",
                      value: "1",
                    },
                    {
                      label: "Chưa chăm sóc",
                      value: "0",
                    },
                  ],
                },
                {
                  name: "page",
                  type: "input",
                  label: "Số trang",
                },
              ]}
              handleOnchangeBaseSearch={handleOnchangeBaseSearch}
              handleOnchangeAdvanceSearch={handleOnchangeAdvanceSearch}
            />
            <DeleteCustomerModal
              open={openDeleteModal}
              customers={dataSelected}
              onClose={() => {
                setOpenDeleteModal(false);
                setDataSelected([]);
              }}
              refetch={refetch}
            />

            {isFetching ? (
              <Loading />
            ) : (
              // <CustomerListTable
              //   customers={data?.data ? data.data : []}
              //   refetch={refetch}
              //   customersCount={totalPages}
              //   onPageChange={handlePageChange}
              //   onRowsPerPageChange={handleRowsPerPageChange}
              //   rowsPerPage={rowsPerPage}
              //   page={page}
              // />

              <BaseTable
                name="Khách Hàng"
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
                    {/* <UI.Button
                      disabled={isEmpty(dataSelected)}
                      color="error"
                      variant="outlined"
                      size="small"
                      startIcon={<AiOutlineDelete size="16" />}
                      onClick={() => {
                        setOpenDeleteModal(true);
                        // setDataSelected([]);
                        // setSelectionModel([]);
                      }}
                    >
                      Xóa
                    </UI.Button> */}
                    <UI.Button
                      disabled={
                        isEmpty(dataSelected) || dataSelected?.length > 1
                      }
                      variant="outlined"
                      size="small"
                      startIcon={<MdOpenInNew size="16" />}
                      onClick={() => {
                        navigate(`/khach_hang/${dataSelected?.[0]?.id}`);
                      }}
                    >
                      Chi tiết
                    </UI.Button>
                  </UI.HStack>
                )}
                columns={[
                  { field: "code", headerName: "Mã Khách hàng", width: 130 },
                  {
                    field: "contact",
                    headerName: "Cách gọi KH",
                    width: 350,
                  },
                  {
                    field: "phone",
                    headerName: "Di động",
                    width: 150,
                  },
                  {
                    field: "email",
                    headerName: "Email",
                    width: 150,
                  },
                  {
                    field: "user_tao",
                    headerName: "NV nhập",
                    width: 150,
                    renderCell: ({ value }) => value?.name,
                  },
                  {
                    field: "created_at",
                    headerName: "Ngày nhập",
                    width: 150,
                    renderCell: ({ value }) =>
                      format(new Date(value), "dd MMM yyyy"),
                  },
                  {
                    field: "address",
                    headerName: "Địa chỉ",
                    width: 350,
                  },
                  {
                    field: "note",
                    headerName: "Ghi chú",
                    width: 150,
                    renderCell: ({ value }) => value?.name,
                  },
                  {
                    field: "da_cham_soc",
                    headerName: "Đã chăm sóc",
                    width: 150,
                    renderCell: ({ value }) => {
                      if (value === 0)
                        return <MdCancel color={"red"} fontSize={"15px"} />;
                      else {
                        return (
                          <AiFillCheckCircle
                            color={"green"}
                            fontSize={"15px"}
                          />
                        );
                      }
                    },
                  },
                ]}
              />
            )}
          </UI.Card>
        </UI.Container>
      </UI.Box>
    </>
  );
}

export default CustomerTableListContainer;
