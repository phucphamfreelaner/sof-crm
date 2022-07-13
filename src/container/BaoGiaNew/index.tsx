import React from "react";
import * as UI from "@/libs/ui";
import { FaSave } from "react-icons/fa";
import { useSearchParams, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-hot-toast";
import { isEmpty } from "lodash-es";

import BaoGiaNewForm from "@/components/BaoGiaNewForm";
import { useLazySearchCongTyQuery } from "@/store/congTy";
import { useLazySearchCoHoiQuery } from "@/store/coHoi";
import { useLazyGetLoaiBaoGiaListQuery } from "@/store/loaiBaoGia";
import { useLazyGetNgonNguListQuery } from "@/store/ngonNgu";
import { useLazySearchLoaiTienGiaListQuery } from "@/store/loaiTien";
import { useLazySearchSanPhamQuery } from "@/store/sanPham";
import { useLazySearchChatLieuQuery } from "@/store/chatLieu";
import { useLazySearchDonViTinhQuery } from "@/store/donViTinh";
import { useLazySearchMauInQuery } from "@/store/mauIn";
import { useLazyCreateBaoGiaQuery } from "@/store/baoGia";

interface IBaoGiaForm {
  initData?: any;
}

function BaoGaiForm(props: IBaoGiaForm) {
  const { initData } = props;
  const [query] = useSearchParams();

  const navigate = useNavigate();

  const [
    searchCty,
    {
      data: companyData,
      isLoading: isLoadingCompany,
      isFetching: isFetchingCompany,
      isSuccess: isSuccessCompany,
    },
  ] = useLazySearchCongTyQuery();
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

  const [
    searchMauIn,
    {
      data: mauInData,
      isLoading: isLoadingMauIn,
      isFetching: isFetchingMauIn,
      isSuccess: isSuccessMauIn,
    },
  ] = useLazySearchMauInQuery();

  const [
    createBaoGia,
    {
      data: dataBaoGiaNew,
      isLoading: isLoadingCreateBaoGia,
      isSuccess: isSuccessCreateBaoGia,
    },
  ] = useLazyCreateBaoGiaQuery();

  React.useEffect(() => {
    if (isEmpty(initData)) {
      searchCty({ name: "" });
      searchCoHoi({ name: "" });
      searchLoaiBaoGiaData({ name: "" });
      searchNgonNgu({ name: "" });
      searchLoaiTien({ name: "" });
      searchSanPham({ name: "" });
      searchChatLieu({ name: "" });
      searchDonViTinh({ name: "" });
      searchMauIn({ name: "" });
    }
  }, []);

  const [defaultValues, setDefaultValue] = React.useState<any>(null);

  React.useEffect(() => {
    if (isSuccessCreateBaoGia) {
      toast.success("Thêm báo giá thành công!");
      navigate(`/bao_gia/${dataBaoGiaNew?.data?.id}/view`);
    }
  }, [isSuccessCreateBaoGia]);

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
        company_id: companyData?.[0],
        ngon_ngu_key: {
          label: ngonNguData?.[0]?.ten,
          value: ngonNguData?.[0]?.id,
        },
        template_id: mauInData?.[0],
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
    isSuccessMauIn,
  ]);

  const elForm = React.useRef<any>();

  const handleSaveBaoGia = (data: any) => {
    const san_pham = data?.san_pham.map((x) => ({
      ...x,
      chat_lieu_key: x?.chat_lieu_key?.value,
      don_vi_key: x?.don_vi_key?.value,
      product_id: x?.product_id?.value,
    }));
    const payload = {
      ...data,
      san_pham,
      customer_id: +query.get("customerId"),
      ngon_ngu_key: data?.ngon_ngu_key?.value,
      loai_tien_key: data?.loai_tien_key?.value,
      loai_bao_gia: data?.loai_bao_gia.value,
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
    createBaoGia({ payload });
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
          mauInData={mauInData}
          onSearchMauIn={(name) => searchMauIn({ name })}
          isLoadingMauIn={isLoadingMauIn || isFetchingMauIn}
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
        <LoadingButton
          loading={isLoadingCreateBaoGia}
          onClick={() => elForm.current.handleSubmit(handleSaveBaoGia)()}
          endIcon={<FaSave />}
          variant="outlined"
        >
          Lưu báo giá
        </LoadingButton>
      </UI.CardActions>
    </UI.Card>
  );
}

export default BaoGaiForm;
