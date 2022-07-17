import React from "react";
import * as UI from "@/libs/ui";
import { useParams } from "react-router-dom";
import { useGetHopDongByIdQuery } from "@/store/hopDong";

import { useGetNgonNguByCodeQuery } from "@/store/ngonNgu";
import { useGetLoaiTienByKeyQuery } from "@/store/loaiTien";
import HopDongFormContainer from "@/container/HopDongNew";
import { useSearchNhanVienByCodeQuery } from "@/store/nhanVien";
import { useGetLoaiHdByIdQuery, useSearchBenHdByIdQuery } from "@/store/loaiHd";
import { useGetMauInByIdQuery } from "@/store/mauIn";

function Info() {
  const params = useParams();
  const { data: hopDongData, isSuccess: isSuccessHopDong } =
    useGetHopDongByIdQuery(
      { id: params?.id },
      { skip: !params?.id, refetchOnMountOrArgChange: true }
    );

  const { data: ngonNguData, isSuccess: isSuccessNgonNgu } =
    useGetNgonNguByCodeQuery(
      { code: hopDongData?.ngon_ngu_key },
      { skip: !hopDongData }
    );

  const { data: loaiTienData, isSuccess: isSuccessLoaiTien } =
    useGetLoaiTienByKeyQuery(
      { value: hopDongData?.loai_tien_key || "vnd" },
      { skip: !hopDongData }
    );

  const { data: nhanVienData, isSuccess: isSuccessNhanVien } =
    useSearchNhanVienByCodeQuery(
      { id: hopDongData?.dai_dien_id },
      { skip: !hopDongData }
    );

  const { data: loaiHdData, isSuccess: isSuccessLoaiHd } =
    useGetLoaiHdByIdQuery({ name: "" }, { skip: !hopDongData });

  const { data: mauInData, isSuccess: isSuccessMauIn } = useGetMauInByIdQuery(
    { id: hopDongData?.template_id || 1 },
    { skip: !hopDongData }
  );

  const { data: benHdData, isSuccess: isSuccessBenHd } =
    useSearchBenHdByIdQuery({ name: "" }, { skip: !hopDongData });

  return (
    <UI.Card>
      <HopDongFormContainer
        id={params?.id}
        hopDongData={hopDongData}
        ngonNguLabel={ngonNguData?.ten}
        loaiTienLabel={loaiTienData?.name}
        loaiHdLabel={loaiHdData?.[hopDongData?.loai_hd_key]}
        benHdLabel={benHdData?.[hopDongData?.chiphivanchuyen]}
        nhanVienLabel={nhanVienData?.name}
        mauInLabel={mauInData?.tieu_de}
        isSuccess={
          isSuccessNhanVien &&
          isSuccessNgonNgu &&
          isSuccessLoaiTien &&
          isSuccessHopDong &&
          isSuccessLoaiHd &&
          isSuccessMauIn &&
          isSuccessBenHd
        }
      />
    </UI.Card>
  );
}

export default Info;
