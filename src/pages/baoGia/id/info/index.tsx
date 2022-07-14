import React from "react";
import * as UI from "@/libs/ui";
import BaoGiaNew from "@/container/BaoGiaNew";
import { useParams } from "react-router-dom";
import { useGetBaoGiaByIdQuery } from "@/store/baoGia";

import { useGetCongTyByIdQuery } from "@/store/congTy";
import { useGetCoHoiByIdQuery } from "@/store/coHoi";
import { useGetLoaiBaoGiaByKeyQuery } from "@/store/loaiBaoGia";
import { useGetNgonNguByCodeQuery } from "@/store/ngonNgu";
import { useGetLoaiTienByKeyQuery } from "@/store/loaiTien";
import { useGetMauInByIdQuery } from "@/store/mauIn";

function Info() {
  const params = useParams();
  const { data: baoGiaData, isSuccess: isSuccessBaoGia } =
    useGetBaoGiaByIdQuery({ id: params?.id }, { skip: !params?.id });

  const { data: congTyData, isSuccess: isSuccessCongTy } =
    useGetCongTyByIdQuery(
      { id: baoGiaData?.company_id },
      { skip: !baoGiaData }
    );

  const { data: coHoiData, isSuccess: isSuccessCoHoi } = useGetCoHoiByIdQuery(
    { id: baoGiaData?.cohoi_id },
    { skip: !baoGiaData }
  );

  const { data: loaiBaoGiaData, isSuccess: isSuccessLoaiBaoGia } =
    useGetLoaiBaoGiaByKeyQuery(
      { value: baoGiaData?.loai_bao_gia_key || "bao-gia" },
      { skip: !baoGiaData }
    );

  const { data: ngonNguData, isSuccess: isSuccessNgonNgu } =
    useGetNgonNguByCodeQuery(
      { code: baoGiaData?.ngon_ngu_key },
      { skip: !baoGiaData }
    );

  const { data: loaiTienData, isSuccess: isSuccessLoaiTien } =
    useGetLoaiTienByKeyQuery(
      { value: baoGiaData?.loai_tien_key || "vnd" },
      { skip: !baoGiaData }
    );

  const { data: mauInData, isSuccess: isSuccessMauIn } = useGetMauInByIdQuery(
    { id: baoGiaData?.template_id },
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
        ngonNguLabel={ngonNguData?.ten}
        loaiTienLabel={loaiTienData?.name}
        mauInLabel={mauInData?.tieu_de}
        isSuccess={
          isSuccessBaoGia &&
          isSuccessCongTy &&
          isSuccessCoHoi &&
          isSuccessLoaiBaoGia &&
          isSuccessNgonNgu &&
          isSuccessLoaiTien &&
          isSuccessMauIn
        }
      />
    </UI.Card>
  );
}

export default Info;
