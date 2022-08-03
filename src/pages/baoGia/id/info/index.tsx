import React from "react";
import { isEmpty } from "lodash-es";
import { useBoolean } from "ahooks";
import { useNavigate, useParams } from "react-router-dom";

import { useGetBaoGiaByIdQuery, useGetViewBaoGiaQuery } from "@/store/baoGia";
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
import numeral from "numeral";

import { useAppDispatch } from "@/store";
import {
  AiOutlineFolderAdd,
  AiOutlineMail,
  AiOutlineMessage,
} from "react-icons/ai";
import { uniqueId } from "lodash-es";
import { openModalBottom } from "@/store/modal";
import {
  useCreateCoHoiCSKHMutation,
  useGetCoHoiCSKHByCoHoiIdQuery,
} from "@/store/coHoiCSKH";
import {
  useCreateNhiemVuMutation,
  useGetNhiemVuCohoiQuery,
  usePutNhiemVuByIdMutation,
} from "@/store/nhiemVu";

function Info() {
  const params = useParams();
  const [isEdit, setEdit] = useBoolean(false);
  const dispatch = useAppDispatch();

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

  const { data: fileViewBaoGia } = useGetViewBaoGiaQuery(
    { id: baoGiaData?.id },
    { skip: !baoGiaData?.id }
  );

  const [createCoHoiCSKH, { isLoading: isLoadingCreateNote }] =
    useCreateCoHoiCSKHMutation();

  const {
    isLoading: isLoadingNote,
    isFetching: isFetchingNote,
    data: dataNote,
    refetch: reloadListNote,
  } = useGetCoHoiCSKHByCoHoiIdQuery(
    { cohoi_id: baoGiaData?.cohoi_id },
    { skip: !baoGiaData?.cohoi_id }
  );

  const {
    isLoading: isLoadingNhiemVu,
    isFetching: isFetchingNhiemVu,
    data: dataNhiemVu,
    refetch: reloadNhiemVu,
  } = useGetNhiemVuCohoiQuery(
    { cohoi_id: baoGiaData?.cohoi_id },
    { skip: !baoGiaData?.cohoi_id }
  );

  const [createNhiemVu, { isLoading: isLoadingCreateNhiemVu }] =
    useCreateNhiemVuMutation();

  const [updateNhiemVu, { isLoading: isLoadingUpdateNhiemVu }] =
    usePutNhiemVuByIdMutation();

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
      onClickCalendar={() => navigate("/calendar?object[0]=bao_gia")}
      actionMenus={[
        // {
        //   icon: <AiOutlineSave />,
        //   label: "Lưu trữ",
        //   onClick: () => {
        //     console.log("data");
        //   },
        // },
        {
          icon: <AiOutlineFolderAdd />,
          label: "Thêm mới",
          onClick: () => {
            const id = uniqueId();
            dispatch(
              openModalBottom({
                data: {
                  title: "Thêm báo giá mới",
                  height: "1000px",
                  width: "1500px",
                  id: `bao-gia-${id}`,
                  type: "bao-gia-new",
                  customerId: coHoiData?.customer_id,
                },
              })
            );
          },
        },
        {
          icon: <AiOutlineMail />,
          label: "Gửi email",
          onClick: () => {
            const id = uniqueId();
            dispatch(
              openModalBottom({
                data: {
                  title: "Gửi email",
                  height: "800px",
                  width: "500px",
                  id: `email-${id}`,
                  type: "email-new",
                  recordId: baoGiaData?.id,
                  objectId: "bao-gia",
                  isUploadFile: true,
                  file: fileViewBaoGia,
                },
              })
            );
          },
        },
        {
          icon: <AiOutlineMessage />,
          label: "Gửi SMS",
          onClick: () => {
            const id = uniqueId();
            dispatch(
              openModalBottom({
                data: {
                  title: "Gửi sms",
                  height: "620px",
                  width: "500px",
                  id: `gui-sms-${id}`,
                  type: "sms-new",
                  recordId: baoGiaData?.id,
                  objectId: "bao-gia",
                },
              })
            );
          },
        },
      ]}
      detailContent={
        <DetailInfo
          isOpen={isEdit}
          editContent={
            <UI.CKBox p="26px">
              <BaoGiaForm
                size="small"
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
              gap="16px"
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
                  property: "san_pham",
                  label: "TỔNG GIÁ TRỊ SẢN PHẨM",
                  labelWidth: "250px",
                  valueWidth: "200px",
                  type: "render",
                  align: "right",
                  colSpan: 1,
                  colStart: 2,
                  renderRow: (value) => {
                    const total = (value as any[])?.reduce((total, x) => {
                      return total + x?.thanh_tien;
                    }, 0);
                    return numeral(total).format("0,0");
                  },
                },
                {
                  property: "ty_gia",
                  label: "TỶ GIÁ (QUỐC GIA)",
                  align: "right",
                  labelWidth: "250px",
                  valueWidth: "200px",
                  type: "render",
                  colSpan: 1,
                  colStart: 2,
                  renderRow: (value) => {
                    return numeral(value).format("0,0") + " VND";
                  },
                },
                {
                  property: "san_pham",
                  label: "TỔNG GIÁ TRỊ SẢN PHẨM (VND)",
                  labelWidth: "250px",
                  valueWidth: "200px",
                  align: "right",
                  type: "render",
                  colSpan: 1,
                  colStart: 2,
                  renderRow: (value, data) => {
                    const total =
                      (value as any[])?.reduce((total, x) => {
                        return total + x?.thanh_tien;
                      }, 0) * data?.ty_gia;
                    return numeral(total).format("0,0") + " VND";
                  },
                },
                {
                  property: "san_pham",
                  label: "PHÍ DỊCH VỤ (3%)",
                  labelWidth: "250px",
                  valueWidth: "200px",
                  align: "right",
                  type: "render",
                  colSpan: 1,
                  colStart: 2,
                  renderRow: (value, data) => {
                    const total =
                      (value as any[])?.reduce((total, x) => {
                        return total + x?.thanh_tien;
                      }, 0) *
                      data?.ty_gia *
                      0.03;
                    return numeral(total).format("0,0") + " VND";
                  },
                },
                {
                  property: "phu_thu",
                  label: "PHỤ THU",
                  labelWidth: "250px",
                  valueWidth: "200px",
                  align: "right",
                  type: "render",
                  colSpan: 1,
                  colStart: 2,
                  renderRow: (value) => {
                    return numeral(value).format("0,0") + " VND";
                  },
                },
                {
                  property: "tong_tien",
                  label: "TỔNG ĐƠN HÀNG",
                  labelWidth: "250px",
                  valueWidth: "200px",
                  align: "right",
                  type: "render",
                  colSpan: 1,
                  colStart: 2,
                  renderRow: (value) => {
                    return numeral(value).format("0,0") + " VND";
                  },
                },
                {
                  property: "datcoc",
                  label: "ĐẶT CỌC (80-100%)",
                  labelWidth: "250px",
                  valueWidth: "200px",
                  align: "right",
                  type: "render",
                  colSpan: 1,
                  colStart: 2,
                  renderRow: (value) => {
                    return value + " %";
                  },
                },
                {
                  property: "tong_tien",
                  label: "CÒN LẠI: TỔNG GIÁ TRỊ",
                  labelWidth: "250px",
                  valueWidth: "200px",
                  align: "right",
                  type: "render",
                  colSpan: 1,
                  colStart: 2,
                  renderRow: (value, data) => {
                    return (
                      numeral(value * ((100 - data.datcoc) / 100)).format(
                        "0,0"
                      ) + " VND"
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
      onCreateNote={(data: any) => createCoHoiCSKH(data).unwrap()}
      onUpdateNote={(data: any) => {}}
      isLoadingNote={isLoadingNote || isFetchingNote || isLoadingCreateNote}
      dataNote={dataNote || []}
      reloadListNote={reloadListNote}
      onCreateMessage={(data: any) => createCoHoiCSKH(data).unwrap()}
      onUpdateMessage={(data: any) => {}}
      isLoadingMessage={isLoadingNote || isFetchingNote || isLoadingCreateNote}
      reloadListMessage={reloadListNote}
      dataMessage={dataNote || []}
      dataTask={dataNhiemVu}
      onCreateTask={(data: any) => createNhiemVu(data).unwrap()}
      onUpdateTask={(data) => updateNhiemVu(data).unwrap()}
      reloadListTask={reloadNhiemVu}
      isLoadingTask={
        isLoadingNhiemVu || isFetchingNhiemVu || isLoadingCreateNhiemVu
      }
    />
  );
}

export default Info;
