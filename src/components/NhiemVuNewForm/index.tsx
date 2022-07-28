import React from "react";
import * as UI from "@/libs/ui";
import BaseForm from "@/components/BaseForm";

interface INhiemVuNewForm {
  loaiNhiemVuData?: any;
  onSearchLoaiNhiemVu?: (text: any) => any;
  isLoadingLoaiNhiemVu?: boolean;

  trangThaiNhiemVuData?: any;
  onSearchTrangThaiNhiemVu?: (text: any) => any;
  isLoadingTrangThaiNhiemVu?: boolean;

  danhGiaNhiemVuData?: any;
  onSearchDanhGiaNhiemVu?: (text: any) => any;
  isLoadingDanhGiaNhiemVu?: boolean;

  defaultValues?: any;
  formRef?: any;
}

function NhiemVuNewForm(props: INhiemVuNewForm) {
  const {
    loaiNhiemVuData,
    onSearchLoaiNhiemVu,
    isLoadingLoaiNhiemVu,

    trangThaiNhiemVuData,
    onSearchTrangThaiNhiemVu,
    isLoadingTrangThaiNhiemVu,

    danhGiaNhiemVuData,
    onSearchDanhGiaNhiemVu,
    isLoadingDanhGiaNhiemVu,

    defaultValues,
    formRef,
  } = props;

  return (
    <BaseForm
      sx={{ width: "100%" }}
      templateColumns="repeat(2, 1fr)"
      gap="16px"
      defaultValues={defaultValues}
      ref={formRef}
      fields={[
        {
          name: "ngaybatdau",
          label: "Ngày bắt đầu",
          type: "date-picker",
          colSpan: 1,
          size: "small",
        },
        {
          name: "ngayketthuc",
          label: "Ngày kết thúc",
          type: "date-picker",
          colSpan: 1,
          size: "small",
        },
        {
          name: "loai_key",
          label: "Loại nhiệm vụ",
          type: "autocomplete",
          colSpan: 1,
          isLoading: isLoadingLoaiNhiemVu,
          autocompleteOptions: loaiNhiemVuData || [],
          onSearchChange: onSearchLoaiNhiemVu,
          size: "small",
        },
        {
          name: "trangthai",
          label: "Trạng thái nhiệm vụ",
          type: "autocomplete",
          colSpan: 1,
          isLoading: isLoadingTrangThaiNhiemVu,
          autocompleteOptions: trangThaiNhiemVuData || [],
          onSearchChange: onSearchTrangThaiNhiemVu,
          size: "small",
        },
        {
          name: "danh_gia_key",
          label: "Đánh giá nhiệm vụ",
          type: "autocomplete",
          colSpan: 2,
          isLoading: isLoadingDanhGiaNhiemVu,
          autocompleteOptions: danhGiaNhiemVuData || [],
          onSearchChange: onSearchDanhGiaNhiemVu,
          size: "small",
        },
        {
          name: "ten",
          label: "Tiêu đề",
          type: "input",
          colSpan: 2,
          multiline: true,
          rows: 1,
          size: "small",
        },
        {
          name: "note",
          label: "Diễn giải",
          type: "input",
          colSpan: 2,
          multiline: true,
          rows: 2,
          size: "small",
        },
      ]}
    />
  );
}

export default NhiemVuNewForm;
