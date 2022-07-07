import { useState, useRef, useEffect } from "react";
import CohoiListTable from "@/components/CohoiTableList";
import { debounce } from "lodash";
import * as UI from "@/libs/ui";
import {
  AiFillPlusCircle,
  AiOutlineUpload,
  AiOutlineDownload,
  AiOutlineSearch,
} from "react-icons/ai";
import { useGetCohoiListQuery } from "@/store/cohoi";
import Loading from "@/components/Loading";
import BaseForm from "@/components/BaseForm";
import { Collapse } from "@mui/material";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiArrowUpSFill } from "react-icons/ri";

const sortOptions = [
  {
    label: "Mã cơ hội",
    value: "code",
  },
  {
    label: "Tên cơ hội",
    value: "name",
  },
  {
    label: "Phone",
    value: "phone",
  },
  {
    label: "Email",
    value: "email",
  },
  {
    label: "Trạng thái",
    value: "trang_thai_key",
  },
  {
    label: "Tiến trình",
    value: "tien_trinh_key",
  },
  {
    label: "Nhân viên nhập",
    value: "ten",
  },
  {
    label: "Ngày nhập",
    value: "created_at",
  },
  {
    label: "Ghi chú",
    value: "note",
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

function CohoiTableListContainer() {
  const theme = UI.useTheme();
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
  const { data, isFetching } = useGetCohoiListQuery({
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
      <UI.Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <UI.Container maxWidth="xl">
          <UI.Box sx={{ mb: 4 }}>
            <UI.Grid container justifyContent="space-between" spacing={3}>
              <UI.Grid item>
                <UI.Typography variant="h4">Danh sách cơ hội</UI.Typography>
              </UI.Grid>
              <UI.Grid item>
                <UI.Button
                  size="small"
                  startIcon={<AiFillPlusCircle fontSize="small" />}
                  variant="contained"
                >
                  Add
                </UI.Button>
              </UI.Grid>
            </UI.Grid>
            <UI.Box
              sx={{
                m: -1,
                mt: 3,
              }}
            >
              <UI.Button
                startIcon={<AiOutlineUpload fontSize="small" />}
                sx={{ m: 1 }}
              >
                Import
              </UI.Button>
              <UI.Button
                startIcon={<AiOutlineDownload fontSize="small" />}
                sx={{ m: 1 }}
              >
                Export
              </UI.Button>
            </UI.Box>
          </UI.Box>
          <UI.Card>
            <UI.Divider />
            <UI.Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
                m: -1.5,
                p: 3,
              }}
            >
              <UI.Box
                component="form"
                onSubmit={handleQueryChange}
                sx={{
                  flexGrow: 1,
                }}
              >
                <UI.TextField
                  defaultValue=""
                  fullWidth
                  inputProps={{ ref: queryRef }}
                  InputProps={{
                    startAdornment: (
                      <UI.InputAdornment position="start">
                        <AiOutlineSearch fontSize="small" />
                      </UI.InputAdornment>
                    ),
                  }}
                  placeholder="Tìm kiếm mã cơ hội"
                />
              </UI.Box>
              <UI.TextField
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
              </UI.TextField>

              <UI.TextField
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
              </UI.TextField>
              <UI.HStack sx={{ width: "100%" }} mt={16} mb={16}>
                <UI.Typography fontStyle={"italic"}>
                  Tìm kiếm nâng cao
                </UI.Typography>
                <UI.Box
                  sx={{ cursor: "pointer" }}
                  onClick={(val) => {
                    setExpanded(!expanded);
                  }}
                >
                  <UI.IconButton aria-label="show" size="large">
                    {expanded ? <RiArrowUpSFill /> : <IoMdArrowDropdown />}
                  </UI.IconButton>
                </UI.Box>
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
                      label: "Phone",
                    },
                    {
                      name: "email",
                      type: "input",
                      label: "Email",
                    },
                    {
                      type: "select",
                      name: "trang_thai_key",
                      label: "Trạng thái",
                      selectOptions: [
                        {
                          label: "Đang làm việc",
                          value: "dang-lam-viec",
                        },
                        {
                          label: "Hoàn thành",
                          value: "hoan-thanh",
                        },
                        {
                          label: "QC test",
                          value: "qc-test",
                        },
                      ],
                    },
                    {
                      type: "select",
                      name: "tien_trinh_key",
                      label: "Tiến trình",
                      selectOptions: [
                        {
                          label: "Đã giao hàng, đang sms và email",
                          value: "da-giao-hang-dang-sms-va-email",
                        },
                        {
                          label: "Đang xem báo giá",
                          value: "dang-xem-bao-gia",
                        },
                        {
                          label: "Khách đặt lại, ngưng SMS Email",
                          value: "khach-dat-lai-ngung-sms-email",
                        },
                        {
                          label: "Chưa báo giá",
                          value: "chua-bao-gia",
                        },
                        {
                          label: "Đang sản xuất",
                          value: "dang-san-xuat",
                        },
                        {
                          label: "Báo giá lâu quá không trả lời",
                          value: "bao-gia-lau-qua-khong-tra-loi",
                        },
                        {
                          label: "GH chưa thanh toán. Không dùng nữa",
                          value: "gh-chua-thanh-toan-khong-dung-nua",
                        },
                      ],
                    },
                    {
                      name: "create_by",
                      type: "input",
                      label: "Nhân viên nhập",
                    },
                    {
                      name: "page",
                      type: "input",
                      label: "Số trang",
                    },
                  ]}
                ></BaseForm>
              </Collapse>
            </UI.Box>
            {isFetching ? (
              <Loading />
            ) : (
              <CohoiListTable
                cohois={data?.data ? data.data : []}
                cohoisCount={totalPages}
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

export default CohoiTableListContainer;
