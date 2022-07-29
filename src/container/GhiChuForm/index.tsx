import React from "react";
import Comment from "@/components/Comment";
import {
  useGetCoHoiCSKHByCoHoiIdQuery,
  useLazyCreateCoHoiCSKHQuery,
} from "@/store/coHoiCSKH";
import * as UI from "@/libs/ui";
import { FaSave } from "react-icons/fa";
import toast from "react-hot-toast";
import CoHoiCSKHList from "../CoHoiCSKHList";
import CoHoiCSKHForm from "../CoHoiCSKHForm";

interface IGhiChuForm {
  onAddNoted?: (data: any) => any;
  coHoiId?: any;
  customerId?: any;
  onCancel?: () => any;
}

function GhiChuForm(props: IGhiChuForm) {
  const { onAddNoted, coHoiId, customerId, onCancel } = props;
  const [coHoiCSKHData, setCoHoiCSKHData] = React.useState(null);
  const [isEdit, setIsEdit] = React.useState(false);

  const [
    createCoHoiCSKH,
    {
      data: dataCoHoiCSKHNew,
      isLoading: isLoadingCreateCoHoiCSKH,
      isSuccess: isSuccessCreateCoHoiCSKH,
    },
  ] = useLazyCreateCoHoiCSKHQuery();

  const {
    isLoading: isLoadingListCoHoiCSKH,
    isFetching: isFetchingListCoHoiCSKH,
    data: listCoHoiCSKHData,
    isSuccess: isSuccessListCoHoiCSKHData,
    refetch,
  } = useGetCoHoiCSKHByCoHoiIdQuery({ cohoi_id: coHoiId }, { skip: !coHoiId });

  const handleCreateCoHoiCSKH = () => {
    const payload = {
      co_hoi_id: coHoiId,
      customer_id: customerId,
    };
    createCoHoiCSKH({ payload });
  };

  React.useEffect(() => {
    if (dataCoHoiCSKHNew) {
      toast.success("Thêm cơ hội CSKH thành công!");
      refetch();
    }
  }, [dataCoHoiCSKHNew]);

  return (
    <UI.CKBox overflow="auto">
      {isEdit ? (
        <CoHoiCSKHForm
          id={coHoiCSKHData?.id}
          cohoi_id={coHoiCSKHData?.co_hoi_id}
          coHoiCSKHData={coHoiCSKHData}
          isSuccess={isSuccessListCoHoiCSKHData}
          refetchListCoHoiCSKH={refetch}
          onCancel={() => {
            setIsEdit(false);
            setCoHoiCSKHData(null);
          }}
        />
      ) : (
        <UI.CardActions sx={{ justifyContent: "flex-start", paddingTop: 0 }}>
          <UI.LoadingButton
            loading={false}
            onClick={handleCreateCoHoiCSKH}
            endIcon={<FaSave />}
            variant="outlined"
            size="small"
          >
            {"Thêm cơ hội CSKH"}
          </UI.LoadingButton>
        </UI.CardActions>
      )}
      <CoHoiCSKHList
        listCoHoiCSKHData={listCoHoiCSKHData || []}
        isLoadingListCoHoiCSKH={
          isLoadingListCoHoiCSKH || isFetchingListCoHoiCSKH
        }
        refetchListCoHoiCSKH={refetch}
        onEditCoHoiCSKH={async (data) => {
          setIsEdit(true);
          setCoHoiCSKHData(data);
        }}
      />
    </UI.CKBox>
  );
}

export default GhiChuForm;
