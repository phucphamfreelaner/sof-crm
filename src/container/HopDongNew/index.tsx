import React from "react";
import * as UI from "@/libs/ui";
import { FaSave } from "react-icons/fa";
import { useSearchParams, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-hot-toast";
import { omit } from "lodash-es";
import { format } from "date-fns";
import Loading from "@/components/Loading";

import VNnum2words from "vn-num2words";
import { capitalize } from "lodash-es";
import HopDongNewForm from "@/components/HopDongNewForm";
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
import { useLazySearchMauInQuery } from "@/store/mauIn";
import { useLazySearchNhanVienQuery } from "@/store/nhanVien";
import {
  useLazySearchBenHdQuery,
  useLazySearchloaiHdQuery,
} from "@/store/loaiHd";
import { useGetBaoGiaByIdQuery } from "@/store/baoGia";
import { useParams } from "react-router-dom";
import {
  useLazyCreateHopDongQuery,
  useLazyPutHopDongByIdQuery,
} from "@/store/hopDong";

interface IBaoGiaForm {
  id?: any;
  hopDongData?: any;
  isSuccess?: any;
  nhanVienLabel?: any;
  ngonNguLabel?: any;
  loaiTienLabel?: any;
  loaiHdLabel?: any;
  mauInLabel?: any;
  benHdLabel?: any;
  isEdit?: any;
}

function HopDongFormContainer(props: IBaoGiaForm) {
  const {
    id,
    hopDongData,
    isSuccess,
    isEdit,
    nhanVienLabel,
    ngonNguLabel,
    loaiTienLabel,
    loaiHdLabel,
    mauInLabel,
    benHdLabel,
  } = props;
  const [query] = useSearchParams();

  const baogia_id = hopDongData?.baogia_id
    ? hopDongData?.baogia_id
    : query.get("baogia_id")
    ? query.get("baogia_id")
    : false;

  const {
    data: baoGiaData,
    isSuccess: isSuccessBaoGia,
    isLoading: isLoadingBaogia,
    isFetching: isFetchingBaoGia,
  } = useGetBaoGiaByIdQuery({ id: baogia_id }, { skip: !baogia_id });

  const [
    searchNhanVien,
    {
      data: nhanVienData,
      isLoading: isLoadingNhanVien,
      isFetching: isFetchingNhanVien,
      isSuccess: isSuccessNhanVien,
    },
  ] = useLazySearchNhanVienQuery();

  const [
    searchLoaiHd,
    {
      data: LoaiHdData,
      isLoading: isLoadingLoaiHd,
      isFetching: isFetchingLoaiHd,
      isSuccess: isSuccessLoaiHd,
    },
  ] = useLazySearchloaiHdQuery();

  const [
    searchBenHd,
    {
      data: benHdData,
      isLoading: isLoadingBenHd,
      isFetching: isFetchingBenHd,
      isSuccess: isSuccessBenHd,
    },
  ] = useLazySearchBenHdQuery();

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

  const navigate = useNavigate();

  const [
    createHopDong,
    {
      data: dataHopDongNew,
      isLoading: isLoadingCreateHopDong,
      isSuccess: isSuccessCreateHopDong,
    },
  ] = useLazyCreateHopDongQuery();

  const [updateHopDong, { isLoading: isLoadingUpdateHopDong }] =
    useLazyPutHopDongByIdQuery();

  const handleSaveHopDong = (data: any, id: any) => {
    console.log("🚀 ~ data", data);
    if (id) {
      const san_pham = data?.san_pham.map((x: any, index: number) => ({
        ...hopDongData?.san_pham?.[index],
        ...x,
        chat_lieu_key: x?.chat_lieu_key?.value,
        don_vi_key: x?.don_vi_key?.value,
        product_id: x?.product_id?.value,
      }));
      const payload = {
        ...data,
        san_pham,
        customer_id: baoGiaData?.customer_id,
        cohoi_id: baoGiaData?.cohoi_id,
        baogia_id: baoGiaData?.id,
        company_id: baoGiaData?.company_id,
        name: baoGiaData?.name,
        ngon_ngu_key: data?.ngon_ngu_key?.value,
        template_id: data?.template_id?.value,
        chiphivanchuyen: data?.chiphivanchuyen?.value,
        dai_dien_id: data?.dai_dien_id?.value,
        loai_hd_key: data?.loai_hd_key?.value,
        loai_tien_key: data?.loai_tien_key?.value,
        vat: data?.vat ? 1 : 0,
        created_at: data?.created_at
          ? typeof data?.created_at === "string"
            ? format(new Date(data?.created_at), "yyyy-mm-dd")
            : format(data?.created_at, "yyyy-mm-dd")
          : format(new Date(), "yyyy-mm-dd"),
      };
      updateHopDong({
        id: data?.id,
        payload: { payload },
      }).finally(() => {
        toast.success("Sửa hợp đồng thành công!");
        navigate(`/hop_dong/${data?.id}`);
      });
    } else {
      const san_pham = data?.san_pham.map((x: any, index: number) => ({
        ...baoGiaData?.san_pham?.[index],
        ...x,
        chat_lieu_key: x?.chat_lieu_key?.value,
        don_vi_key: x?.don_vi_key?.value,
        product_id: x?.product_id?.value,
        baogia_id: baoGiaData?.id,
      }));
      const payload = {
        ...data,
        san_pham,
        customer_id: baoGiaData?.customer_id,
        cohoi_id: baoGiaData?.cohoi_id,
        baogia_id: baoGiaData?.id,
        company_id: baoGiaData?.company_id,
        name: baoGiaData?.name,
        ngon_ngu_key: data?.ngon_ngu_key?.value,
        template_id: data?.template_id?.value,
        chiphivanchuyen: data?.chiphivanchuyen?.value,
        dai_dien_id: data?.dai_dien_id?.value,
        loai_hd_key: data?.loai_hd_key?.value,
        loai_tien_key: data?.loai_tien_key?.value,
        vat: data?.vat ? 1 : 0,
        created_at: data?.created_at
          ? typeof data?.created_at === "string"
            ? format(new Date(data?.created_at), "yyyy-mmm-dd")
            : format(data?.created_at, "yyyy-mmm-dd")
          : format(new Date(), "yyyy-mmm-dd"),
      };
      createHopDong({ payload });
    }
  };

  React.useEffect(() => {
    if (isSuccessCreateHopDong) {
      toast.success("Tạo hợp đồng thành công!");
      navigate(`/hop_dong/${dataHopDongNew?.data?.id}/view`);
    }
  }, [isSuccessCreateHopDong]);

  React.useEffect(() => {
    searchNhanVien({
      name: "",
      chuc_vu_key:
        "chuc_vu_key=giam-doc,giam-doc-kinh-doanh,giam-doc-dieu-hanh",
    });
    searchLoaiHd({ name: "" });
    searchBenHd({ name: "" });
    searchNgonNgu({ name: "" });
    searchLoaiTien({ name: "" });
    searchSanPham({ name: "" });
    searchChatLieu({ name: "" });
    searchDonViTinh({ name: "" });
    searchMauIn({ name: "" });
  }, []);

  const [defaultValues, setDefaultValue] = React.useState<any>(null);

  React.useEffect(() => {
    if (
      isSuccessLoaiTien &&
      isSuccessNgonNgu &&
      isSuccessSanPham &&
      isSuccessDonViTinh &&
      isSuccessBenHd &&
      isSuccessNhanVien &&
      isSuccessLoaiHd &&
      !id
    ) {
      setDefaultValue((value) => ({
        ...value,
        dai_dien_id: nhanVienData?.[0],
        loai_hd_key: LoaiHdData?.[0],
        chiphivanchuyen: benHdData?.[0],
        loai_tien_key: loaiTienData?.[0],
        ngon_ngu_key: ngonNguData?.[0],
        template_id: mauInData?.[0],
        quy_trinh: [
          {
            _id: 1,
            phan_tram: 100,
            tong_tien_dot_locate: "1",
            tong_tien_chu: "Một Đồng",
          },
        ],
      }));
    }
  }, [
    isSuccessLoaiTien,
    isSuccessNgonNgu,
    isSuccessNhanVien,
    isSuccessLoaiHd,
    isSuccessBenHd,
    isSuccessSanPham,
    isSuccessChatLieu,
    isSuccessDonViTinh,
    isSuccessMauIn,
  ]);
  1;
  React.useEffect(() => {
    if (id && hopDongData && isSuccess) {
      const defaultValue = {
        ...hopDongData,
        vat: hopDongData?.vat === 1 ? true : false,
        dai_dien_id: {
          value: hopDongData?.dai_dien_id,
          label: nhanVienLabel,
        },
        ngon_ngu_key: {
          value: hopDongData?.ngon_ngu_key,
          label: ngonNguLabel,
        },
        loai_tien_key: {
          value: hopDongData?.loai_tien_key,
          label: loaiTienLabel,
        },
        loai_hd_key: {
          value: hopDongData?.loai_hd_key,
          label: loaiHdLabel,
        },
        template_id: {
          value: hopDongData?.template_id,
          label: mauInLabel,
        },
        chiphivanchuyen: {
          value: hopDongData?.chiphivanchuyen,
          label: benHdLabel,
        },
      };
      setDefaultValue(defaultValue);
      return;
    }
    if (baoGiaData && !id) {
      const defaultValue = {
        tong_tien: baoGiaData?.tong_tien,
        time: baoGiaData?.time,
        vat_phan_tram: baoGiaData?.vat_phan_tram,
        tong_tien_chu: `${capitalize(VNnum2words(baoGiaData?.tong_tien))} đồng`,

        vat: baoGiaData?.vat === 1 ? true : false,
        san_pham: baoGiaData?.san_pham?.map?.((x: any) => ({
          ...x,
          _id: x.id,
        })),
        quy_trinh: [
          {
            _id: 1,
            phan_tram: 100,
            tong_tien_dot_locate: "1",
            tong_tien_chu: "Một Đồng",
          },
        ],
      };
      setDefaultValue(defaultValue);
    }
  }, [baoGiaData, hopDongData, isSuccess]);

  const elForm = React.useRef<any>();

  return (
    <UI.Card elevation={10}>
      <UI.CardContent>
        {(isEdit && !isSuccess) || isFetchingBaoGia || isLoadingBaogia ? (
          <Loading />
        ) : (
          <HopDongNewForm
            formRef={elForm}
            key={JSON.stringify(defaultValues)}
            nhanVienData={nhanVienData}
            isLoadingSearchNhanVien={isLoadingNhanVien || isFetchingNhanVien}
            onSearchNhanVien={(name) =>
              searchNhanVien({
                name: name,
                chuc_vu_key:
                  "chuc_vu_key=giam-doc,giam-doc-kinh-doanh,giam-doc-dieu-hanh",
              })
            }
            LoaiHdData={LoaiHdData}
            isLoadingSearchLoaiHd={isLoadingLoaiHd || isFetchingLoaiHd}
            onSearchLoaiHd={(name) => searchLoaiHd({ name })}
            benHdData={benHdData}
            isLoadingBenHd={isLoadingBenHd || isFetchingBenHd}
            onSearchBenHd={(name) => searchBenHd({ name })}
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
            onAddQuyTrinh={(index) => ({
              _id: index,
              phan_tram: 100,
              tong_tien_dot_locate: "",
              tong_tien_chu: "",
            })}
            defaultValues={defaultValues}
          />
        )}
      </UI.CardContent>
      <UI.CardActions sx={{ justifyContent: "flex-end" }}>
        <LoadingButton
          loading={isLoadingCreateHopDong || isLoadingUpdateHopDong}
          onClick={() =>
            elForm.current.handleSubmit((data) => handleSaveHopDong(data, id))()
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

export default HopDongFormContainer;
