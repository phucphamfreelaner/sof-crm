import React from "react";
import * as UI from "@/libs/ui";
import BaseForm from "@/components/BaseForm";
import { useLazySearchKhachHangListQuery } from "@/store/khachHang";
import { useLazySearchLoaiTienGiaListQuery } from "@/store/loaiTien";
import { useLazySearchNhanVienQuery } from "@/store/nhanVien";

interface IBaoGiaFilter {
  onWatchChange: (data: any) => any;
}

function BaoGiaFilter(props: IBaoGiaFilter) {
  const { onWatchChange } = props;
  const [
    searchKhachHang,
    {
      data: khachHangData,
      isLoading: isLoadingKhachHang,
      isFetching: isFetchingKhachHang,
    },
  ] = useLazySearchKhachHangListQuery();

  const [
    searchLoaiTien,
    {
      data: loaiTienData,
      isLoading: isLoadingLoaiTien,
      isFetching: isFetchingLoaiTien,
    },
  ] = useLazySearchLoaiTienGiaListQuery();

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
    searchLoaiTien({ name: "" });
    searchNhanVien({ name: "" });
  }, []);

  const handleSearchKhachHang = (text: string) => {
    searchKhachHang({ name: text });
  };

  const handleSearchLoaiTien = (text: string) => {
    searchLoaiTien({ name: text });
  };

  const handleSearchNhanVien = (text: string) => {
    searchNhanVien({ name: text });
  };

  return (
    <UI.Box>
      <BaseForm
        templateColumns="repeat(12, 1fr)"
        gap="24px"
        watchFields={[
          "ma_bao_gia",
          "cach_goi_kh",
          "loai_tien",
          "nhan_vien_nhap",
        ]}
        onWatchChange={onWatchChange}
        fields={[
          {
            name: "ma_bao_gia",
            label: "Mã báo giá",
            type: "input",
            // size: "small",
            colSpan: 3,
          },
          {
            name: "cach_goi_kh",
            label: "Cách gọi KH",
            type: "autocomplete",
            // size: "small",
            colSpan: 3,
            isLoading: isLoadingKhachHang || isFetchingKhachHang,
            autocompleteOptions: khachHangData,
            onSearchChange: handleSearchKhachHang,
          },
          {
            name: "loai_tien",
            label: "Loại tiền",
            type: "autocomplete",
            // size: "small",
            colSpan: 3,
            autocompleteOptions: loaiTienData,
            isLoading: isLoadingLoaiTien || isFetchingLoaiTien,
            onSearchChange: handleSearchLoaiTien,
          },
          {
            name: "nhan_vien_nhap",
            label: "Nhân viên nhập",
            type: "autocomplete",
            // size: "small",
            colSpan: 3,
            autocompleteOptions: nhanVienData,
            isLoading: isLoadingNhanVien || isFetchingNhanVien,
            onSearchChange: handleSearchNhanVien,
          },
        ]}
      ></BaseForm>
    </UI.Box>
  );
}

export default BaoGiaFilter;
