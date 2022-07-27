import React from "react";
import * as UI from "@/libs/ui";
import { FaSave } from "react-icons/fa";
import { useSearchParams, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import LichHenNewForm from "@/components/LichHenNewForm";
import {
  useLazyCreateLichHenQuery,
  useLazyPutLichHenByIdQuery,
} from "@/store/lichHen";
import { useLazySearchKhachHangListQuery } from "@/store/khachHang";
import Loading from "@/components/Loading";

interface ILichHenForm {
  lichHenData?: any;
  id?: any;
  isSuccess?: boolean;
  khachHangLabel?: any;
}

function LichHenForm(props: ILichHenForm) {
  const { lichHenData, id, isSuccess, khachHangLabel } = props;
  const navigate = useNavigate();

  const [
    searchKhachHang,
    {
      data: khachHangData,
      isLoading: isLoadingKhachHang,
      isFetching: isFetchingKhachHang,
    },
  ] = useLazySearchKhachHangListQuery();

  const [
    createLichHen,
    {
      data: dataLichHenNew,
      isLoading: isLoadingCreateLichHen,
      isSuccess: isSuccessCreateLichHen,
    },
  ] = useLazyCreateLichHenQuery();

  const [updateLichHen, { isLoading: isLoadingUpdateLichHen }] =
    useLazyPutLichHenByIdQuery();

  React.useEffect(() => {
    searchKhachHang({ name: "" });
  }, []);

  const [defaultValues, setDefaultValue] = React.useState<any>(null);

  React.useEffect(() => {
    if (isSuccessCreateLichHen) {
      toast.success("Thêm lịch hẹn thành công!");
      navigate(`/lich_hen/${dataLichHenNew?.data?.id}/view`);
    }
  }, [isSuccessCreateLichHen]);

  React.useEffect(() => {
    if (!id && khachHangData) {
      setDefaultValue((prev) => ({
        ...prev,
        customer_id: khachHangData?.[0],
      }));
    }

    if (isSuccess) {
      setDefaultValue((prev) => ({
        ...lichHenData,
        customer_id: {
          label: khachHangLabel,
          value: lichHenData?.customer_id,
        },
      }));
    }
  }, [isSuccess, khachHangData]);

  const elForm = React.useRef<any>();

  const handleSaveLichHen = (data: any, id: any) => {
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
      updateLichHen({
        id: data?.id,
        payload: payload,
      }).finally(() => {
        toast.success("Sửa lịch hẹn thành công!");
        navigate(`/lich_hen/${data?.id}`);
      });
      return;
    }
    createLichHen({ payload });
  };

  return (
    <UI.Card>
      <UI.CardContent sx={{ padding: "14px !important" }}>
        {id && !isSuccess ? (
          <Loading />
        ) : (
          <LichHenNewForm
            formRef={elForm}
            key={JSON.stringify(defaultValues)}
            isLoadingKhachHang={isLoadingKhachHang || isFetchingKhachHang}
            khachHangData={khachHangData}
            onSearchKhachHang={(name) => searchKhachHang({ name })}
            defaultValues={defaultValues}
          />
        )}
      </UI.CardContent>
      <UI.CardActions sx={{ justifyContent: "flex-end" }}>
        <LoadingButton
          loading={isLoadingCreateLichHen || isLoadingUpdateLichHen}
          onClick={() =>
            elForm.current.handleSubmit((data) => handleSaveLichHen(data, id))()
          }
          endIcon={<FaSave />}
          variant="outlined"
        >
          {id ? "Cập nhật lịch hẹn" : "Lưu lịch hẹn"}
        </LoadingButton>
      </UI.CardActions>
    </UI.Card>
  );
}

export default LichHenForm;