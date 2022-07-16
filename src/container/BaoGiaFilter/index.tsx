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
        watchFields={["code", "customer_id", "loai_tien_key", "created_by"]}
        onWatchChange={onWatchChange}
        fields={[
          {
            name: "code",
            label: "Mã báo giá",
            type: "input",
            colSpan: 3,
            placeholder: "Nhập mã báo giá",
          },
          {
            name: "customer_id",
            label: "Cách gọi KH",
            type: "autocomplete",
            colSpan: 3,
            isLoading: isLoadingKhachHang || isFetchingKhachHang,
            autocompleteOptions: khachHangData,
            onSearchChange: handleSearchKhachHang,
            placeholder: "Tất cả",
          },
          {
            name: "loai_tien_key",
            label: "Loại tiền",
            type: "autocomplete",
            colSpan: 3,
            autocompleteOptions: loaiTienData,
            isLoading: isLoadingLoaiTien || isFetchingLoaiTien,
            onSearchChange: handleSearchLoaiTien,
            placeholder: "Tất cả",
          },
          {
            name: "created_by",
            label: "Nhân viên nhập",
            type: "autocomplete",
            colSpan: 3,
            autocompleteOptions: nhanVienData,
            isLoading: isLoadingNhanVien || isFetchingNhanVien,
            onSearchChange: handleSearchNhanVien,
            placeholder: "Tất cả",
          },
        ]}
      ></BaseForm>
    </UI.Box>
  );
}

export default BaoGiaFilter;
