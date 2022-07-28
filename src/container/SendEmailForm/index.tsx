import React, { useState, useEffect } from "react";
import * as UI from "@/libs/ui";
import BaseForm from "@/components/BaseForm";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { FaSave } from "react-icons/fa";
import {
  useLazySearchmailTemplatesQuery,
  useLazySendMailTemplateQuery,
  useLazyViewMailTemplateQuery,
} from "@/store/mailTemplates";

interface ISendMailContainer {
  customerId?: string | number;
  onAfterUpdated?: (data: any) => any;
  defaultValues?: any;
}

const SendMailContainer = (props: ISendMailContainer) => {
  const { customerId } = props;

  const theme = UI.useTheme();
  const [searchMailTemplate, { data, isLoading, isFetching, isSuccess }] =
    useLazySearchmailTemplatesQuery();

  const [defaultValues, setDefaultValues] = useState(null);

  const [
    viewMailTemplate,
    { isLoading: isLoadingMailTemplate, isFetching: isFetchingMailTemplate },
  ] = useLazyViewMailTemplateQuery();

  const [
    sendEmailTemplate,
    { data: dataSendEmailTemplate, isSuccess: isSuccessSendMailTemplate },
  ] = useLazySendMailTemplateQuery();

  useEffect(() => {
    searchMailTemplate({ search: { ten: "" } })
      .unwrap()
      .then((res) => {
        setDefaultValues({ template_id: res?.[0] });
      });
  }, []);

  const hanleSendEmail = (data) => {
    const payload = {
      ...data,
      template_id: data?.template_id?.value,
      customer_id: customerId,
    };
    sendEmailTemplate({ customerId, payload });
  };

  useEffect(() => {
    if (isSuccessSendMailTemplate && dataSendEmailTemplate) {
      toast.success("Gửi email thành công");
    }
  }, [isSuccessSendMailTemplate, dataSendEmailTemplate]);

  return (
    <BaseForm
      key={JSON.stringify(defaultValues)}
      gap={theme.spacing(4)}
      templateColumns="repeat(6,1fr)"
      defaultValues={defaultValues}
      schema={{
        from: Yup.string().required("Email gửi không được để trống"),
        email: Yup.string().required("Email nhận không được để trống"),
        title: Yup.string().required("Tiêu đề không được để trống"),
        content: Yup.string().required("Nội dung không được để trống"),
      }}
      watchFields={["template_id"]}
      onWatchChange={(data) => {
        const template_id = data?.template_id?.value;
        const template_state = data?.template_id;
        if (template_id) {
          viewMailTemplate({ customerId, template_id })
            .unwrap()
            .then((res) => {
              setDefaultValues((prevState) => ({
                template_id: template_state,
                content: res?.content,
                title: res?.title,
                from: res?.from,
                email: res?.from,
              }));
            });
        }
      }}
      onSubmit={(data) => {
        hanleSendEmail(data);
      }}
      fields={[
        {
          name: "from",
          type: "input",
          label: "Email gửi",
          colSpan: 3,
          size: "small",
        },
        {
          name: "email",
          type: "input",
          label: "Email nhận",
          colSpan: 3,
          size: "small",
        },
        {
          name: "title",
          type: "input",
          label: "Tiêu đề",
          colSpan: 6,
          size: "small",
        },
        {
          name: "template_id",
          type: "autocomplete",
          label: "Template",
          isLoading: isLoading || isFetching,
          autocompleteOptions: data || [],
          onSearchChange: (text) => {
            searchMailTemplate({ search: { ten: text } });
          },
          colSpan: 6,
          size: "small",
        },
        {
          name: "content",
          id: "content-modal-co-hoi-new",
          type: "text-editor",
          label: "Nội dung",
          colSpan: 6,
        },
      ]}
      childrenColSpan={6}
      childrenSx={{ justifyContent: "flex-end", display: "flex" }}
    >
      <UI.LoadingButton
        //loading={isLoadingCreate || isLoadingUpdate}
        loadingPosition="end"
        endIcon={<FaSave />}
        variant="outlined"
        size="small"
        type="submit"
      >
        {"Gửi mail"}
      </UI.LoadingButton>
    </BaseForm>
  );
};

export default SendMailContainer;
