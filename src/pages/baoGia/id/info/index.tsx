import React from "react";
import * as UI from "@/libs/ui";
import BaoGiaNew from "@/container/BaoGiaNew";
import { useParams } from "react-router-dom";
import { useGetBaoGiaByIdQuery } from "@/store/baoGia";

import { useGetCongTyByIdQuery } from "@/store/congTy";
import { useGetCoHoiByIdQuery } from "@/store/coHoi";
import { useGetLoaiBaoGiaByKeyQuery } from "@/store/loaiBaoGia";

function Info() {
  const params = useParams();
  const { data: baoGiaData, isSuccess: isSuccessBaoGia } =
    useGetBaoGiaByIdQuery({ id: params?.id }, { skip: !params?.id });

  const { data: congTyData, isSuccess: isSuccessCongTy } =
    useGetCongTyByIdQuery(
      { id: baoGiaData?.company_id },
      { skip: !baoGiaData?.company_id }
    );

  const { data: coHoiData, isSuccess: isSuccessCoHoi } = useGetCoHoiByIdQuery(
    { id: baoGiaData?.cohoi_id },
    { skip: !baoGiaData?.cohoi_id }
  );

  const { data: loaiBaoGiaData, isSuccess: isSuccessLoaiBaoGia } =
    useGetLoaiBaoGiaByKeyQuery(
      { value: baoGiaData?.loai_bao_gia_key || "bao-gia" },
      { skip: !baoGiaData }
    );

  return (
    <UI.Card>
      <BaoGiaNew
        id={params?.id}
        congTyLabel={congTyData?.ten}
        coHoiLabel={coHoiData?.name}
        baoGiaData={baoGiaData}
        loaiBaoGiaLabel={loaiBaoGiaData?.name}
        isSuccess={
          isSuccessBaoGia &&
          isSuccessCongTy &&
          isSuccessCoHoi &&
          isSuccessLoaiBaoGia
        }
      />
    </UI.Card>
  );
}

export default Info;
