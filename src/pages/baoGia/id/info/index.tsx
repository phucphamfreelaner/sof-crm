import React from "react";
import { isEmpty } from "lodash-es";
import { useBoolean } from "ahooks";
import { useNavigate, useParams } from "react-router-dom";

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

import * as UI from "@/libs/ui";
import BaoGiaForm from "@/container/BaoGiaNew";
import DetailInfo from "@/components/DetailInfo";
import BasicDetails from "@/components/BasicDetails";
import ProductTableDense from "@/components/ProductTableDense";
import BaseDetail from "@/container/BaseDetailContainer";
import RichText from "@/components/RichText";

function Info() {
  const params = useParams();
  const [isEdit, setEdit] = useBoolean(false);

  const {
    data: baoGiaData,
    isSuccess: isSuccessBaoGia,
    isLoading: isLoadingBaoGia,
  } = useGetBaoGiaByIdQuery(
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
  const navigate = useNavigate();

  const breadcrumbs = [
    <UI.Typography
      sx={{ cursor: "pointer", fontWeight: 600 }}
      variant="body1"
      key="1"
      color="inherit"
      onClick={() => navigate("/bao_gia")}
    >
      Báo giá
    </UI.Typography>,
    <UI.Typography
      sx={{ cursor: "pointer", fontWeight: 600 }}
      variant="body1"
      key="3"
      color="text.primary"
    >
      {coHoiData?.name}
    </UI.Typography>,
  ];

  return (
    <BaseDetail
      id={coHoiData?.id}
      customerId={coHoiData?.customer_id}
      isLoading={isLoadingBaoGia}
      isEdit={isEdit}
      openEdit={setEdit.setTrue}
      closeEdit={setEdit.setFalse}
      headerTitle="Cơ hội"
      headerBreadcrumbs={breadcrumbs}
      detailContent={
        <DetailInfo
          isOpen={isEdit}
          editContent={
            <UI.CKBox p="26px">
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
            </UI.CKBox>
          }
          detailContent={
            <BasicDetails
              sx={{ padding: "20px" }}
              gap="20px"
              data={baoGiaData}
              labelWidth="120px"
              templateColumns="repeat(2, 1fr)"
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
                  property: "name",
                  label: "Cơ hội",
                },
                {
                  property: "company_id",
                  label: "Công ty",
                  type: "render-async",
                  getRowData: (id: string) =>
                    getCongTyById({ id })
                      .unwrap()
                      .then((res) => res?.ten),
                },
                {
                  property: "loai_bao_gia_key",
                  label: "Loại báo giá",
                  type: "render-async",
                  getRowData: (value: string) =>
                    getLoaiBaoBiaByKey({ value })
                      .unwrap()
                      .then((res) => res?.name),
                },
                {
                  property: "ngon_ngu_key",
                  label: "Ngôn ngữ",
                  type: "render-async",
                  getRowData: (code: string) =>
                    getNgonNguByCode({ code })
                      .unwrap()
                      .then((res) => res?.ten),
                },
                {
                  property: "loai_tien_key",
                  label: "Loại tiền",
                  type: "render-async",
                  getRowData: (value: string) =>
                    getLoaiTienByKey({ value })
                      .unwrap()
                      .then((res) => res?.name),
                },
                {
                  property: "template_id",
                  label: "Mẫu",
                  type: "render-async",
                  getRowData: (id: string) =>
                    getMauInById({ id })
                      .unwrap()
                      .then((res) => res?.tieu_de),
                },
                {
                  property: "san_pham",
                  label: "Sản phẩm",
                  hiddenLabel: true,
                  colSpan: 2,
                  type: "render",
                  renderRow: (value: any) => {
                    return isEmpty(value) ? (
                      <UI.Skeleton width="100%" />
                    ) : (
                      <ProductTableDense value={value} />
                    );
                  },
                },
                {
                  property: "note",
                  label: "Ghi chú",
                  colSpan: 2,
                  type: "render",
                  hiddenLabel: true,
                  renderRow: (data) => {
                    return (
                      <RichText
                        defaultValue={data}
                        label="Ghi chú báo giá"
                        height={200}
                        sx={{ marginTop: "20px" }}
                      />
                    );
                  },
                },
              ]}
            />
          }
        />
      }
    />
  );
}

export default Info;
