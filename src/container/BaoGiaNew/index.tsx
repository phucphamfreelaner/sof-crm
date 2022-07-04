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

  const [key, setKey] = React.useState(1);

  React.useEffect(() => {
    if (isSuccessLoaiTien) setKey((key) => key + 1);
  }, [isSuccessLoaiTien]);

  return (
    <BaoGiaNewForm
      key={key}
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
      defaultValues={{
        loai_tien_key: loaiTienData?.[0],
      }}
    />
  );
}

export default BaoGaiNew;
