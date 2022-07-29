import React from "react";
import * as UI from "@/libs/ui";
import { FaSave } from "react-icons/fa";
import { useSearchParams, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import {
  useLazyCreateNhiemVuQuery,
  useLazyPutNhiemVuByIdQuery,
  useLazyGetLoaiNhiemVuQuery,
  useLazyGetDanhGiaNhiemVuQuery,
  useLazyGetTrangThaiNhiemVuQuery,
} from "@/store/nhiemVu";
import Loading from "@/components/Loading";
import NhiemVuNewForm from "@/components/NhiemVuNewForm";

interface INhiemVuForm {
  nhiemVuData?: any;
  id?: any;
  cohoi_id?: any;
  isSuccess?: boolean;
  khachHangLabel?: any;
  onAddTask?: (data: any) => any;
  refetchListNhiemVu?: () => any;
  onCancel?: () => any;
}

function NhiemVuForm(props: INhiemVuForm) {
  const { nhiemVuData, id, cohoi_id, isSuccess, refetchListNhiemVu, onCancel } =
    props;

  const [
    searchLoaiNhiemVu,
    {
      data: loaiNhiemVuData,
      isLoading: isLoadingLoaiNhiemVuData,
      isFetching: isFetchingLoaiNhiemVuData,
      isSuccess: isSuccessLoai,
    },
  ] = useLazyGetLoaiNhiemVuQuery();

  const [
    searchDanhGiaNhiemVu,
    {
      data: danhGiaNhiemVuData,
      isLoading: isLoadingDanhGiaNhiemVuData,
      isSuccess: isSuccessDanhGia,
      isFetching: isFetchingDanhGiaNhiemVuData,
    },
  ] = useLazyGetDanhGiaNhiemVuQuery();

  const [
    searchTrangThaiNhiemVu,
    {
      data: trangThaiNhiemVuData,
      isLoading: isLoadingTrangThaiNhiemVuData,
      isFetching: isFetchingTrangThaiNhiemVuData,
      isSuccess: isSuccessTrangThai,
    },
  ] = useLazyGetTrangThaiNhiemVuQuery();

  const [
    createNhiemVu,
    {
      data: dataNhiemVuNew,
      isLoading: isLoadingCreateNhiemVu,
      isSuccess: isSuccessCreateNhiemVu,
    },
  ] = useLazyCreateNhiemVuQuery();

  const [updateNhiemVu, { isLoading: isLoadingUpdateNhiemVu }] =
    useLazyPutNhiemVuByIdQuery();

  React.useEffect(() => {
    searchLoaiNhiemVu({});
    searchDanhGiaNhiemVu({});
    searchTrangThaiNhiemVu({});
  }, []);

  const [defaultValues, setDefaultValue] = React.useState<any>(null);

  React.useEffect(() => {
    if (dataNhiemVuNew) {
      toast.success("Thêm nhiệm vụ thành công!");
      refetchListNhiemVu();
    }
  }, [dataNhiemVuNew]);

  React.useEffect(() => {
    if (
      nhiemVuData &&
      loaiNhiemVuData &&
      trangThaiNhiemVuData &&
      danhGiaNhiemVuData
    ) {
      setDefaultValue((prev) => ({
        ...nhiemVuData,
        loai_key: {
          label: loaiNhiemVuData?.[nhiemVuData?.loai_key] || "",
          value: nhiemVuData?.loai_key || "",
        },
        trangthai: {
          label: trangThaiNhiemVuData?.[nhiemVuData?.trangthai] || "",
          value: nhiemVuData?.trangthai || "",
        },
        danh_gia_key: {
          label: danhGiaNhiemVuData?.[nhiemVuData?.danh_gia_key] || "",
          value: nhiemVuData?.danh_gia_key || "",
        },
      }));
    } else {
      setDefaultValue(null);
    }
  }, [nhiemVuData, loaiNhiemVuData, trangThaiNhiemVuData, danhGiaNhiemVuData]);

  // React.useEffect(() => {
  //   if (!id && isSuccessLoai && isSuccessDanhGia && isSuccessTrangThai) {
  //     setDefaultValue((prev) => ({
  //       ...prev,
  //       loai_key: convertData(loaiNhiemVuData)?.[0],
  //       trangthai: convertData(trangThaiNhiemVuData)?.[0],
  //       danh_gia_key: convertData(danhGiaNhiemVuData)?.[0],
  //     }));
  //   }
  // }, [id, isSuccessLoai, isSuccessDanhGia, isSuccessTrangThai]);

  const elForm = React.useRef<any>();

  const handleSaveNhiemVu = (data: any, id: any) => {
    const payload = {
      ...data,
      object: "co_hoi",
      co_hoi_id: cohoi_id,
      object_id: cohoi_id,
      loai_key: data?.loai_key?.value,
      trangthai: data?.trangthai?.value,
      danh_gia_key: data?.danh_gia_key?.value,

      ngaybatdau: data?.ngaybatdau
        ? typeof data?.ngaybatdau === "string"
          ? format(new Date(data?.ngaybatdau), "yyyy-MM-dd")
          : format(data?.ngaybatdau, "yyyy-MM-dd")
        : format(new Date(), "yyyy-MM-dd"),
      ngayketthuc: data?.ngayketthuc
        ? typeof data?.ngayketthuc === "string"
          ? format(new Date(data?.ngayketthuc), "yyyy-MM-dd")
          : format(data?.ngayketthuc, "yyyy-MM-dd")
        : format(new Date(), "yyyy-MM-dd"),
    };
    if (id) {
      updateNhiemVu({
        id: data?.id,
        payload: payload,
      }).finally(() => {
        toast.success("Sửa nhiệm vụ thành công!");
        refetchListNhiemVu();
      });
      return;
    }
    createNhiemVu({ payload });
  };

  const convertData = (rawData) => {
    return rawData
      ? Object.keys(rawData).map((key) => {
          return { label: rawData[key], value: key };
        })
      : [];
  };
  return (
    <UI.Card>
      <UI.CardContent sx={{ padding: "14px !important" }}>
        {id && !isSuccess ? (
          <Loading />
        ) : (
          // <NhiemVuNewForm
          //   formRef={elForm}
          //   key={JSON.stringify(defaultValues)}
          //   isLoadingKhachHang={isLoadingKhachHang || isFetchingKhachHang}
          //   khachHangData={khachHangData}
          //   onSearchKhachHang={(name) => searchKhachHang({ name })}
          //   defaultValues={defaultValues}
          // />
          <NhiemVuNewForm
            key={JSON.stringify(defaultValues)}
            loaiNhiemVuData={convertData(loaiNhiemVuData)}
            onSearchLoaiNhiemVu={searchLoaiNhiemVu}
            isLoadingLoaiNhiemVu={
              isLoadingLoaiNhiemVuData || isFetchingLoaiNhiemVuData
            }
            trangThaiNhiemVuData={convertData(trangThaiNhiemVuData)}
            onSearchTrangThaiNhiemVu={searchTrangThaiNhiemVu}
            isLoadingTrangThaiNhiemVu={
              isLoadingTrangThaiNhiemVuData || isFetchingTrangThaiNhiemVuData
            }
            danhGiaNhiemVuData={convertData(danhGiaNhiemVuData)}
            onSearchDanhGiaNhiemVu={searchDanhGiaNhiemVu}
            isLoadingDanhGiaNhiemVu={
              isLoadingDanhGiaNhiemVuData || isFetchingDanhGiaNhiemVuData
            }
            defaultValues={defaultValues}
            formRef={elForm}
          />
        )}
      </UI.CardContent>
      <UI.CardActions sx={{ justifyContent: "flex-end", paddingTop: 0 }}>
        <UI.Button size="small" onClick={onCancel} color="inherit">
          Cancel
        </UI.Button>
        <LoadingButton
          loading={isLoadingCreateNhiemVu || isLoadingUpdateNhiemVu}
          onClick={() =>
            elForm.current.handleSubmit((data) => handleSaveNhiemVu(data, id))()
          }
          endIcon={<FaSave />}
          variant="outlined"
          size="small"
        >
          {id ? "Cập nhật nhiệm vụ" : "Tạo mới nhiệm vụ"}
        </LoadingButton>
      </UI.CardActions>
    </UI.Card>
  );
}

export default NhiemVuForm;
