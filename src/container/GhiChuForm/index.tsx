import React from "react";
import { useLazyCreateCoHoiCSKHQuery } from "@/store/coHoiCSKH";
import * as UI from "@/libs/ui";
import toast from "react-hot-toast";
import Comment from "@/components/Comment";
import Loading from "@/components/Loading";

interface IGhiChuForm {
  onAddNoted?: (data: any) => any;
  coHoiId?: any;
  customerId?: any;
  isSuccess?: boolean;
  refetchListCoHoiCSKH?: () => any;
  onReloadForm?: () => any;
  onCancel?: () => any;
}

function GhiChuForm(props: IGhiChuForm) {
  const {
    onAddNoted,
    coHoiId,
    refetchListCoHoiCSKH,
    customerId,
    isSuccess,
    onReloadForm,
    onCancel,
  } = props;

  const [defaultValue, setDefaultValue] = React.useState("");

  const [
    createCoHoiCSKH,
    {
      data: dataCoHoiCSKHNew,
      isLoading: isLoadingCreateCoHoiCSKH,
      isSuccess: isSuccessCreateCoHoiCSKH,
    },
  ] = useLazyCreateCoHoiCSKHQuery();

  const handleCreateCoHoiCSKH = (data) => {
    const payload = {
      co_hoi_id: coHoiId,
      customer_id: customerId,
      noi_dung: data,
    };
    createCoHoiCSKH({ payload }).finally(() => {
      toast.success("Thêm ghi chú thành công!");
      refetchListCoHoiCSKH();
      onReloadForm();
      onAddNoted(dataCoHoiCSKHNew);
    });
  };

  return (
    <UI.CKBox overflow="auto">
      {!isSuccess ? (
        <Loading />
      ) : (
        <UI.CKBox position="relative">
          <Comment
            defaultValue={defaultValue}
            label=""
            sendMessage={(data) => {
              handleCreateCoHoiCSKH(data);
            }}
          />
        </UI.CKBox>
      )}
    </UI.CKBox>
  );
}

export default GhiChuForm;
