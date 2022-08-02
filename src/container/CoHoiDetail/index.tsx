import React from "react";
import BaseDetail from "@/container/BaseDetailContainer";
import { useNavigate } from "react-router-dom";
import * as UI from "@/libs/ui";
import { useBoolean } from "ahooks";
import { uniqueId } from "lodash-es";
import { format, isValid } from "date-fns";
import {
  AiOutlineSave,
  AiOutlineCopy,
  AiOutlineDelete,
  AiOutlineMail,
  AiOutlineMessage,
  AiOutlineFolderAdd,
} from "react-icons/ai";

import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";

import { FiExternalLink } from "react-icons/fi";

import { useAppDispatch } from "@/store";
import { openModalBottom } from "@/store/modal";
import { useLazyGetKhachHangByIdQuery } from "@/store/khachHang";
import { useLazyGetSoLuongByValueQuery } from "@/store/soLuong";
import { useLazyGetTienTrinhByKeyQuery } from "@/store/tienTrinh";
import { useLazyGetTrangThaiByKeyQuery } from "@/store/trangThai";
import { useUpdateCoHoiByIDMutation } from "@/store/coHoi";

import DetailInfo from "@/components/DetailInfo";
import BasicDetails from "@/components/BasicDetails";
import CoHoiNew from "@/container/CoHoiForm";
import RichText from "@/components/RichText";
import { ICoHoi } from "@/types/coHoi";
import {
  useGetCoHoiCSKHByCoHoiIdQuery,
  useCreateCoHoiCSKHMutation,
} from "@/store/coHoiCSKH";

import {
  useCreateNhiemVuMutation,
  useGetNhiemVuCohoiQuery,
  usePutNhiemVuByIdMutation,
} from "@/store/nhiemVu";

interface ICoHoiDetail {
  coHoiData: ICoHoi;
  isLoadingCoHoi: boolean;
  reloadCoHoi: () => any;
}

export default function CoHoiDetail(props: ICoHoiDetail) {
  const navigate = useNavigate();
  const { coHoiData, isLoadingCoHoi, reloadCoHoi } = props;
  const [isEdit, setEdit] = useBoolean(false);
  const dispatch = useAppDispatch();
  const { palette } = UI.useTheme();

  const [updateCoHoi] = useUpdateCoHoiByIDMutation();

  const breadcrumbs = [
    <UI.Typography
      sx={{ cursor: "pointer", fontWeight: 600 }}
      variant="body1"
      key="1"
      color="inherit"
      onClick={() => navigate("/co_hoi")}
    >
      Cơ hội
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

  const [getKhachHangById] = useLazyGetKhachHangByIdQuery();
  const [getSoLuongByValue] = useLazyGetSoLuongByValueQuery();
  const [getTienTrinhByKey] = useLazyGetTienTrinhByKeyQuery();
  const [getTrangThaiByKey] = useLazyGetTrangThaiByKeyQuery();

  const {
    isLoading: isLoadingNote,
    isFetching: isFetchingNote,
    data: dataNote,
    refetch: reloadListNote,
  } = useGetCoHoiCSKHByCoHoiIdQuery(
    { cohoi_id: coHoiData?.id },
    { skip: !coHoiData?.id }
  );

  const [createCoHoiCSKH, { isLoading: isLoadingCreateNote }] =
    useCreateCoHoiCSKHMutation();

  const {
    isLoading: isLoadingNhiemVu,
    isFetching: isFetchingNhiemVu,
    data: dataNhiemVu,
    refetch: reloadNhiemVu,
  } = useGetNhiemVuCohoiQuery(
    { cohoi_id: coHoiData?.id },
    { skip: !coHoiData?.id }
  );

  const [createNhiemVu, { isLoading: isLoadingCreateNhiemVu }] =
    useCreateNhiemVuMutation();

  const [updateNhiemVu, { isLoading: isLoadingUpdateNhiemVu }] =
    usePutNhiemVuByIdMutation();

  return (
    <BaseDetail
      id={coHoiData?.id}
      customerId={coHoiData?.customer_id}
      isLoading={isLoadingCoHoi}
      isEdit={isEdit}
      openEdit={setEdit.setTrue}
      closeEdit={setEdit.setFalse}
      headerTitle="Cơ hội"
      headerBreadcrumbs={breadcrumbs}
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
                  title: "Thêm cơ hội mới",
                  height: "800px",
                  width: "500px",
                  id: `co-hoi-${id}`,
                  type: "co-hoi-new",
                  customerId: coHoiData?.customer_id,
                },
              })
            );
          },
        },
        // {
        //   icon: <AiOutlineCopy />,
        //   label: "Nhân bản",
        //   onClick: () => {
        //     console.log("");
        //   },
        // },
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
                  recordId: coHoiData?.customer_id,
                  objectId: "khach-hang",
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
                  recordId: coHoiData?.customer_id,
                  objectId: "khach-hang",
                },
              })
            );
          },
        },
        // {
        //   icon: <AiOutlineDelete />,
        //   label: "Xóa bỏ",
        //   onClick: () => {
        //     console.log("data");
        //   },
        // },
      ]}
      detailContent={
        <DetailInfo
          isOpen={isEdit}
          detailContent={
            <BasicDetails
              sx={{ p: "26px" }}
              gap="16px"
              data={coHoiData}
              labelWidth="120px"
              templateColumns="repeat(2, 1fr)"
              rows={[
                {
                  property: "name",
                  label: "Tên cơ hội",
                },
                {
                  property: "code",
                  label: "Code",
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
                  property: "soluong",
                  label: "Số lượng",
                  type: "render-async",
                  getRowData: (name) =>
                    getSoLuongByValue({ name })
                      .unwrap()
                      .then((res) => res?.name)
                      .catch(() => name),
                },
                {
                  property: "tien_trinh_key",
                  label: "Tiến trình",
                  type: "render-async",
                  getRowData: (key) =>
                    getTienTrinhByKey({ key })
                      .unwrap()
                      .then((res) => res?.name)
                      .catch(() => key),
                },
                {
                  property: "trang_thai_key",
                  label: "Trạng thái",
                  type: "render-async",
                  getRowData: (key) =>
                    getTrangThaiByKey({ key })
                      .unwrap()
                      .then((res) => res?.name)
                      .catch(() => key),
                },
                {
                  property: "da_cham_soc",
                  label: "Chăm sóc",
                  type: "render",
                  renderRow: (value) => {
                    return (
                      <UI.HStack>
                        {Boolean(+value) ? (
                          <MdOutlineCheckBox
                            size="22px"
                            color={palette.success.main}
                          />
                        ) : (
                          <MdOutlineCheckBoxOutlineBlank
                            size="22px"
                            color={palette.grey[400]}
                          />
                        )}
                      </UI.HStack>
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
                  property: "updated_at",
                  label: "Cập nhật",
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
                  property: "note",
                  label: "Ghi chú",
                  colSpan: 2,
                  type: "render",
                  hiddenLabel: true,
                  renderRow: (data) => {
                    return (
                      <RichText
                        defaultValue={data}
                        label="Ghi chú cơ hội"
                        height={200}
                        onBlur={(data) => {
                          updateCoHoi({
                            ...coHoiData,
                            note: data,
                          });
                        }}
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
              <CoHoiNew
                defaultValues={coHoiData}
                onAfterUpdated={() => navigate(-1)}
              />
            </UI.CKBox>
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
