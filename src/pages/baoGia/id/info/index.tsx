import React from "react";
import BaoGiaForm from "@/container/BaoGiaNew";
import { useParams } from "react-router-dom";
import { useGetBaoGiaByIdQuery } from "@/store/baoGia";

import { useGetCoHoiByIdQuery } from "@/store/coHoi";
import {
  useGetLoaiBaoGiaByKeyQuery,
  useLazyGetLoaiBaoGiaByKeyQuery,
} from "@/store/loaiBaoGia";
import {
  useGetNgonNguByCodeQuery,
  useLazyGetNgonNguByCodeQuery,
} from "@/store/ngonNgu";
import {
  useGetLoaiTienByKeyQuery,
  useLazyGetLoaiTienByKeyQuery,
} from "@/store/loaiTien";
import { useLazyGetCongTyByIdQuery } from "@/store/congTy";
import { useLazyGetMauInByIdQuery } from "@/store/mauIn";

import DetailInfo from "@/components/DetailInfo";
import BasicDetails from "@/components/BasicDetails";
import BaseTableDense from "@/components/BaseTableDense";
import { isEmpty } from "lodash-es";

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

  const [getCongTyById] = useLazyGetCongTyByIdQuery();
  const [getLoaiBaoBiaByKey] = useLazyGetLoaiBaoGiaByKeyQuery();
  const [getNgonNguByCode] = useLazyGetNgonNguByCodeQuery();
  const [getLoaiTienByKey] = useLazyGetLoaiTienByKeyQuery();
  const [getMauInById] = useLazyGetMauInByIdQuery();

  return (
    <DetailInfo
      title={baoGiaData?.name}
      id={params?.id}
      detailContent={
        <BasicDetails
          width="90%"
          title="Th??ng tin b??o gi??"
          data={baoGiaData}
          labelWidth="120px"
          rows={[
            {
              property: "code",
              label: "Code",
            },
            {
              property: "dieukhoan",
              label: "??i???u kho???n",
            },
            {
              property: "note",
              label: "Ghi ch??",
            },
            {
              property: "name",
              label: "C?? h???i",
            },
            {
              property: "company_id",
              label: "C??ng ty",
              getRowData: (id: string) =>
                getCongTyById({ id })
                  .unwrap()
                  .then((res) => res?.ten),
            },
            {
              property: "loai_bao_gia_key",
              label: "Lo???i b??o gi??",
              getRowData: (value: string) =>
                getLoaiBaoBiaByKey({ value })
                  .unwrap()
                  .then((res) => res?.name),
            },
            {
              property: "ngon_ngu_key",
              label: "Ng??n ng???",
              getRowData: (code: string) =>
                getNgonNguByCode({ code })
                  .unwrap()
                  .then((res) => res?.ten),
            },
            {
              property: "loai_tien_key",
              label: "Lo???i ti???n",
              getRowData: (value: string) =>
                getLoaiTienByKey({ value })
                  .unwrap()
                  .then((res) => res?.name),
            },
            {
              property: "template_id",
              label: "M???u",
              getRowData: (id: string) =>
                getMauInById({ id })
                  .unwrap()
                  .then((res) => res?.tieu_de),
            },
            {
              property: "san_pham",
              label: "S???n ph???m",
              renderRow: (value: any) => {
                return isEmpty(value) ? (
                  <div>Loading...</div>
                ) : (
                  <BaseTableDense
                    rows={value}
                    columns={[
                      {
                        field: "id",
                        headerName: "ID",
                        width: 100,
                      },
                      {
                        field: "product_id",
                        headerName: "T??n s???n ph???m",
                        width: 200,
                      },
                      {
                        field: "chat_lieu_key",
                        headerName: "Ch???t li???u",
                        width: 200,
                      },
                      {
                        field: "don_vi_key",
                        headerName: "????n v??? t??nh",
                        width: 100,
                      },
                      {
                        field: "so_luong",
                        headerName: "S??? l?????ng",
                        width: 100,
                      },
                    ]}
                  />
                );
              },
            },
          ]}
        />
      }
      editContent={
        <BaoGiaForm
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
      }
    />
  );
}

export default Info;
