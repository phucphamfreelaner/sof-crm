import React, { useEffect } from "react";
import LichHenForm from "@/container/LichHenNew";
import { useParams } from "react-router-dom";

import DetailInfo from "@/components/DetailInfo";
import BasicDetails from "@/components/BasicDetails";
import { useGetLichHenByIdQuery } from "@/store/lichHen";
import { useGetKhachHangByIdQuery } from "@/store/khachHang";

function Info() {
  const params = useParams();
  const { data, isSuccess } = useGetLichHenByIdQuery(
    {
      id: params?.id,
    },
    { refetchOnMountOrArgChange: true }
  );

  const { data: khachHangData, isSuccess: isSuccessKhachHang } =
    useGetKhachHangByIdQuery({ id: data?.customer_id }, { skip: !data });

  return (
    <LichHenForm
      id={params?.id}
      lichHenData={data}
      khachHangLabel={khachHangData?.contact || ""}
      isSuccess={isSuccess && isSuccessKhachHang}
    />
  );
}

export default Info;
