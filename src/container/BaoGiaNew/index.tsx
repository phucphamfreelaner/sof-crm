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
        loai_tien_key: loaiTienData?.[0],
        loai_bao_gia: loaiBaoGiaData?.[0],
        cohoi_id: coHoiData?.[0],
        company_id: {
          label: companyData?.[0]?.ten,
          value: companyData?.[0]?.id,
        },
        ngon_ngu_key: {
          label: ngonNguData?.[0]?.ten,
          value: ngonNguData?.[0]?.id,
        },
        san_pham: [
          {
            _id: 1,
            product_id: sanPhamData?.[0],
            chat_lieu_key: chatLieuData?.[0],
            don_vi_key: donViTinhData?.[0],
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

  const handleSaveBaoGia = (data: any) => {
    console.log("🚀 ~ data", data);
    const san_pham = data?.san_pham.map((x) => ({
      ...x,
      chat_lieu_key: x?.chat_lieu_key?.value,
      don_vi_key: x?.don_vi_key?.value,
      product_id: x?.product_id?.value,
    }));
    const _data = {
      ...data,
      san_pham,
      customer_id: data?.company_id?.value,
      ngon_ngu_key: data?.ngon_ngu_key?.value,
      loai_tien_key: data?.loai_tien_key?.value,
      viewEmail: {
        files: [],
      },
      ngaybaogia: data?.thong_tin_chung?.ngaybaogia,
      time: data?.thong_tin_chung?.time,
      datcoc: data?.thong_tin_chung?.datCoc,
      loai_bao_gia_key: data?.loai_bao_gia_key?.value,
      name: data?.cohoi_id?.label,
      company_id: data?.company_id?.value,
      cohoi_id: data?.cohoi_id?.value,
      dieukhoan: data?.dieukhoan,
      note: data?.note,
      template_id: data?.template_id?.value,
    };
  };

  return (
    <UI.Card elevation={10}>
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
            product_id: sanPhamData?.[0],
            chat_lieu_key: chatLieuData?.[0],
            don_vi_key: donViTinhData?.[0],
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
          onClick={() => elForm.current.handleSubmit(handleSaveBaoGia)()}
          endIcon={<FaSave />}
          variant="outlined"
        >
          Lưu báo giá
        </UI.Button>
      </UI.CardActions>
    </UI.Card>
  );
}

export default BaoGaiNew;
