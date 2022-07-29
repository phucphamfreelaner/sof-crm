import React from "react";
import Comment from "@/components/Comment";
import { useLazyCreateCoHoiCSKHQuery } from "@/store/coHoiCSKH";
import * as UI from "@/libs/ui";

interface IGhiChuForm {
  onAddNoted?: (data: any) => any;
  coHoiId?: any;
  customerId?: any;
  onCancel?: () => any;
}

function GhiChuForm(props: IGhiChuForm) {
  const { onAddNoted, coHoiId, customerId, onCancel } = props;
  const [
    createCoHoiCSKH,
    {
      data: dataCoHoiCSKHNew,
      isLoading: isLoadingCreateCoHoiCSKH,
      isSuccess: isSuccessCreateCoHoiCSKH,
    },
  ] = useLazyCreateCoHoiCSKHQuery();

  const handleSaveNhiemVu = (noiDung: any) => {
    const payload = {
      co_hoi_id: coHoiId,
      customer_id: customerId,
    };
    console.log("payload", payload);
    createCoHoiCSKH({ payload });
  };

  return (
    <UI.Card>
      <Comment
        label="Thêm ghi chú"
        defaultValue={"Chăm sóc khách hàng"}
        sendMessage={(noiDung) => {
          console.log("noiDung", noiDung);
          handleSaveNhiemVu(noiDung);
        }}
      />
      <UI.CardActions sx={{ justifyContent: "flex-end", paddingTop: 0 }}>
        <UI.Button onClick={onCancel} color="inherit">
          Cancel
        </UI.Button>
      </UI.CardActions>
    </UI.Card>
  );
}

export default GhiChuForm;
