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
import { useLazySearchNgonNguQuery } from "@/store/ngonNgu";
import { useLazySearchLoaiTienGiaListQuery } from "@/store/loaiTien";
import { useLazySearchSanPhamQuery } from "@/store/sanPham";
import { useLazySearchChatLieuQuery } from "@/store/chatLieu";
import { useLazySearchDonViTinhQuery } from "@/store/donViTinh";
import { useLazySearchMauInQuery } from "@/store/mauIn";
import { useLazyCreateBaoGiaQuery } from "@/store/baoGia";

interface IBaoGiaForm {
  baoGiaData?: any;
  id?: any;
  congTyLabel?: string;
  isSuccess?: boolean;
  coHoiLabel?: string;
  loaiBaoGiaLabel?: string;
}

function BaoGaiForm(props: IBaoGiaForm) {
  const {
    baoGiaData,
    id,
    congTyLabel,
    isSuccess,
    coHoiLabel,
    loaiBaoGiaLabel,
  } = props;
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
  ] = useLazySearchNgonNguQuery();

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
    if (!id) {
      searchCty({ name: "" });
      searchCoHoi({ name: "", customerId: +query.get("customerId") });
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
        ngon_ngu_key: ngonNguData?.[0],
        template_id: mauInData?.[0],
        thong_tin_chung: {
          ngaybaogia: new Date(),
          time: "15-20",
          datcoc: 50,
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
    isSuccessMauIn,
  ]);

  React.useEffect(() => {
    if (isSuccess && baoGiaData) {
      console.log("🚀 ~ baoGiaData", baoGiaData);
      setDefaultValue({
        ...baoGiaData,
        company_id: {
          label: congTyLabel,
          value: baoGiaData?.company_id,
        },
        cohoi_id: {
          value: baoGiaData?.cohoi_id,
          label: coHoiLabel,
        },
        loai_bao_gia_key: {
          value: baoGiaData?.loai_bao_gia_key,
          label: loaiBaoGiaLabel,
        },
        thong_tin_chung: {
          ngaybaogia: baoGiaData?.ngaybaogia
            ? new Date(baoGiaData?.ngaybaogia)
            : new Date(),
          time: baoGiaData?.time,
          datcoc: baoGiaData?.datcoc,
        },
      });
    }
  }, [isSuccess]);

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
      ngaybaogia: data?.thong_tin_chung?.ngaybaogia || new Date(),
      time: data?.thong_tin_chung?.time || "15-20",
      datcoc: data?.thong_tin_chung?.datCoc || 50,
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
          onSearchCompany={(name) => searchCty({ name })}
          isLoadingSearchCoHoi={isLoadingCoHoi || isFetchingCoHoi}
          coHoiData={coHoiData}
          onSearchCoHoi={(name) =>
            searchCoHoi({ name, customerId: +query.get("customerId") })
          }
          loaiBaoGiaData={loaiBaoGiaData}
          isLoadingLoaiBaoGia={isLoadingLoaiBaoGia || isFetchingLoaiBaoGia}
          onSearchLoaiBaoGia={(name) => searchLoaiBaoGiaData({ name })}
          ngonNguData={ngonNguData}
          isLoadingNgonNgu={isLoadingNgonNgu || isFetchingNgonNgu}
          onSearchNgonNgu={(name) => searchNgonNgu({ name })}
          loaiTienData={loaiTienData}
          isLoadingLoaiTien={isLoadingLoaiTien || isFetchingLoaiTien}
          onSearchLoaiTien={(name) => searchLoaiTien({ name })}
          sanPhamData={sanPhamData}
          onSearchSanPham={(name) => searchSanPham({ name })}
          chatLieuData={chatLieuData}
          onSearchChatLieu={(name) => searchChatLieu({ name })}
          donViTinhData={donViTinhData}
          onSearchDonViTinh={(name) => searchDonViTinh({ name })}
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
