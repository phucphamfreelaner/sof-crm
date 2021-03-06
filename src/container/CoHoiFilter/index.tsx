import React, { useState } from "react";
import * as UI from "@/libs/ui";
import BaseForm from "@/components/BaseForm";
import { useLazySearchKhachHangListQuery } from "@/store/khachHang";
import { useLazySearchTrangThaiListQuery } from "@/store/trangThai";
import { useLazySearchTienTrinhListQuery } from "@/store/tienTrinh";
import { useLazySearchNhanVienQuery } from "@/store/nhanVien";
import { AiOutlineReload } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiArrowUpSFill } from "react-icons/ri";
import { Collapse } from "@/libs/ui";

interface ICoHoiFilter {
  onWatchChange: (data: any) => any;
  onReload: () => any;
}

function CoHoiFilter(props: ICoHoiFilter) {
  const [expanded, setExpanded] = useState(false);
  const { onWatchChange, onReload } = props;
  const [
    searchKhachHang,
    {
      data: khachHangData,
      isLoading: isLoadingKhachHang,
      isFetching: isFetchingKhachHang,
    },
  ] = useLazySearchKhachHangListQuery();

  const [
    searchTrangThai,
    {
      data: trangThaiData,
      isLoading: isLoadingTrangThai,
      isFetching: isFetchingTrangThai,
    },
  ] = useLazySearchTrangThaiListQuery();

  const [
    searchTienTrinh,
    {
      data: tienTrinhData,
      isLoading: isLoadingTienTrinh,
      isFetching: isFetchingTienTrinh,
    },
  ] = useLazySearchTienTrinhListQuery();

  const [
    searchNhanVien,
    {
      data: nhanVienData,
      isLoading: isLoadingNhanVien,
      isFetching: isFetchingNhanVien,
    },
  ] = useLazySearchNhanVienQuery();

  React.useEffect(() => {
    searchKhachHang({ name: "" });
    searchTrangThai({ name: "" });
    searchTienTrinh({ name: "" });
    searchNhanVien({ name: "" });
  }, []);

  const handleSearchKhachHang = (text: string) => {
    searchKhachHang({ name: text });
  };

  const handleSearchTrangThai = (text: string) => {
    searchTrangThai({ name: text });
  };

  const handleSearchTienTrinh = (text: string) => {
    searchTienTrinh({ name: text });
  };

  const handleSearchNhanVien = (text: string) => {
    searchNhanVien({ name: text });
  };

  return (
    <UI.Stack>
      <UI.HStack alignItems="center" w="100%">
        <BaseForm
          templateColumns="repeat(12, 1fr)"
          columnGap="24px"
          watchFields={["code", "name", "customer_id"]}
          onWatchChange={onWatchChange}
          fields={[
            {
              name: "name",
              label: "T??n C?? H???i",
              type: "input",
              colSpan: 6,
              placeholder: "Nh???p t??n c?? h???i",
            },
            {
              name: "customer_id",
              label: "C??ch g???i KH",
              type: "autocomplete",
              colSpan: 3,
              isLoading: isLoadingKhachHang || isFetchingKhachHang,
              autocompleteOptions: khachHangData,
              onSearchChange: handleSearchKhachHang,
              placeholder: "T???t c???",
            },
            {
              name: "code",
              label: "M?? c?? h???i",
              type: "input",
              colSpan: 3,
              placeholder: "Nh???p m?? c?? h???i",
            },
          ]}
        ></BaseForm>
        <UI.IconButton onClick={onReload}>
          <AiOutlineReload />
        </UI.IconButton>
      </UI.HStack>
      <UI.HStack sx={{ width: "100%" }} mt={16} mb={16}>
        <UI.Typography fontStyle={"italic"}>T??m ki???m n??ng cao</UI.Typography>
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
          templateColumns="repeat(12, 1fr)"
          columnGap="24px"
          watchFields={[
            "phone",
            "email",
            "trang_thai_key",
            "tien_trinh_key",
            "nhan_vien_nhap",
          ]}
          onWatchChange={onWatchChange}
          fields={[
            {
              name: "phone",
              label: "Phone",
              type: "input",
              colSpan: 3,
              placeholder: "Nh???p phone",
            },
            {
              name: "email",
              label: "Email",
              type: "input",
              colSpan: 3,
              placeholder: "Nh???p email",
            },
            {
              name: "trang_thai_key",
              label: "Tr???ng th??i",
              type: "autocomplete",
              colSpan: 2,
              isLoading: isLoadingTrangThai || isFetchingTrangThai,
              autocompleteOptions: trangThaiData,
              onSearchChange: handleSearchTrangThai,
              placeholder: "T???t c???",
            },
            {
              name: "tien_trinh_key",
              label: "Ti???n tr??nh",
              type: "autocomplete",
              colSpan: 2,
              isLoading: isLoadingTienTrinh || isFetchingTienTrinh,
              autocompleteOptions: tienTrinhData,
              onSearchChange: handleSearchTienTrinh,
              placeholder: "T???t c???",
            },
            {
              name: "nhan_vien_nhap",
              label: "Nh??n vi??n nh???p",
              type: "autocomplete",
              colSpan: 2,
              autocompleteOptions: nhanVienData,
              isLoading: isLoadingNhanVien || isFetchingNhanVien,
              onSearchChange: handleSearchNhanVien,
              placeholder: "T???t c???",
            },
          ]}
        ></BaseForm>
      </Collapse>
    </UI.Stack>
  );
}

export default CoHoiFilter;
