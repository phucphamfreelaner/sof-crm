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
          title="Thông tin báo giá"
          data={baoGiaData}
          labelWidth="120px"
          rows={[
            {
              property: "code",
              label: "Code",
            },
            {
              property: "dieukhoan",
              label: "Điều khoản",
            },
            {
              property: "note",
              label: "Ghi chú",
            },
            {
              property: "name",
              label: "Cơ hội",
            },
            {
              property: "company_id",
              label: "Công ty",
              getRowData: (id: string) =>
                getCongTyById({ id })
                  .unwrap()
                  .then((res) => res?.ten),
            },
            {
              property: "loai_bao_gia_key",
              label: "Loại báo giá",
              getRowData: (value: string) =>
                getLoaiBaoBiaByKey({ value })
                  .unwrap()
                  .then((res) => res?.name),
            },
            {
              property: "ngon_ngu_key",
              label: "Ngôn ngữ",
              getRowData: (code: string) =>
                getNgonNguByCode({ code })
                  .unwrap()
                  .then((res) => res?.ten),
            },
            {
              property: "loai_tien_key",
              label: "Loại tiền",
              getRowData: (value: string) =>
                getLoaiTienByKey({ value })
                  .unwrap()
                  .then((res) => res?.name),
            },
            {
              property: "template_id",
              label: "Mẫu",
              getRowData: (id: string) =>
                getMauInById({ id })
                  .unwrap()
                  .then((res) => res?.tieu_de),
            },
            {
              property: "san_pham",
              label: "Sản phẩm",
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
                        headerName: "Tên sản phẩm",
                        width: 200,
                      },
                      {
                        field: "chat_lieu_key",
                        headerName: "Chất liệu",
                        width: 200,
                      },
                      {
                        field: "don_vi_key",
                        headerName: "Đơn vị tính",
                        width: 100,
                      },
                      {
                        field: "so_luong",
                        headerName: "Số lượng",
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
