import React, { useState, useRef, useEffect } from "react";
import CustomerListTable from "@/components/CustomerTableList";
import { debounce } from "lodash";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import * as UI from "@/libs/ui";
import {
  AiFillPlusCircle,
  AiOutlineUpload,
  AiOutlineDownload,
  AiOutlineSearch,
} from "react-icons/ai";
import { useGetCustomerListQuery } from "@/store/customer";
import Loading from "@/components/Loading";
import BaseForm from "@/components/BaseForm";
import { Collapse } from "@mui/material";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiArrowUpSFill } from "react-icons/ri";
const sortOptions = [
  {
    label: "Mã khách hàng",
    value: "code",
  },
  {
    label: "Cách gọi KH",
    value: "contact",
  },
  {
    label: "Di động",
    value: "phone",
  },
  {
    label: "NV nhập",
    value: "created_by",
  },
  {
    label: "Ngày nhập",
    value: "created_at",
  },
  {
    label: "Địa chỉ",
    value: "address",
  },
  {
    label: "Điện thoại bàn",
    value: "phone2",
  },
  {
    label: "Ghi chú",
    value: "note",
  },
  {
    label: "Chăm sóc",
    value: "da_cham_soc",
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

function CustomerTableListContainer() {
  const theme = UI.useTheme();
  const [customers, setCustomers] = useState([]);
  const [sort, setSort] = useState(sortOptions[0].value);
  const [orderBy, setOrderBy] = useState(orderOptions[0].value);
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const queryRef = useRef(null);
  const [totalPages, setTotalPages] = useState(rowsPerPage * (page + 1) + 1);
  const [filters, setFilters] = useState({
    query: "",
    order_by: "order_by[code]=desc",
    search: "",
  });
  const { data, isLoading, isFetching, refetch } = useGetCustomerListQuery({
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

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">Danh sách khách hàng</Typography>
              </Grid>
              <Grid item>
                <Button
                  size="small"
                  startIcon={<AiFillPlusCircle fontSize="small" />}
                  variant="contained"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                m: -1,
                mt: 3,
              }}
            >
              <Button
                startIcon={<AiOutlineUpload fontSize="small" />}
                sx={{ m: 1 }}
              >
                Import
              </Button>
              <Button
                startIcon={<AiOutlineDownload fontSize="small" />}
                sx={{ m: 1 }}
              >
                Export
              </Button>
            </Box>
          </Box>
          <Card>
            <Divider />
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
                m: -1.5,
                p: 3,
              }}
            >
              <Box
                component="form"
                onSubmit={handleQueryChange}
                sx={{
                  flexGrow: 1,
                }}
              >
                <TextField
                  defaultValue=""
                  fullWidth
                  inputProps={{ ref: queryRef }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiOutlineSearch fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Tìm kiếm mã khách hàng"
                />
              </Box>
              <TextField
                label="Sort By"
                name="sort"
                onChange={handleSortChange}
                select
                SelectProps={{ native: true }}
                sx={{ m: 1.5 }}
                value={sort}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>

              <TextField
                label="Order By"
                name="order"
                onChange={handleOrderChange}
                select
                SelectProps={{ native: true }}
                sx={{ m: 1.5 }}
                value={orderBy}
              >
                {orderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <UI.HStack sx={{ width: "100%" }} mt={16} mb={16}>
                <Typography fontStyle={"italic"}>Tìm kiếm nâng cao</Typography>
                <Box
                  sx={{ cursor: "pointer" }}
                  onClick={(val) => {
                    setExpanded(!expanded);
                  }}
                >
                  {expanded ? <RiArrowUpSFill /> : <IoMdArrowDropdown />}
                </Box>
              </UI.HStack>
              <Collapse in={expanded}>
                <BaseForm
                  gap={theme.spacing(2)}
                  templateColumns="repeat(4,1fr)"
                  onWatchChange={debounce((val) => {
                    handleOnchangeAdvanceSearch(val);
                  }, 1000)}
                  watchFields={[
                    "contact",
                    "phone",
                    "email",
                    "created_by",
                    "phone2",
                    "note",
                    "da_cham_soc",
                    "page",
                  ]}
                  fields={[
                    {
                      name: "contact",
                      type: "input",
                      label: "Tên khách hàng",
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
                ></BaseForm>
              </Collapse>
            </Box>
            {isFetching ? (
              <Loading />
            ) : (
              <CustomerListTable
                customers={data?.data ? data.data : []}
                customersCount={totalPages}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPage={rowsPerPage}
                page={page}
              />
            )}
          </Card>
        </Container>
      </Box>
    </>
  );
}

export default CustomerTableListContainer;
