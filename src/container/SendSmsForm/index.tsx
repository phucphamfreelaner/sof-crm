import React, { useState, useEffect } from "react";
import * as UI from "@/libs/ui";
import BaseForm from "@/components/BaseForm";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { FaSave } from "react-icons/fa";
import {
  useLazySearchsmsTemplatesQuery,
  useLazySendSmsTemplateQuery,
  useLazyViewSmsTemplateQuery,
} from "@/store/smsTemplates";
import { useAppDispatch } from "@/store";
import { closeModalBottom, openModalBottom } from "@/store/modal";

interface ISendSmsContainer {
  recordId?: string | number;
  objectId?: string | number;

  modalId?: any;
  onAfterUpdated?: () => any;
  defaultValues?: any;
  gap?: string;
  size?: "medium" | "small";
}

const SendSmsContainer = (props: ISendSmsContainer) => {
  const { objectId, recordId, modalId: id, gap, size } = props;

  const theme = UI.useTheme();
  const [searchSmsTemplate, { data, isLoading, isFetching }] =
    useLazySearchsmsTemplatesQuery();

  const [defaultValues, setDefaultValues] = useState(null);

  const [viewSmsTemplate] = useLazyViewSmsTemplateQuery();

  const [
    sendSmsTemplate,
    {
      isLoading: isLoadingSendSms,
      isFetching: isFetchingSendSms,
      isSuccess: isSuccessSendSmsTemplate,
    },
  ] = useLazySendSmsTemplateQuery();

  useEffect(() => {
    searchSmsTemplate({ search: { ten: "" } })
      .unwrap()
      .then((res) => {
        setDefaultValues({ template_id: res?.[0] });
      });
  }, []);

  const hanleSendSms = (data) => {
    const payload = {
      ...data,
      template_id: data?.template_id?.value,
      customer_id: recordId,
    };
    sendSmsTemplate({ objectId, recordId, payload });
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccessSendSmsTemplate) {
      toast.success("Gửi sms thành công");
      dispatch(closeModalBottom({ id }));
    }
  }, [isSuccessSendSmsTemplate]);

  return (
    <BaseForm
      key={JSON.stringify(defaultValues)}
      gap={gap || theme.spacing(4)}
      templateColumns="repeat(6,1fr)"
      defaultValues={defaultValues}
      schema={{
        phone: Yup.string().required("Số điện thoại không được để trống"),
        //template_id: Yup.string().required("Sms template không được để trống"),
        content: Yup.string().required("Nội dung không được để trống"),
      }}
      watchFields={["template_id"]}
      onWatchChange={(data) => {
        const template_id = data?.template_id?.value;
        const template_state = data?.template_id;
        if (template_id) {
          viewSmsTemplate({ objectId, recordId, template_id })
            .unwrap()
            .then((res) => {
              setDefaultValues((prevState) => ({
                ...res,
                template_id: template_state,
              }));
            });
        }
      }}
      onSubmit={(data) => {
        hanleSendSms(data);
      }}
      fields={[
        {
          name: "template_id",
          type: "autocomplete",
          label: "SMS template",
          isLoading: isLoading || isFetching,
          autocompleteOptions: data || [],
          onSearchChange: (text) => {
            searchSmsTemplate({ search: { ten: text } });
          },
          colSpan: 3,
          size,
        },
        {
          name: "phone",
          type: "input",
          label: "Số điện thoại",
          colSpan: 3,
          size,
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
        loading={isLoadingSendSms || isFetchingSendSms}
        loadingPosition="end"
        endIcon={<FaSave />}
        variant="outlined"
        size="small"
        type="submit"
      >
        {"Gửi sms"}
      </UI.LoadingButton>
    </BaseForm>
  );
};

export default SendSmsContainer;
