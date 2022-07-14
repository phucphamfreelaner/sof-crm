import React from "react";
import * as UI from "@/libs/ui";
import BaoGiaNew from "@/container/BaoGiaNew";
import { useParams } from "react-router-dom";
import { useGetBaoGiaByIdQuery } from "@/store/baoGia";

import { useGetCongTyByIdQuery } from "@/store/congTy";

function Info() {
  const params = useParams();
  const { data: baoGiaData, isSuccess: isSuccessBaoGia } =
    useGetBaoGiaByIdQuery({ id: params?.id }, { skip: !params?.id });

  const { data: congTyData, isSuccess: isSuccessCongTy } =
    useGetCongTyByIdQuery(
      { id: baoGiaData?.company_id },
      { skip: !baoGiaData?.company_id }
    );

  console.log("🚀 ~ data", congTyData);

  return (
    <UI.Card>
      <BaoGiaNew
        id={params?.id}
        congTyLabel={congTyData?.ten}
        baoGiaData={baoGiaData}
        isSuccess={isSuccessBaoGia && isSuccessCongTy}
      />
    </UI.Card>
  );
}

export default Info;
