import React from "react";
import * as UI from "@/libs/ui";
import { FaSave } from "react-icons/fa";
import { useSearchParams, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-hot-toast";
import { omit, uniqueId } from "lodash-es";

import BaoGiaNewForm from "@/components/BaoGiaNewForm";
import {
  useLazySearchCongTyQuery,
  useLazyGetCongTyByIdQuery,
} from "@/store/congTy";
import { useLazySearchCoHoiQuery } from "@/store/coHoi";
import { useLazyGetLoaiBaoGiaListQuery } from "@/store/loaiBaoGia";
import { useLazySearchNgonNguQuery } from "@/store/ngonNgu";
import { useLazySearchLoaiTienGiaListQuery } from "@/store/loaiTien";
import {
  useLazySearchSanPhamQuery,
  useLazyGetSanPhamByIdQuery,
} from "@/store/sanPham";
import {
  useLazySearchChatLieuQuery,
  useLazyGetLoaiBaoGiaByKeyQuery,
} from "@/store/chatLieu";
import {
  useLazySearchDonViTinhQuery,
  useLazyGetDonViTinhByKeyQuery,
} from "@/store/donViTinh";
import {
  useLazySearchMauInQuery,
  useLazyGetMauInByIdQuery,
} from "@/store/mauIn";
import {
  useLazyCreateBaoGiaQuery,
  useLazyPutBaoGiaByIdQuery,
} from "@/store/baoGia";
import { useLazySearchTyGiaGiaQuery } from "@/store/tyGia";

interface IBaoGiaForm {
  baoGiaData?: any;
  id?: any;
  congTyLabel?: string;
  isSuccess?: boolean;
  coHoiLabel?: string;
  loaiBaoGiaLabel?: string;
  ngonNguLabel?: string;
  loaiTienLabel?: string;
  mauInLabel?: string;
  gap?: string;
  size?: "medium" | "small";
  modalId?: any;
  customerId?: any;
}

function BaoGaiForm(props: IBaoGiaForm) {
  const {
    baoGiaData,
    id,
    isSuccess,
    coHoiLabel,
    loaiBaoGiaLabel,
    ngonNguLabel,
    loaiTienLabel,
    gap,
    size = "medium",
    customerId,
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

  const [getChatLieuByKey] = useLazyGetLoaiBaoGiaByKeyQuery();

  const [
    searchSanPham,
    {
      data: sanPhamData,
      isLoading: isLoadingSanPham,
      isFetching: isFetchingSanPham,
      isSuccess: isSuccessSanPham,
    },
  ] = useLazySearchSanPhamQuery();

  const [getSanPhamById] = useLazyGetSanPhamByIdQuery();

  const [
    searchDonViTinh,
    {
      data: donViTinhData,
      isLoading: isLoadingDonViTinh,
      isFetching: isFetchingDonViTinh,
      isSuccess: isSuccessDonViTinh,
    },
  ] = useLazySearchDonViTinhQuery();

  const [getDonViTinhByKey] = useLazyGetDonViTinhByKeyQuery();

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

  const [
    searchTyGia,
    { data: dataTyGia, isLoading: isLoadingTyGia, isSuccess: isSuccessTyGia },
  ] = useLazySearchTyGiaGiaQuery();

  const [updateBaoGia, { isLoading: isLoadingUpdateBaoGia }] =
    useLazyPutBaoGiaByIdQuery();

  React.useEffect(() => {
    searchCty({ name: "" });
    searchCoHoi({
      name: "",
      customerId: +(query.get("customerId") || customerId),
    });
    searchLoaiBaoGiaData({ name: "" });
    searchNgonNgu({ name: "" });
    searchLoaiTien({ name: "" });
    searchSanPham({ name: "" });
    searchChatLieu({ name: "" });
    searchDonViTinh({ name: "" });
    searchMauIn({ name: "" });
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
      isSuccessDonViTinh &&
      !id
    ) {
      setDefaultValue((value: any) => ({
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
            id: uniqueId(),
            so_luong: 1,
            don_gia: 0,
            thue: 0,
            phu_thu: 0,
            phi_khac: 0,
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
      const defaultValue = {
        ...baoGiaData,
        san_pham: baoGiaData?.san_pham,
        cohoi_id: {
          value: baoGiaData?.cohoi_id,
          label: coHoiLabel,
        },
        loai_bao_gia_key: {
          value: baoGiaData?.loai_bao_gia_key,
          label: loaiBaoGiaLabel,
        },
        ngon_ngu_key: {
          value: baoGiaData?.ngon_ngu_key,
          label: ngonNguLabel,
        },
        loai_tien_key: {
          value: baoGiaData?.loai_tien_key,
          label: loaiTienLabel,
        },

        thong_tin_chung: {
          ngaybaogia: baoGiaData?.ngaybaogia
            ? new Date(baoGiaData?.ngaybaogia)
            : new Date(),
          time: baoGiaData?.time,
          datcoc: baoGiaData?.datcoc,
        },
      };
      setDefaultValue(defaultValue);
    }
  }, [isSuccess]);

  const elForm = React.useRef<any>();

  const handleSaveBaoGia = (data: any, id: any) => {
    const san_pham = data?.san_pham.map((x: any, index: number) => ({
      ...baoGiaData?.san_pham?.[index],
      ...x,
      don_vi_key: x?.don_vi_key,
      product_id: x?.product_id,
      baogia_id: +id,
    }));

    const payload = {
      ...data,
      san_pham,
      customer_id:
        +query.get("customerId") || baoGiaData?.customer_id || customerId,
      ngon_ngu_key: data?.ngon_ngu_key?.value,
      loai_tien_key: data?.loai_tien_key?.value,
      loai_bao_gia: data?.loai_bao_gia?.value,
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
    if (id) {
      updateBaoGia({
        id: data?.id,
        payload: omit(payload, ["thong_tin_chung"]),
      }).finally(() => {
        toast.success("Sửa báo giá thành công!");
        navigate(`/bao_gia/${data?.id}`);
      });
      return;
    }
    createBaoGia({ payload });
  };

  const [getCongTyById] = useLazyGetCongTyByIdQuery();
  const [getMauInById] = useLazyGetMauInByIdQuery();

  return (
    <UI.Card>
      <UI.CardContent sx={{ padding: "14px !important" }}>
        <BaoGiaNewForm
          gap={gap}
          size={size}
          formRef={elForm}
          key={JSON.stringify(defaultValues)}
          isLoadingSearchCompany={isLoadingCompany || isFetchingCompany}
          companyData={companyData}
          onSearchCompany={(name) => searchCty({ name })}
          isLoadingSearchCoHoi={isLoadingCoHoi || isFetchingCoHoi}
          coHoiData={coHoiData}
          onSearchCoHoi={(name) =>
            searchCoHoi({
              name,
              customerId:
                +query.get("customerId") ||
                +baoGiaData?.customer_id ||
                customerId,
            })
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
          getSanPhamById={(id: any) => getSanPhamById({ id }).unwrap()}
          getChatLieuByKey={(value: string) =>
            getChatLieuByKey({ value }).unwrap()
          }
          getDonViTinhByKey={(value: string) =>
            getDonViTinhByKey({ value }).unwrap()
          }
          getCongTyById={(id: any) => getCongTyById({ id }).unwrap()}
          getMauInById={(id: any) => getMauInById({ id }).unwrap()}
          onAddSanPham={() => ({
            id: uniqueId(),
            so_luong: 1,
            don_gia: 0,
            thue: 0,
            phu_thu: 0,
            phi_khac: 0,
          })}
          defaultValues={defaultValues}
        />
      </UI.CardContent>
      <UI.CardActions sx={{ justifyContent: "flex-end" }}>
        <LoadingButton
          loading={isLoadingCreateBaoGia || isLoadingUpdateBaoGia}
          onClick={() =>
            elForm.current.handleSubmit((data) => handleSaveBaoGia(data, id))()
          }
          endIcon={<FaSave />}
          variant="outlined"
        >
          {id ? "Cập nhật báo giá" : "Lưu báo giá"}
        </LoadingButton>
      </UI.CardActions>
    </UI.Card>
  );
}

export default BaoGaiForm;
