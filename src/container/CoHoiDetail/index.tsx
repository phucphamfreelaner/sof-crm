import React from "react";
import BaseDetail from "@/container/BaseDetail";
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

import DetailInfo from "@/components/DetailInfo";
import BasicDetails from "@/components/BasicDetails";
import TextEditor from "@/components/TextEditor";
import CoHoiNew from "@/container/CoHoiNew";

interface ICoHoiDetail {
  coHoiData: any;
  isLoadingCoHoi: boolean;
  reloadCoHoi: () => any;
}

export default function CoHoiDetail(props: ICoHoiDetail) {
  const { coHoiData, isLoadingCoHoi, reloadCoHoi } = props;
  const [isEdit, setEdit] = useBoolean(false);
  const dispatch = useAppDispatch();
  const { spacing, palette } = UI.useTheme();

  const breadcrumbs = [
    <UI.Typography
      sx={{ cursor: "pointer", fontWeight: 600 }}
      variant="body1"
      key="1"
      color="inherit"
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
  return (
    <BaseDetail
      isLoading={isLoadingCoHoi}
      isEdit={isEdit}
      openEdit={setEdit.setTrue}
      closeEdit={setEdit.setFalse}
      headerTitle="Cơ hội"
      headerBreadcrumbs={breadcrumbs}
      actionMenus={[
        {
          icon: <AiOutlineSave />,
          label: "Lưu trữ",
          onClick: () => {
            console.log("data");
          },
        },
        {
          icon: <AiOutlineFolderAdd />,
          label: "Thêm mới",
          onClick: () => {
            const id = uniqueId();
            dispatch(
              openModalBottom({
                data: {
                  title: "Thêm cơ hội mới",
                  height: "600px",
                  width: "500px",
                  id: `co-hoi-${id}`,
                  content: (
                    <UI.CKBox px={spacing(3)} py={spacing(3.5)}>
                      <CoHoiNew customerId={8736} />
                    </UI.CKBox>
                  ),
                },
              })
            );
          },
        },
        {
          icon: <AiOutlineCopy />,
          label: "Nhân bản",
          onClick: () => {
            console.log("data");
          },
        },
        {
          icon: <AiOutlineMail />,
          label: "Gửi email",
          onClick: () => {
            console.log("data");
          },
        },
        {
          icon: <AiOutlineMessage />,
          label: "Gửi SMS",
          onClick: () => {
            console.log("data");
          },
        },
        {
          icon: <AiOutlineDelete />,
          label: "Xóa bỏ",
          onClick: () => {
            console.log("data");
          },
        },
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
                      <TextEditor
                        height="300px"
                        padding="18px"
                        sx={{ mt: "16px" }}
                        id="co-hoi-note"
                        defaultValue={data}
                        label="Ghi chú nội bộ"
                      />
                    );
                  },
                },
              ]}
            />
          }
          editContent={
            <UI.CKBox p="26px">
              <CoHoiNew defaultValues={coHoiData} />
            </UI.CKBox>
          }
        />
      }
    />
  );
}
