import React from "react";
import * as UI from "@/libs/ui";
import BaseForm from "@/components/BaseForm";

interface ICoHoiCSKHNewForm {
  defaultValues?: any;
  formRef?: any;
}

function CoHoiCSKHNewForm(props: ICoHoiCSKHNewForm) {
  const { defaultValues, formRef } = props;

  return (
    <BaseForm
      sx={{ width: "100%" }}
      templateColumns="repeat(2, 1fr)"
      gap="16px"
      defaultValues={defaultValues}
      ref={formRef}
      fields={[
        {
          name: "active_date",
          label: "Ngày chăm sóc",
          type: "date-picker",
          colSpan: 2,
          size: "small",
        },
        {
          name: "noi_dung",
          label: "Nội dung",
          type: "input",
          colSpan: 2,
          multiline: true,
          rows: 1,
          size: "small",
        },
        {
          name: "active",
          label: "Đã chăm sóc",
          type: "checkbox",
          colSpan: 2,
          size: "small",
        },
      ]}
    />
  );
}

export default CoHoiCSKHNewForm;
