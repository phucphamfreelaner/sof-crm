import React, { useState, useEffect } from "react";
import * as UI from "@/libs/ui";
import { useBoolean } from "ahooks";
import { format, isValid } from "date-fns";
import numeral from "numeral";
import { isEmpty, isNumber, uniqueId } from "lodash-es";

import { useParams, useNavigate } from "react-router-dom";
import { useGetHopDongByIdQuery } from "@/store/hopDong";
import { useGetNgonNguByCodeQuery } from "@/store/ngonNgu";
import { useGetLoaiTienByKeyQuery } from "@/store/loaiTien";
import {
  useLazyGetNhanVienByIdQuery,
  useSearchNhanVienByCodeQuery,
} from "@/store/nhanVien";
import {
  useGetLoaiHdByIdQuery,
  useSearchBenHdByIdQuery,
  useLazyGetLoaiHdByCodeQuery,
} from "@/store/loaiHd";
import { useGetMauInByIdQuery } from "@/store/mauIn";
import { useLazyGetKhachHangByIdQuery } from "@/store/khachHang";
import { useLazyGetSanPhamByIdQuery } from "@/store/sanPham";

import BaseDetail from "@/container/BaseDetailContainer";
import BasicDetails from "@/components/BasicDetails";
import RichText from "@/components/RichText";
import HopDongFormContainer from "@/container/HopDongNew";

import { FiExternalLink } from "react-icons/fi";
import {
  AiOutlineCheckSquare,
  AiOutlineBorder,
  AiOutlineMail,
  AiOutlineMessage,
} from "react-icons/ai";
import { openModalBottom } from "@/store/modal";
import { useAppDispatch } from "@/store";
import DetailInfo from "@/components/DetailInfo";
import BaseTableDense from "@/components/BaseTableDense";
import {
  CurrencyType,
  ProductName,
  UnitName,
} from "@/components/TableCellRender";
import ProductTableDense from "@/components/ProductTableDense";

function Info() {
  const params = useParams();
  const navigate = useNavigate();
  const {
    data: hopDongData,
    isLoading: isLoadingHopDong,
    isSuccess: isSuccessHopDong,
  } = useGetHopDongByIdQuery(
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSuccess(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const [isSuccess, setIsSuccess] = useState<boolean>(
    isSuccessNhanVien &&
      isSuccessNgonNgu &&
      isSuccessLoaiTien &&
      isSuccessHopDong &&
      isSuccessLoaiHd &&
      isSuccessMauIn &&
      isSuccessBenHd
  );

  useEffect(() => {
    setIsSuccess(
      isSuccessNhanVien &&
        isSuccessNgonNgu &&
        isSuccessLoaiTien &&
        isSuccessHopDong &&
        isSuccessLoaiHd &&
        isSuccessMauIn &&
        isSuccessBenHd
    );
  }, [
    isSuccessNhanVien,
    isSuccessNgonNgu,
    isSuccessLoaiTien,
    isSuccessHopDong,
    isSuccessLoaiHd,
    isSuccessMauIn,
    isSuccessBenHd,
  ]);

  const breadcrumbs = [
    <UI.Typography
      sx={{ cursor: "pointer", fontWeight: 600 }}
      variant="body1"
      key="1"
      color="inherit"
      onClick={() => navigate("/hop_dong")}
    >
      Hợp đồng
    </UI.Typography>,
    <UI.Typography
      sx={{ cursor: "pointer", fontWeight: 600 }}
      variant="body1"
      key="3"
      color="text.primary"
    >
      {hopDongData?.name}
    </UI.Typography>,
  ];

  const [isEdit, setEdit] = useBoolean(false);
  const [getKhachHangById] = useLazyGetKhachHangByIdQuery();
  const [getNhanVienById] = useLazyGetNhanVienByIdQuery();
  const [getLoaiHopDongByCode] = useLazyGetLoaiHdByCodeQuery();
  const [getSanPhamById] = useLazyGetSanPhamByIdQuery();

  const dispatch = useAppDispatch();

  return (
    <BaseDetail
      id={hopDongData?.id}
      customerId={hopDongData?.customer_id}
      isLoading={isLoadingHopDong}
      isEdit={isEdit}
      openEdit={setEdit.setTrue}
      closeEdit={setEdit.setFalse}
      headerTitle="Hợp đồng"
      headerBreadcrumbs={breadcrumbs}
      actionMenus={[
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
                  customerId: hopDongData?.customer_id,
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
                  customerId: hopDongData?.customer_id,
                },
              })
            );
          },
        },
      ]}
      detailContent={
        <DetailInfo
          isOpen={isEdit}
          detailContent={
            <BasicDetails
              sx={{ padding: "20px" }}
              gap="20px"
              data={hopDongData}
              labelWidth="120px"
              templateColumns="repeat(2, 1fr)"
              rows={[
                {
                  property: "code",
                  label: "Mã hợp đồng",
                },
                {
                  property: "name",
                  label: "Tiêu đề",
                },
                {
                  property: "loai_hd_key",
                  label: "Loại hợp đồng",
                  type: "render-async",
                  getRowData: (code) =>
                    getLoaiHopDongByCode({ code })
                      .unwrap()
                      .then((res) => res || code),
                  renderRow: (value) => {
                    return (
                      <UI.Typography variant="body2">
                        {value?.name}
                      </UI.Typography>
                    );
                  },
                },
                {
                  property: "customer_id",
                  label: "Khách hàng",
                  type: "render-async",
                  getRowData: (id) =>
                    getKhachHangById({ id })
                      .unwrap()
                      .then((res) => res || id),
                  renderRow: (value) => {
                    return (
                      <UI.Link
                        href={`/app/crm/khach_hang/${value?.id}`}
                        variant="body2"
                        target="_blank"
                      >
                        {value?.contact} <FiExternalLink />
                      </UI.Link>
                    );
                  },
                },
                {
                  property: "phone",
                  label: "Số điện thoại",
                },
                {
                  property: "so_tien_con_lai",
                  label: "Số tiền còn lại",
                  type: "render",
                  renderRow: (value) => {
                    return isNumber(value) ? (
                      <UI.Typography variant="body2">
                        {numeral(value).format("0,0")} VNĐ
                      </UI.Typography>
                    ) : (
                      value
                    );
                  },
                },
                {
                  property: "so_tien_da_thu",
                  label: "Số tiền đã thu",
                  type: "render",
                  renderRow: (value) => {
                    return isNumber(value) ? (
                      <UI.Typography variant="body2">
                        {numeral(value).format("0,0")} VNĐ
                      </UI.Typography>
                    ) : (
                      value
                    );
                  },
                },
                {
                  property: "tong_tien_locate",
                  label: "Số tiền hàng",
                  type: "render",
                  renderRow: (value) => {
                    return isNumber(value) ? (
                      <UI.Typography variant="body2">
                        {numeral(value).format("0,0")} VNĐ
                      </UI.Typography>
                    ) : (
                      value
                    );
                  },
                },
                {
                  property: "vat",
                  label: "VAT",
                  type: "render",
                  renderRow: (value) => {
                    return value ? (
                      <AiOutlineCheckSquare size="18px" />
                    ) : (
                      <AiOutlineBorder size="18px" />
                    );
                  },
                },
                {
                  property: "created_by",
                  label: "Nhân viên",
                  type: "render-async",
                  getRowData: (id) =>
                    getNhanVienById({ id })
                      .unwrap()
                      .then((res) => res || id),
                  renderRow: (value) => {
                    return (
                      <UI.Link
                        href={`/app/crm/nhan_vien/${value?.id}`}
                        variant="body2"
                        target="_blank"
                      >
                        {value?.name} <FiExternalLink />
                      </UI.Link>
                    );
                  },
                },
                {
                  property: "created_at",
                  label: "Ngày tạo",
                  type: "render",
                  renderRow: (value) => {
                    return isValid(new Date(value)) ? (
                      <UI.Typography variant="body2">
                        {format(new Date(value), "dd-MM-yyyy HH:mm")}
                      </UI.Typography>
                    ) : (
                      value
                    );
                  },
                },
                {
                  property: "created_at",
                  label: "Ngày kí",
                  type: "render",
                  renderRow: (value) => {
                    return isValid(new Date(value)) ? (
                      <UI.Typography variant="body2">
                        {format(new Date(value), "dd-MM-yyyy HH:mm")}
                      </UI.Typography>
                    ) : (
                      value
                    );
                  },
                },
                {
                  property: "san_pham",
                  label: "Sản phẩm",
                  hiddenLabel: true,
                  colSpan: 2,
                  type: "render",
                  renderRow: (value: any) => {
                    return isEmpty(value) ? (
                      <div>Loading...</div>
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
                        label="Ghi chú hợp đồng"
                        height={200}
                        sx={{ marginTop: "20px" }}
                      />
                    );
                  },
                },
              ]}
            />
          }
          editContent={
            <UI.CKBox p="26px">
              <HopDongFormContainer
                id={params?.id}
                hopDongData={hopDongData}
                ngonNguLabel={ngonNguData?.ten}
                loaiTienLabel={loaiTienData?.name}
                loaiHdLabel={loaiHdData?.[hopDongData?.loai_hd_key]}
                benHdLabel={benHdData?.[hopDongData?.chiphivanchuyen]}
                nhanVienLabel={nhanVienData?.name ? nhanVienData?.name : ""}
                mauInLabel={mauInData?.tieu_de}
                isEdit={true}
                isSuccess={isSuccess}
              />
            </UI.CKBox>
          }
        />
      }
    />
  );
}

export default Info;
