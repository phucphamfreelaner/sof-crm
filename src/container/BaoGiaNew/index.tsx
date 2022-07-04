import React from "react";
import BaoGiaNewForm from "@/components/BaoGiaNewForm";
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
    },
  ] = useLazyGetCongTyListQuery();
  const [
    searchCoHoiList,
    { data: coHoiData, isLoading: isLoadingCoHoi, isFetching: isFetchingCoHoi },
  ] = useLazyGetCohoiListQuery();

  const [
    searchLoaiBaoGiaData,
    {
      data: loaiBaoGiaData,
      isLoading: isLoadingLoaiBaoGia,
      isFetching: isFetchingLoaiBaoGia,
    },
  ] = useLazyGetLoaiBaoGiaListQuery();

  const [
    searchNgonNgu,
    {
      data: ngonNguData,
      isLoading: isLoadingNgonNgu,
      isFetching: isFetchingNgonNgu,
    },
  ] = useLazyGetNgonNguListQuery();

  const [
    searchLoaiTien,
    {
      data: loaiTienData,
      isLoading: isLoadingLoaiTien,
      isFetching: isFetchingLoaiTien,
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
    if (companyData && loaiTienData && coHoiData) {
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
  }, [companyData, loaiTienData, coHoiData, loaiBaoGiaData, ngonNguData]);

  return (
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
      defaultValues={defaultValues}
    />
  );
}

export default BaoGaiNew;
