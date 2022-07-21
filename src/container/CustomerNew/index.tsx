import React, { useState, useEffect } from "react";
import * as UI from "@/libs/ui";
import { BsChevronDown } from "react-icons/bs";
import { FaPencilAlt, FaSave } from "react-icons/fa";
import { CustomerBasicDetails } from "@/components/CustomerBasicDetails";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";
import BaseForm from "@/components/BaseForm";
import { Collapse } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { format } from "date-fns";
import toast from "react-hot-toast";

import { useLazyGetQuocGiaListQuery } from "@/store/quocGia/service";
import { useLazyGetThanhPhoListQuery } from "@/store/thanhPho/service";
import { useLazyGetDanhXungListQuery } from "@/store/danhXung/service";
import * as Yup from "yup";
import { useCreateCustomerMutation } from "@/store/customer/service";

const CustomerNewContainer = () => {
  const navigate = useNavigate();

  const [createCustomer, result] = useCreateCustomerMutation();

  const theme = UI.useTheme();
  const [
    searchQuocGia,
    {
      data: quocGiaData,
      isLoading: isLoadingQuocGia,
      isFetching: isFetchingQuocGia,
    },
  ] = useLazyGetQuocGiaListQuery();

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

  let rowsData = [
    {
      name: "danh_xung_key",
      type: "autocomplete",
      label: "Danh Xưng",
      colSpan: 2,
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
      colSpan: 2,
    },
    {
      name: "last_name",
      type: "input",
      label: "Họ",
      colSpan: 2,
    },
    {
      name: "contact",
      type: "input",
      label: "Cách gọi khách hàng",
      colSpan: 2,
    },
    {
      name: "email",
      type: "input",
      label: "Email",
      colSpan: 2,
    },
    {
      name: "phone",
      type: "input",
      label: "Di động",
      colSpan: 2,
    },
    {
      name: "phone2",
      type: "input",
      label: "Điện thoại bàn",
      colSpan: 2,
    },
    {
      name: "thanhpho_key",
      type: "autocomplete",
      label: "Tỉnh/TP",
      colSpan: 2,
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
      colSpan: 2,
      label: "Quốc gia",
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
      name: "use_english",
      colSpan: 2,
      type: "select",
      label: "Sử dụng cho khách hàng tiếng anh",
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
    {
      name: "zalo_number",
      type: "input",
      colSpan: 2,
      label: "Zalo",
    },
    {
      name: "zalo_user_id",
      type: "input",
      colSpan: 1,
      label: "Zalo key",
    },
    {
      name: "whatsapp",
      type: "input",
      colSpan: 1,
      label: "WhatsApp",
    },
    {
      name: "address",
      type: "input",
      label: "Địa chỉ",
      colSpan: 6,
      multiline: true,
      rows: 4,
    },
  ];

  const elForm = React.useRef<any>();

  console.log(result);

  useEffect(() => {
    if (result?.status == "fulfilled" && result?.data?.data?.id) {
      if (result?.data?.message) {
        toast(result?.data?.message, {
          icon: "⚠️",
        });
      } else toast.success("Create a new customer successfully");

      navigate(`/khach_hang/${result?.data?.data?.id}`);
    }
  }, [result]);

  return (
    <>
      <BaseForm
        gap={theme.spacing(4)}
        templateColumns="repeat(6,1fr)"
        schema={{
          contact: Yup.string().required(
            "Cách gọi khách hàng không được để trống"
          ),
        }}
        ref={elForm}
        //@ts-ignore
        fields={rowsData}
        defaultValues={{
          use_english: "0",
          danh_xung_key: {
            label: "Chị",
            value: "chi",
          },
        }}
      ></BaseForm>
      <UI.HStack justifyContent={"end"} w={"100%"}>
        <UI.LoadingButton
          loading={result?.status == "pending"}
          loadingPosition="end"
          endIcon={<FaSave />}
          variant="outlined"
          onClick={() =>
            elForm.current.handleSubmit((data) => {
              createCustomer({
                created_at: format(new Date(), "yyyy-MM-dd"),
                cong_ty: {
                  chuc_vu_key: "giam-doc",
                },
                files: [],
                ...data,
                quocgia_key: data?.quocgia_key?.value,
                thanhpho_key: data?.thanhpho_key?.value,
                danh_xung_key: data?.danh_xung_key?.value,
              });
            })()
          }
        >
          Save
        </UI.LoadingButton>
      </UI.HStack>
    </>
  );
};

export default CustomerNewContainer;
