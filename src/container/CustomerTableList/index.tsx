import { useState, useRef, useEffect } from "react";
import CustomerListTable from "@/components/CustomerTableList";
import * as UI from "@/libs/ui";
import { AiFillPlusCircle } from "react-icons/ai";
import { useGetCustomerListQuery } from "@/store/customer";
import Loading from "@/components/Loading";
import { useNavigate } from "react-router-dom";
import { useLazySearchKhachHangListQuery } from "@/store/khachHang";
import SearchBar from "@/components/SearchBar";

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

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(rowsPerPage * (page + 1) + 1);
  const [filters, setFilters] = useState({
    query: "",
    order_by: "order_by[code]=desc",
    search: "",
  });
  const { data, isFetching, refetch } = useGetCustomerListQuery({
    page: page + 1,
    limit: rowsPerPage,
    contact: filters?.query,
    order_by: filters?.order_by,
    search: filters?.search,
  });

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
                <UI.Typography variant="h4">Danh sách khách hàng</UI.Typography>
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

            {isFetching ? (
              <Loading />
            ) : (
              <CustomerListTable
                customers={data?.data ? data.data : []}
                refetch={refetch}
                customersCount={totalPages}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPage={rowsPerPage}
                page={page}
              />
            )}
          </UI.Card>
        </UI.Container>
      </UI.Box>
    </>
  );
}

export default CustomerTableListContainer;
