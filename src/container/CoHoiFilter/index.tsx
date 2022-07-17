import React from "react";
import * as UI from "@/libs/ui";
import BaseForm from "@/components/BaseForm";
import { useLazySearchKhachHangListQuery } from "@/store/khachHang";
import { useLazySearchTrangThaiListQuery } from "@/store/trangThai";
import { useLazySearchTienTrinhListQuery } from "@/store/tienTrinh";
import { useLazySearchNhanVienQuery } from "@/store/nhanVien";

interface ICoHoiFilter {
  onWatchChange: (data: any) => any;
}

function CoHoiFilter(props: ICoHoiFilter) {
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
    <UI.Box>
      <BaseForm
        templateColumns="repeat(12, 1fr)"
        gap="24px"
        watchFields={[
          "code",
          "contact",
          "phone",
          "email",
          "trang_thai_key",
          "tien_trinh_key",
          "nhan_vien_nhap",
        ]}
        onWatchChange={onWatchChange}
        fields={[
          {
            name: "code",
            label: "Mã cơ hội",
            type: "input",
            // size: "small",
            colSpan: 3,
          },
          {
            name: "contact",
            label: "Tên khách hàng",
            type: "autocomplete",
            // size: "small",
            colSpan: 3,
            isLoading: isLoadingKhachHang || isFetchingKhachHang,
            autocompleteOptions: khachHangData,
            onSearchChange: handleSearchKhachHang,
          },
          {
            name: "phone",
            label: "Phone",
            type: "input",
            // size: "small",
            colSpan: 3,
          },
          {
            name: "email",
            label: "Email",
            type: "input",
            // size: "small",
            colSpan: 3,
          },
          {
            name: "trang_thai_key",
            label: "Trạng thái",
            type: "autocomplete",
            // size: "small",
            colSpan: 3,
            isLoading: isLoadingTrangThai || isFetchingTrangThai,
            autocompleteOptions: trangThaiData,
            onSearchChange: handleSearchTrangThai,
          },
          {
            name: "tien_trinh_key",
            label: "Tiến trình",
            type: "autocomplete",
            // size: "small",
            colSpan: 3,
            isLoading: isLoadingTienTrinh || isFetchingTienTrinh,
            autocompleteOptions: tienTrinhData,
            onSearchChange: handleSearchTienTrinh,
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

export default CoHoiFilter;
