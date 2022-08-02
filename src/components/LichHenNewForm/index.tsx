import React from "react";
import * as UI from "@/libs/ui";
import BaseForm from "@/components/BaseForm";

interface ILichHenNewForm {
  khachHangData?: any;
  onSearchKhachHang?: (text: any) => any;
  isLoadingKhachHang?: boolean;
  defaultValues?: any;
  formRef?: any;
  size?: "medium" | "small";
}

function LichHenNewForm(props: ILichHenNewForm) {
  const {
    khachHangData,
    onSearchKhachHang,
    isLoadingKhachHang,
    defaultValues,
    formRef,
    size,
  } = props;

  return (
    <BaseForm
      sx={{ width: "100%" }}
      templateColumns="repeat(6, 1fr)"
      gap="26px"
      defaultValues={defaultValues}
      //watchFields={["thong_tin_chung"]}
      //   onWatchChange={(data) => {
      //     if (data?.thong_tin_chung?.vat) setIsVAT.setTrue();
      //     else setIsVAT.setFalse();

      //     if (data?.thong_tin_chung?.["phi_giao_hang"]) setIsShipFee.setTrue();
      //     else setIsShipFee.setFalse();

      //     if (data?.thong_tin_chung?.["time"])
      //       setTgGiaoHang(data?.thong_tin_chung?.["time"]);
      //   }}
      ref={formRef}
      fields={[
        {
          name: "customer_id",
          label: "Khách hàng",
          type: "autocomplete",
          colSpan: 6,
          isLoading: isLoadingKhachHang,
          autocompleteOptions: khachHangData || [],
          onSearchChange: onSearchKhachHang,
          size,
        },
        {
          name: "ngaybatdau",
          label: "Ngày bắt đầu",
          type: "date-picker",
          colSpan: 3,
          size,
        },
        {
          name: "ngayketthuc",
          label: "Ngày kết thúc",
          type: "date-picker",
          colSpan: 3,
          size,
        },
        {
          name: "ten",
          label: "Tiêu đề",
          type: "input",
          colSpan: 3,
          multiline: true,
          rows: 4,
          size,
        },
        {
          name: "diadiem",
          label: "Địa điểm",
          type: "input",
          colSpan: 3,
          multiline: true,
          rows: 4,
          size,
        },
        {
          name: "note",
          label: "Diễn giải",
          type: "input",
          colSpan: 6,
          multiline: true,
          rows: 4,
          size,
        },
      ]}
    />
  );
}

export default LichHenNewForm;
