import React from "react";
import * as UI from "@/libs/ui";
import { FaSave } from "react-icons/fa";
import { useSearchParams, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import {
  useLazyCreateCoHoiCSKHQuery,
  useLazyPutCoHoiCSKHByIdQuery,
} from "@/store/coHoiCSKH";
import Loading from "@/components/Loading";
import CoHoiCSKHNewForm from "@/components/CoHoiCSKHNewForm";

interface ICoHoiCSKHForm {
  coHoiCSKHData?: any;
  id?: any;
  cohoi_id?: any;
  isSuccess?: boolean;
  khachHangLabel?: any;
  onAddTask?: (data: any) => any;
  refetchListCoHoiCSKH?: () => any;
  onCancel?: () => any;
}

function CoHoiCSKHForm(props: ICoHoiCSKHForm) {
  const {
    coHoiCSKHData,
    id,
    cohoi_id,
    isSuccess,
    refetchListCoHoiCSKH,
    onCancel,
  } = props;
  const navigate = useNavigate();

  const [
    createCoHoiCSKH,
    {
      data: dataCoHoiCSKHNew,
      isLoading: isLoadingCreateCoHoiCSKH,
      isSuccess: isSuccessCreateCoHoiCSKH,
    },
  ] = useLazyCreateCoHoiCSKHQuery();

  const [updateCoHoiCSKH, { isLoading: isLoadingUpdateCoHoiCSKH }] =
    useLazyPutCoHoiCSKHByIdQuery();

  const [defaultValues, setDefaultValue] = React.useState<any>(null);

  React.useEffect(() => {
    if (dataCoHoiCSKHNew) {
      toast.success("Thêm nhiệm vụ thành công!");
      refetchListCoHoiCSKH();
    }
  }, [dataCoHoiCSKHNew]);

  React.useEffect(() => {
    if (coHoiCSKHData) {
      setDefaultValue((prev) => ({
        ...coHoiCSKHData,
      }));
    } else {
      setDefaultValue(null);
    }
  }, [coHoiCSKHData]);

  const elForm = React.useRef<any>();

  const handleSaveCoHoiCSKH = (data: any, id: any) => {
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
      updateCoHoiCSKH({
        id: data?.id,
        payload: payload,
      }).finally(() => {
        toast.success("Sửa nhiệm vụ thành công!");
        refetchListCoHoiCSKH();
      });
      return;
    }
    createCoHoiCSKH({ payload });
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
          <CoHoiCSKHNewForm
            key={JSON.stringify(defaultValues)}
            defaultValues={defaultValues}
            formRef={elForm}
          />
        )}
      </UI.CardContent>
      <UI.CardActions sx={{ justifyContent: "flex-end", paddingTop: 0 }}>
        <UI.Button onClick={onCancel} color="inherit">
          Cancel
        </UI.Button>
        <LoadingButton
          loading={isLoadingCreateCoHoiCSKH || isLoadingUpdateCoHoiCSKH}
          onClick={() =>
            elForm.current.handleSubmit((data) =>
              handleSaveCoHoiCSKH(data, id)
            )()
          }
          endIcon={<FaSave />}
          variant="outlined"
          size="small"
        >
          {id ? "Cập nhật" : "Tạo mới"}
        </LoadingButton>
      </UI.CardActions>
    </UI.Card>
  );
}

export default CoHoiCSKHForm;
