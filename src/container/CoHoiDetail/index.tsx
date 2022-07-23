import React from "react";
import BaseDetail from "@/container/BaseDetail";
import * as UI from "@/libs/ui";
import { useBoolean } from "ahooks";
import {
  AiOutlineSave,
  AiOutlineCopy,
  AiOutlineDelete,
  AiOutlineMail,
  AiOutlineMessage,
} from "react-icons/ai";

import DetailInfo from "@/components/DetailInfo";
import BasicDetails from "@/components/BasicDetails";
import TextEditor from "@/components/TextEditor";
import CoHoiForm from "@/container/CoHoiForm";

interface ICoHoiDetail {
  coHoiData: any;
  isLoadingCoHoi: boolean;
  reloadCoHoi: () => any;
}

export default function CoHoiDetail(props: ICoHoiDetail) {
  const { coHoiData, isLoadingCoHoi, reloadCoHoi } = props;
  const [isEdit, setEdit] = useBoolean(false);

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
                },
                {
                  property: "soluong",
                  label: "Số lượng",
                },
                {
                  property: "soluong",
                  label: "Số lượng",
                },
                {
                  property: "tien_trinh_key",
                  label: "Tiến trình",
                },
                {
                  property: "trang_thai_key",
                  label: "Trạng thái",
                },
                {
                  property: "da_cham_soc",
                  label: "Chăm sóc",
                },
                {
                  property: "created_at",
                  label: "Ngày tạo",
                },
                {
                  property: "updated_at",
                  label: "Cập nhật",
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
              <CoHoiForm coHoiData={coHoiData} reloadCoHoi={reloadCoHoi} />
            </UI.CKBox>
          }
        />
      }
    >
      <div>CoHoiDetail</div>
    </BaseDetail>
  );
}
