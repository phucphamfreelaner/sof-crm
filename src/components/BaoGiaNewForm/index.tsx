import React from "react";
import BaseForm from "@/components/BaseForm";
interface IBaoGiaNewForm {
  companyData?: any;
  onSearchCompany?: (text: any) => any;
  isLoadingSearchCompany?: boolean;

  coHoiData?: any;
  onSearchCoHoi?: (text: any) => any;
  isLoadingSearchCoHoi?: boolean;

  loaiBaoGiaData?: any;
  onSearchLoaiBaoGia?: (text: any) => any;
  isLoadingLoaiBaoGia?: boolean;

  ngonNguData?: any;
  onSearchNgonNgu?: (text: any) => any;
  isLoadingNgonNgu?: boolean;

  loaiTienData?: any;
  onSearchLoaiTien?: (text: any) => any;
  isLoadingLoaiTien?: boolean;

  defaultValues?: any;
  onAddSanPham?: (index: any) => any;

  formRef?: any;

  sanPhamData?: any;
  onSearchSanPham?: (index: any) => any;

  donViTinhData?: any;
  onSearchDonViTinh?: (index: any) => any;

  chatLieuData?: any;
  onSearchChatLieu?: (index: any) => any;
}

function BaoGiaNewForm(props: IBaoGiaNewForm) {
  const {
    companyData,
    onSearchCompany,
    isLoadingSearchCompany,
    coHoiData,
    onSearchCoHoi,
    isLoadingSearchCoHoi,
    loaiBaoGiaData,
    onSearchLoaiBaoGia,
    isLoadingLoaiBaoGia,
    ngonNguData,
    onSearchNgonNgu,
    isLoadingNgonNgu,
    loaiTienData,
    onSearchLoaiTien,
    isLoadingLoaiTien,
    defaultValues,
    onAddSanPham,
    sanPhamData,
    onSearchSanPham,
    chatLieuData,
    onSearchChatLieu,
    donViTinhData,
    onSearchDonViTinh,
    formRef,
  } = props;

  return (
    <BaseForm
      sx={{ width: "100%" }}
      templateColumns="repeat(6, 1fr)"
      gap="26px"
      defaultValues={defaultValues}
      ref={formRef}
      fields={[
        {
          name: "san_pham",
          colSpan: 6,
          type: "array-fields",
          label: "",
          gap: "12px",
          onAddRow: onAddSanPham,
          fields: [
            {
              name: "ten_san_pham",
              label: "Tên sản phẩm",
              type: "autocomplete",
              autocompleteOptions: sanPhamData,
              onSearchChange: onSearchSanPham,
              colSpan: 3,
            },
            {
              name: "chat_lieu",
              label: "Chất liệu",
              type: "autocomplete",
              autocompleteOptions: chatLieuData,
              onSearchChange: onSearchChatLieu,
              colSpan: 3,
            },
            {
              name: "don_vi_tinh",
              label: "Đơn vị tính",
              type: "autocomplete",
              colSpan: 3,
              autocompleteOptions: donViTinhData,
              onSearchChange: onSearchDonViTinh,
            },
            {
              name: "so_luong",
              label: "Số lượng",
              type: "input",
              textType: "number",
              colSpan: 2,
            },
            {
              name: "don_gia_von",
              label: "Đơn giá vốn",
              type: "input-mask",
              textType: "number",
              colSpan: 3,
            },
            {
              name: "don_gia",
              label: "Đơn giá",
              type: "input-mask",
              textType: "number",
              colSpan: 3,
            },
            {
              name: "thanh_tien",
              label: "Thành tiền",
              type: "input-mask",
              textType: "number",
              colSpan: 3,
            },
            {
              name: "ghi_chu",
              label: "Ghi chú",
              type: "input",
              colSpan: 3,
            },
          ],
        },
        {
          name: "dieu_khoan",
          label: "Các điều khoản khác",
          type: "input",
          colSpan: 3,
          multiline: true,
          rows: 4,
        },
        {
          name: "note",
          label: "Ghi chú",
          type: "input",
          colSpan: 3,
          multiline: true,
          rows: 4,
        },
        {
          name: "company",
          label: "Công ty",
          type: "autocomplete",
          colSpan: 2,
          isLoading: isLoadingSearchCompany,
          autocompleteOptions:
            companyData?.map((x: any) => ({
              label: x.ten,
              value: x.id,
            })) || [],
          onSearchChange: onSearchCompany,
        },
        {
          name: "name",
          label: "Cơ hội",
          type: "autocomplete",
          colSpan: 2,
          isLoading: isLoadingSearchCoHoi,
          autocompleteOptions: coHoiData || [],
          onSearchChange: onSearchCoHoi,
        },
        {
          name: "loai_bao_gia",
          label: "Loại báo giá",
          type: "autocomplete",
          colSpan: 2,
          isLoading: isLoadingLoaiBaoGia,
          autocompleteOptions: loaiBaoGiaData || [],
          onSearchChange: onSearchLoaiBaoGia,
        },
        {
          name: "ngon_ngu",
          label: "Ngôn ngữ",
          type: "autocomplete",
          colSpan: 2,
          isLoading: isLoadingNgonNgu,
          autocompleteOptions:
            ngonNguData?.map((x: any) => ({
              label: x.ten,
              value: x.code,
            })) || [],
          onSearchChange: onSearchNgonNgu,
        },
        {
          name: "loai_tien",
          label: "Loại tiền",
          type: "autocomplete",
          colSpan: 2,
          isLoading: isLoadingLoaiTien,
          autocompleteOptions: loaiTienData || [],
          onSearchChange: onSearchLoaiTien,
        },
      ]}
    />
  );
}

export default BaoGiaNewForm;
