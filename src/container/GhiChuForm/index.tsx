import React from "react";
import * as UI from "@/libs/ui";
import toast from "react-hot-toast";
import Comment from "@/components/Comment";
import Loading from "@/components/Loading";

interface IGhiChuForm {
  coHoiId?: any;
  customerId?: any;
  onReloadForm?: () => any;

  onCreateNote?: (data?: any) => any;
  onUpdateNote?: (data?: any) => any;
  isLoadingNote?: boolean;
  reloadListNote?: () => any;
  dataNote?: any;
}

function GhiChuForm(props: IGhiChuForm) {
  const { coHoiId, customerId, onCreateNote, reloadListNote } = props;

  const handleCreate = (data: any) => {
    const payload = {
      co_hoi_id: coHoiId,
      customer_id: customerId,
      noi_dung: data,
    };
    onCreateNote({ payload }).finally(() => {
      toast.success("Thêm ghi chú thành công!");
      reloadListNote();
    });
  };

  return (
    <UI.CKBox overflow="auto">
      <UI.CKBox position="relative">
        <Comment defaultValue={""} label="" sendMessage={handleCreate} />
      </UI.CKBox>
    </UI.CKBox>
  );
}

export default GhiChuForm;
