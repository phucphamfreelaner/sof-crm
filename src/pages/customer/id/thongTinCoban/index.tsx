import React from "react";
import * as UI from "@/libs/ui";

import { Collapse } from "@mui/material";
import BaseForm from "@/components/BaseForm";
import { CustomerBasicDetails } from "@/components/CustomerBasicDetails";
import {
  useLazyGetQuocGiaListQuery,
  useGetQuocGiaListQuery,
} from "@/store/quocGia/service";
import {
  useLazyGetThanhPhoListQuery,
  useGetThanhPhoListQuery,
} from "@/store/thanhPho/service";
import { useLazyGetDanhXungListQuery } from "@/store/danhXung/service";
import * as Yup from "yup";
import {
  useGetCustomerByIdQuery,
  useUpdateCustomerByIDMutation,
} from "@/store/customer/service";
import { useParams } from "react-router-dom";
import { FaPencilAlt, FaSave } from "react-icons/fa";

function ThongTinCoBanTab() {
  const [isView, setView] = React.useState(true);
  const theme = UI.useTheme();
  const params = useParams();

  const [
    searchQuocGia,
    {
      data: quocGiaData,
      isLoading: isLoadingQuocGia,
      isFetching: isFetchingQuocGia,
    },
  ] = useLazyGetQuocGiaListQuery();

  const { data: defaultListQuocGiaData, isLoading: isLoadingQuocGiaDefault } =
    useGetQuocGiaListQuery({ name: "" });
  const { data: defaultListThanhPhoData, isLoading: isLoadingThanhPhoDefault } =
    useGetThanhPhoListQuery({ name: "" });
  const [updateCustomerByID, result] = useUpdateCustomerByIDMutation();

  const [
    searchThanhPho,
    {
      data: thanhPhoData,
      isLoading: isLoadingThanhPho,
      isFetching: isFetchingThanhPho,
    },
  ] = useLazyGetThanhPhoListQuery();

  const [
    searchDanhXung,
    {
      data: danhXungData,
      isLoading: isLoadingDanhXung,
      isFetching: isFetchingDanhXung,
    },
  ] = useLazyGetDanhXungListQuery();

  const {
    data: customer,
    isLoading: isLoadingCustomer,
    refetch,
  } = useGetCustomerByIdQuery({
    id: params?.customerId,
  });

  const rowsData = [
    {
      name: "danh_xung",
      type: "autocomplete",
      label: "Danh Xưng",
      defaultValues: customer?.danh_xung?.name,
      isLoading: isLoadingDanhXung || isFetchingDanhXung,
      autocompleteOptions: danhXungData
        ? Object.keys(danhXungData).map((key) => {
            return { label: danhXungData[key], value: key };
          })
        : [],
      onSearchChange: (text) => {
        searchDanhXung({ name: text });
      },
    },
    {
      name: "first_name",
      type: "input",
      label: "Tên",
      defaultValues: customer?.first_name,
    },
    {
      name: "last_name",
      type: "input",
      label: "Họ",
      defaultValues: customer?.last_name,
    },
    {
      name: "contact",
      type: "input",
      label: "Cách gọi khách hàng",
      defaultValues: customer?.contact,
    },
    {
      name: "email",
      type: "input",
      label: "Email",
      defaultValues: customer?.email,
    },
    {
      name: "phone",
      type: "input",
      label: "Di động",
      defaultValues: customer?.phone,
    },
    {
      name: "phone2",
      type: "input",
      label: "Điện thoại bàn",
      defaultValues: customer?.phone2,
    },
    {
      name: "address",
      type: "input",
      label: "Địa chỉ",
      defaultValues: customer?.address,
    },
    {
      name: "thanhpho_key",
      type: "autocomplete",
      label: "Tỉnh/TP",
      defaultValues: defaultListThanhPhoData?.[customer?.thanhpho_key],
      isLoading: isLoadingThanhPho || isFetchingThanhPho,
      autocompleteOptions: thanhPhoData
        ? Object.keys(thanhPhoData).map((key) => {
            return { label: thanhPhoData[key], value: key };
          })
        : [],
      onSearchChange: (text) => {
        searchThanhPho({ name: text });
      },
    },
    {
      name: "quocgia_key",
      type: "autocomplete",
      label: "Quốc gia",
      defaultValues: defaultListQuocGiaData?.[customer?.quocgia_key],
      isLoading: isLoadingQuocGia || isFetchingQuocGia,
      autocompleteOptions: quocGiaData
        ? Object.keys(quocGiaData).map((key) => {
            return { label: quocGiaData[key], value: key };
          })
        : [],
      onSearchChange: (text) => {
        searchQuocGia({ name: text });
      },
    },
    {
      name: "zalo_number",
      type: "input",
      label: "Zalo",
      defaultValues: customer?.zalo_number,
    },
    {
      name: "zalo_user_id",
      type: "input",
      label: "Zalo key",
      defaultValues: customer?.zalo_user_id,
    },
    {
      name: "whatsapp",
      type: "input",
      label: "WhatsApp",
      defaultValues: customer?.whatsapp,
    },
    {
      name: "use_english",
      type: "select",
      label: "Sử dụng cho khách hàng tiếng anh",
      defaultValues: customer?.use_english,
      selectOptions: [
        {
          label: "Có",
          value: "1",
        },
        {
          label: "Không",
          value: "0",
        },
      ],
    },
  ];

  const defaultValues = rowsData.reduce(
    (o, item) => ({ ...o, [item.name]: item.defaultValues }),
    {}
  );

  React.useEffect(() => {
    if (result?.status == "fulfilled") {
      setView(!isView);
      refetch();
    }
  }, [result]);

  const elForm = React.useRef<any>();

  return (
    <>
      <UI.HStack mb="14px" w="100%" justifyContent="flex-end">
        <UI.LoadingButton
          loading={result?.status == "pending"}
          loadingPosition="end"
          endIcon={
            isView ? (
              <FaPencilAlt fontSize="small" />
            ) : (
              <FaSave fontSize="small" />
            )
          }
          variant="outlined"
          onClick={() =>
            elForm.current.handleSubmit((data) => {
              updateCustomerByID({
                ...customer,
                ...data,
                quocgia_key: data.quocgia_key.value,
                thanhpho_key: data.thanhpho_key.value,
                danh_xung_key: data.danh_xung.value,
              });
            })()
          }
        >
          {isView ? "Edit" : "Save"}
        </UI.LoadingButton>
      </UI.HStack>
      <UI.Card sx={{ width: "90%" }} elevation={10}>
        <UI.Grid container spacing={3}>
          <UI.Grid item xs={12}>
            <Collapse in={isView}>
              <CustomerBasicDetails rows={rowsData} />
            </Collapse>
            <Collapse in={!isView}>
              <UI.CardContent>
                <BaseForm
                  ref={elForm}
                  key={JSON.stringify(defaultValues)}
                  id="base-form"
                  gap={theme.spacing(4)}
                  templateColumns="repeat(2,1fr)"
                  defaultValues={defaultValues}
                  schema={{
                    contact: Yup.string().required(
                      "Cách gọi khách hàng không được để trống"
                    ),
                  }}
                  fields={rowsData as any}
                ></BaseForm>
              </UI.CardContent>
            </Collapse>
          </UI.Grid>
        </UI.Grid>
      </UI.Card>
    </>
  );
}

export default ThongTinCoBanTab;
