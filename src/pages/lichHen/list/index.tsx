import React from "react";
import { useNavigate } from "react-router-dom";
import * as UI from "@/libs/ui";
import {
  AiFillPlusCircle,
  AiOutlineUpload,
  AiOutlineDownload,
  AiOutlineUser,
} from "react-icons/ai";
import LichHenTable from "@/container/LichHenTable";
import { debounce, isEmpty } from "lodash-es";
import SearchBar from "@/components/SearchBar";
import { useLazySearchKhachHangListQuery } from "@/store/khachHang";

function LichHenList() {
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState<any>(null);
  const [customerId, setCustomerId] = React.useState<any>(null);

  const [search, setSearch] = React.useState<any>(null);

  const [key, setKey] = React.useState<any>(null);

  const [
    searchKhachHang,
    {
      data: khachHangData,
      isLoading: isLoadingKhachHang,
      isFetching: isFetchingKhachHang,
    },
  ] = useLazySearchKhachHangListQuery();

  const handleFilterChange = debounce(setFilter, 500);

  return (
    <UI.Box>
      <UI.Grid
        sx={{ mb: 4 }}
        container
        justifyContent="space-between"
        spacing={3}
      >
        <UI.Grid item>
          <UI.Typography variant="h4">Lịch Hẹn</UI.Typography>
        </UI.Grid>
        <UI.Grid item>
          <UI.Button
            size="small"
            startIcon={<AiFillPlusCircle fontSize="small" />}
            variant="contained"
            onClick={() => {
              navigate(`/lich_hen/new`);
            }}
          >
            Thêm mới
          </UI.Button>
        </UI.Grid>
      </UI.Grid>

      <UI.Card>
        <UI.Divider />
        <UI.CardContent>
          <SearchBar
            baseSearchOptions={[
              {
                name: "khachhang",
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
            handleOnchangeBaseSearch={(data) =>
              setCustomerId(data?.khachhang?.value)
            }
            advanceSearchOptions={[
              {
                name: "id",
                type: "input",
                label: "Mã lịch hẹn",
              },
              {
                name: "ten",
                type: "input",
                label: "Tiêu đề",
              },
              {
                name: "diadiem",
                type: "input",
                label: "Địa điểm",
              },
              {
                name: "note",
                type: "input",
                label: "Diễn giải",
              },
              {
                name: "ngaybatdau",
                type: "input",
                label: "Ngày bắt đầu",
              },
              {
                name: "ngayketthuc",
                type: "input",
                label: "Ngày kết thúc",
              },
              {
                name: "created_at",
                type: "input",
                label: "Ngày nhập",
              },
              {
                name: "page",
                type: "input",
                label: "Số trang",
              },
            ]}
            handleOnchangeAdvanceSearch={setSearch}
          />
          <LichHenTable
            onSortChange={(orderBy) => {
              setFilter((filter) => ({ ...filter, ...orderBy }));
            }}
            filter={filter}
            search={search}
            customerId={customerId}
          />
        </UI.CardContent>
      </UI.Card>
    </UI.Box>
  );
}

export default LichHenList;
