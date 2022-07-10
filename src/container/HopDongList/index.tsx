import { useState, useRef, useEffect } from "react";
import { debounce } from "lodash";
import * as UI from "@/libs/ui";
import { AiOutlineSearch } from "react-icons/ai";
import Loading from "@/components/Loading";
import BaseForm from "@/components/BaseForm";
import { Collapse } from "@mui/material";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiArrowUpSFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useGetHopDongListQuery } from "@/store/hopDong";
import HopDongListTable from "@/components/HopDongTableList";

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
    name: "customer_id",
    type: "input",
  },
  {
    label: "Ngày Ký",
    name: "created_at",
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
  const theme = UI.useTheme();
  const navigate = useNavigate();
  const [sort, setSort] = useState(sortOptions[0].name);
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

  const { data, isFetching, refetch } = useGetHopDongListQuery({
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
            placeholder="Tìm kiếm mã hợp đồng"
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
            <option key={option.name} value={option.name}>
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
          <UI.Typography fontStyle={"italic"}>Tìm kiếm nâng cao</UI.Typography>
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
            templateColumns="repeat(6,1fr)"
            onWatchChange={debounce((val) => {
              handleOnchangeAdvanceSearch(val);
            }, 1000)}
            watchFields={sortOptions.map((item) => {
              return item.name;
            })}
            //@ts-ignore
            fields={sortOptions}
          ></BaseForm>
        </Collapse>
      </UI.Box>
      {isFetching ? (
        <Loading />
      ) : (
        <HopDongListTable
          hopDongList={data?.data ? data.data : []}
          refetch={refetch}
          hopDongListCount={totalPages}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPage={rowsPerPage}
          page={page}
        />
      )}
    </>
  );
}

export default HopDongListContainer;
