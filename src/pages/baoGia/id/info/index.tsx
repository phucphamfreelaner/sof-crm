import React from "react";
import * as UI from "@/libs/ui";
import BaoGiaNew from "@/container/BaoGiaNew";
import { useParams } from "react-router-dom";
import { useGetBaoGiaByIdQuery } from "@/store/baoGia";

import { useGetCoHoiByIdQuery } from "@/store/coHoi";
import { useGetLoaiBaoGiaByKeyQuery } from "@/store/loaiBaoGia";
import { useGetNgonNguByCodeQuery } from "@/store/ngonNgu";
import { useGetLoaiTienByKeyQuery } from "@/store/loaiTien";

function Info() {
  const params = useParams();
  const { data: baoGiaData, isSuccess: isSuccessBaoGia } =
    useGetBaoGiaByIdQuery(
      { id: params?.id },
      { skip: !params?.id, refetchOnMountOrArgChange: true }
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

  return (
    <UI.Card>
      <BaoGiaNew
        id={params?.id}
        coHoiLabel={coHoiData?.name}
        baoGiaData={baoGiaData}
        loaiBaoGiaLabel={loaiBaoGiaData?.name}
        ngonNguLabel={ngonNguData?.ten}
        loaiTienLabel={loaiTienData?.name}
        isSuccess={
          isSuccessBaoGia &&
          isSuccessCoHoi &&
          isSuccessLoaiBaoGia &&
          isSuccessNgonNgu &&
          isSuccessLoaiTien
        }
      />
    </UI.Card>
  );
}

export default Info;
