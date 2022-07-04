import React from "react";
import BaseForm from "@/components/BaseForm";
import { Button } from "@mui/material";

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
  } = props;

  const el = React.useRef<any>(null);

  return (
    <>
      <BaseForm
        ref={el}
        sx={{ width: "100%" }}
        templateColumns="repeat(6, 1fr)"
        gap="26px"
        defaultValues={defaultValues}
        fields={[
          {
            name: "dieukhoan",
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
            name: "company_id",
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
            autocompleteOptions:
              coHoiData?.map((x: any) => ({
                label: x.name,
                value: x.id,
              })) || [],
            onSearchChange: onSearchCoHoi,
          },
          {
            name: "loai_bao_gia_key",
            label: "Loại báo giá",
            type: "autocomplete",
            colSpan: 2,
            isLoading: isLoadingLoaiBaoGia,
            autocompleteOptions: loaiBaoGiaData || [],
            onSearchChange: onSearchLoaiBaoGia,
          },
          {
            name: "ngon_ngu_key",
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
            name: "loai_tien_key",
            label: "Loại tiền",
            type: "autocomplete",
            colSpan: 2,
            isLoading: isLoadingLoaiTien,
            autocompleteOptions: loaiTienData || [],
            onSearchChange: onSearchLoaiTien,
          },
        ]}
      />
    </>
  );
}

export default BaoGiaNewForm;
