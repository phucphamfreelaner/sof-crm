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
  isSuccess?: boolean;
  khachHangLabel?: any;
  onAddTask?: (data: any) => any;
}

function NhiemVuForm(props: INhiemVuForm) {
  const { nhiemVuData, id, isSuccess, khachHangLabel } = props;
  const navigate = useNavigate();

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
    if (isSuccessCreateNhiemVu) {
      toast.success("Thêm nhiệm vụ thành công!");
      navigate(`/nhiem_vu/${dataNhiemVuNew?.data?.id}/view`);
    }
  }, [isSuccessCreateNhiemVu]);

  React.useEffect(() => {
    if (isSuccess) {
      setDefaultValue((prev) => ({
        ...nhiemVuData,
        customer_id: {
          label: khachHangLabel,
          value: nhiemVuData?.customer_id,
        },
      }));
    }
  }, [isSuccess]);

  React.useEffect(() => {
    if (!id && isSuccessLoai && isSuccessDanhGia && isSuccessTrangThai) {
      setDefaultValue((prev) => ({
        ...prev,
        loai_key: loaiNhiemVuData?.[0],
        trangthai: trangThaiNhiemVuData?.[0],
        danh_gia_key: danhGiaNhiemVuData?.[0],
      }));
    }
  }, [id, isSuccessLoai, isSuccessDanhGia, isSuccessTrangThai]);

  const elForm = React.useRef<any>();

  const handleSaveNhiemVu = (data: any, id: any) => {
    const payload = {
      ...data,
      customer_id: data?.customer_id?.value,
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
        navigate(`/nhiem_vu/${data?.id}`);
      });
      return;
    }
    createNhiemVu({ payload });
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
            loaiNhiemVuData={loaiNhiemVuData}
            onSearchLoaiNhiemVu={searchLoaiNhiemVu}
            isLoadingLoaiNhiemVu={
              isLoadingLoaiNhiemVuData || isFetchingLoaiNhiemVuData
            }
            trangThaiNhiemVuData={trangThaiNhiemVuData}
            onSearchTrangThaiNhiemVu={searchTrangThaiNhiemVu}
            isLoadingTrangThaiNhiemVu={
              isLoadingTrangThaiNhiemVuData || isFetchingTrangThaiNhiemVuData
            }
            danhGiaNhiemVuData={danhGiaNhiemVuData}
            onSearchDanhGiaNhiemVu={searchDanhGiaNhiemVu}
            isLoadingDanhGiaNhiemVu={
              isLoadingDanhGiaNhiemVuData || isFetchingDanhGiaNhiemVuData
            }
            defaultValues={defaultValues}
            formRef={elForm}
          />
        )}
      </UI.CardContent>
      <UI.CardActions sx={{ justifyContent: "flex-end" }}>
        <LoadingButton
          loading={isLoadingCreateNhiemVu || isLoadingUpdateNhiemVu}
          onClick={() =>
            elForm.current.handleSubmit((data) => handleSaveNhiemVu(data, id))()
          }
          endIcon={<FaSave />}
          variant="outlined"
        >
          {id ? "Cập nhật nhiệm vụ" : "Lưu nhiệm vụ"}
        </LoadingButton>
      </UI.CardActions>
    </UI.Card>
  );
}

export default NhiemVuForm;
