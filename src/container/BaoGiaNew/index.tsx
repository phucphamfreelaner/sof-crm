import React from "react";
import * as UI from "@/libs/ui";
import BaoGiaNewForm from "@/components/BaoGiaNewForm";
import { FaSave } from "react-icons/fa";

import { useLazyGetCongTyListQuery } from "@/store/congTy";
import { useLazyGetCohoiListQuery } from "@/store/cohoi";
import { useLazyGetLoaiBaoGiaListQuery } from "@/store/loaiBaoGia";
import { useLazyGetNgonNguListQuery } from "@/store/ngonNgu";
import { useLazyGetLoaiTienGiaListQuery } from "@/store/loaiTien";

function BaoGaiNew() {
  const [
    searchCty,
    {
      data: companyData,
      isLoading: isLoadingCompany,
      isFetching: isFetchingCompany,
      isSuccess: isSuccessCompany,
    },
  ] = useLazyGetCongTyListQuery();
  const [
    searchCoHoiList,
    {
      data: coHoiData,
      isLoading: isLoadingCoHoi,
      isFetching: isFetchingCoHoi,
      isSuccess: isSuccessCoHoi,
    },
  ] = useLazyGetCohoiListQuery();
  const [
    searchLoaiBaoGiaData,
    {
      data: loaiBaoGiaData,
      isLoading: isLoadingLoaiBaoGia,
      isFetching: isFetchingLoaiBaoGia,
      isSuccess: isSuccessLoaiBaoGia,
    },
  ] = useLazyGetLoaiBaoGiaListQuery();
  const [
    searchNgonNgu,
    {
      data: ngonNguData,
      isLoading: isLoadingNgonNgu,
      isFetching: isFetchingNgonNgu,
      isSuccess: isSuccessNgonNgu,
    },
  ] = useLazyGetNgonNguListQuery();

  const [
    searchLoaiTien,
    {
      data: loaiTienData,
      isLoading: isLoadingLoaiTien,
      isFetching: isFetchingLoaiTien,
      isSuccess: isSuccessLoaiTien,
    },
  ] = useLazyGetLoaiTienGiaListQuery();

  React.useEffect(() => {
    searchCty({ name: " " });
    searchCoHoiList({ name: " " });
    searchLoaiBaoGiaData({ name: "" });
    searchNgonNgu({ name: " " });
    searchLoaiTien({ name: " " });
  }, []);

  const [defaultValues, setDefaultValue] = React.useState<any>(null);

  React.useEffect(() => {
    if (
      isSuccessLoaiTien &&
      isSuccessNgonNgu &&
      isSuccessLoaiBaoGia &&
      isSuccessCompany &&
      isSuccessCoHoi
    ) {
      setDefaultValue((value) => ({
        ...value,
        loai_tien: loaiTienData?.[0],
        loai_bao_gia: loaiBaoGiaData?.[0],
        name: {
          label: coHoiData?.[0]?.name,
          value: coHoiData?.[0]?.id,
        },
        company: {
          label: companyData?.[0]?.ten,
          value: companyData?.[0]?.id,
        },
        ngon_ngu: {
          label: ngonNguData?.[0]?.ten,
          value: ngonNguData?.[0]?.id,
        },
      }));
    }
  }, [
    isSuccessLoaiTien,
    isSuccessNgonNgu,
    isSuccessLoaiBaoGia,
    isSuccessCompany,
    isSuccessCoHoi,
  ]);

  return (
    <UI.Card>
      <UI.CardContent>
        <BaoGiaNewForm
          key={JSON.stringify(defaultValues)}
          isLoadingSearchCompany={isLoadingCompany || isFetchingCompany}
          companyData={companyData}
          onSearchCompany={(text) => searchCty({ name: text })}
          isLoadingSearchCoHoi={isLoadingCoHoi || isFetchingCoHoi}
          coHoiData={coHoiData}
          onSearchCoHoi={(text) => searchCoHoiList({ name: text })}
          loaiBaoGiaData={loaiBaoGiaData}
          isLoadingLoaiBaoGia={isLoadingLoaiBaoGia || isFetchingLoaiBaoGia}
          onSearchLoaiBaoGia={(text) => searchLoaiBaoGiaData({ name: text })}
          ngonNguData={ngonNguData}
          isLoadingNgonNgu={isLoadingNgonNgu || isFetchingNgonNgu}
          onSearchNgonNgu={(text) => searchNgonNgu({ name: text })}
          loaiTienData={loaiTienData}
          isLoadingLoaiTien={isLoadingLoaiTien || isFetchingLoaiTien}
          onSearchLoaiTien={(text) => searchLoaiTien({ name: text })}
          onAddSanPham={() => ({
            ten_san_pham: "",
            chat_lieu: "",
            don_vi_tinh: "",
            so_luong: "",
            don_gia_von: "",
            don_gia: "",
            thanh_tien: "",
            ghi_chu: "",
          })}
          defaultValues={{
            ...defaultValues,
            san_pham: [
              {
                ten_san_pham: "",
                chat_lieu: "",
                don_vi_tinh: "",
                so_luong: "",
                don_gia_von: "",
                don_gia: "",
                thanh_tien: "",
                ghi_chu: "",
              },
            ],
          }}
        />
      </UI.CardContent>
      <UI.CardActions sx={{ justifyContent: "flex-end" }}>
        <UI.Button endIcon={<FaSave />} variant="outlined">
          Save
        </UI.Button>
      </UI.CardActions>
    </UI.Card>
  );
}

export default BaoGaiNew;
