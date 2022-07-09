import React from "react";
import * as UI from "@/libs/ui";
import BaoGiaNewForm from "@/components/BaoGiaNewForm";
import { FaSave } from "react-icons/fa";

import { useLazyGetCongTyListQuery } from "@/store/congTy";
import { useLazySearchCoHoiQuery } from "@/store/coHoi";
import { useLazyGetLoaiBaoGiaListQuery } from "@/store/loaiBaoGia";
import { useLazyGetNgonNguListQuery } from "@/store/ngonNgu";
import { useLazySearchLoaiTienGiaListQuery } from "@/store/loaiTien";
import { useLazySearchSanPhamQuery } from "@/store/sanPham";
import { useLazySearchChatLieuQuery } from "@/store/chatLieu";
import { useLazySearchDonViTinhQuery } from "@/store/donViTinh";

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
    searchCoHoi,
    {
      data: coHoiData,
      isLoading: isLoadingCoHoi,
      isFetching: isFetchingCoHoi,
      isSuccess: isSuccessCoHoi,
    },
  ] = useLazySearchCoHoiQuery();

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
  ] = useLazySearchLoaiTienGiaListQuery();

  const [
    searchChatLieu,
    {
      data: chatLieuData,
      isLoading: isLoadingChatLieu,
      isFetching: isFetchingChatLieu,
      isSuccess: isSuccessChatLieu,
    },
  ] = useLazySearchChatLieuQuery();

  const [
    searchSanPham,
    {
      data: sanPhamData,
      isLoading: isLoadingSanPham,
      isFetching: isFetchingSanPham,
      isSuccess: isSuccessSanPham,
    },
  ] = useLazySearchSanPhamQuery();

  const [
    searchDonViTinh,
    {
      data: donViTinhData,
      isLoading: isLoadingDonViTinh,
      isFetching: isFetchingDonViTinh,
      isSuccess: isSuccessDonViTinh,
    },
  ] = useLazySearchDonViTinhQuery();

  React.useEffect(() => {
    searchCty({ name: "" });
    searchCoHoi({ name: "" });
    searchLoaiBaoGiaData({ name: "" });
    searchNgonNgu({ name: "" });
    searchLoaiTien({ name: "" });
    searchSanPham({ name: "" });
    searchChatLieu({ name: "" });
    searchDonViTinh({ name: "" });
  }, []);

  const [defaultValues, setDefaultValue] = React.useState<any>(null);

  React.useEffect(() => {
    if (
      isSuccessLoaiTien &&
      isSuccessNgonNgu &&
      isSuccessLoaiBaoGia &&
      isSuccessCompany &&
      isSuccessCoHoi &&
      isSuccessSanPham &&
      isSuccessDonViTinh
    ) {
      setDefaultValue((value) => ({
        ...value,
        loai_tien: loaiTienData?.[0],
        loai_bao_gia: loaiBaoGiaData?.[0],
        name: coHoiData?.[0],
        company: {
          label: companyData?.[0]?.ten,
          value: companyData?.[0]?.id,
        },
        ngon_ngu: {
          label: ngonNguData?.[0]?.ten,
          value: ngonNguData?.[0]?.id,
        },
        san_pham: [
          {
            _id: 1,
            ten_san_pham: sanPhamData?.[0],
            chat_lieu: chatLieuData?.[0],
            don_vi_tinh: donViTinhData?.[0],
            so_luong: 1,
            don_gia_von: "",
            don_gia: "",
            thanh_tien: "",
            ghi_chu: "",
          },
        ],
      }));
    }
  }, [
    isSuccessLoaiTien,
    isSuccessNgonNgu,
    isSuccessLoaiBaoGia,
    isSuccessCompany,
    isSuccessCoHoi,
    isSuccessSanPham,
    isSuccessChatLieu,
    isSuccessDonViTinh,
  ]);

  const elForm = React.useRef<any>();

  return (
    <UI.Card>
      <UI.CardContent>
        <BaoGiaNewForm
          formRef={elForm}
          key={JSON.stringify(defaultValues)}
          isLoadingSearchCompany={isLoadingCompany || isFetchingCompany}
          companyData={companyData}
          onSearchCompany={(text) => searchCty({ name: text })}
          isLoadingSearchCoHoi={isLoadingCoHoi || isFetchingCoHoi}
          coHoiData={coHoiData}
          onSearchCoHoi={(text) => searchCoHoi({ name: text })}
          loaiBaoGiaData={loaiBaoGiaData}
          isLoadingLoaiBaoGia={isLoadingLoaiBaoGia || isFetchingLoaiBaoGia}
          onSearchLoaiBaoGia={(text) => searchLoaiBaoGiaData({ name: text })}
          ngonNguData={ngonNguData}
          isLoadingNgonNgu={isLoadingNgonNgu || isFetchingNgonNgu}
          onSearchNgonNgu={(text) => searchNgonNgu({ name: text })}
          loaiTienData={loaiTienData}
          isLoadingLoaiTien={isLoadingLoaiTien || isFetchingLoaiTien}
          onSearchLoaiTien={(text) => searchLoaiTien({ name: text })}
          sanPhamData={sanPhamData}
          onSearchSanPham={(text) => searchSanPham({ name: text })}
          chatLieuData={chatLieuData}
          onSearchChatLieu={(text) => searchChatLieu({ name: text })}
          donViTinhData={donViTinhData}
          onSearchDonViTinh={(text) => searchDonViTinh({ name: text })}
          onAddSanPham={(index) => ({
            _id: index,
            ten_san_pham: sanPhamData?.[0],
            chat_lieu: chatLieuData?.[0],
            don_vi_tinh: donViTinhData?.[0],
            so_luong: 1,
            don_gia_von: "",
            don_gia: "",
            thanh_tien: "",
            ghi_chu: "",
          })}
          defaultValues={defaultValues}
        />
      </UI.CardContent>
      <UI.CardActions sx={{ justifyContent: "flex-end" }}>
        <UI.Button
          onClick={() =>
            elForm.current.handleSubmit((data) => {
              console.log("🚀 ~ data", data);
            })()
          }
          endIcon={<FaSave />}
          variant="outlined"
        >
          Save
        </UI.Button>
      </UI.CardActions>
    </UI.Card>
  );
}

export default BaoGaiNew;
