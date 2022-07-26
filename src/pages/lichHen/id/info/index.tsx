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
    // <DetailInfo
    //   title={data?.khach_hang?.contact}
    //   id={params?.id}
    //   detailContent={
    //     <BasicDetails
    //       sx={{ width: "90%", padding: "20px" }}
    //       gap="10px"
    //       data={data}
    //       labelWidth="120px"
    //       templateColumns="repeat(2, 1fr)"
    //       rows={[
    //         {
    //           property: "code",
    //           label: "Code",
    //         },
    //       ]}
    //     />
    //   }
    //   editContent={
    //     <LichHenForm
    //       id={params?.id}
    //       lichHenData={data}
    //     />
    //   }
    // />
    <LichHenForm
      id={params?.id}
      lichHenData={data}
      khachHangLabel={khachHangData?.contact || ""}
      isSuccess={isSuccess && isSuccessKhachHang}
    />
  );
}

export default Info;
