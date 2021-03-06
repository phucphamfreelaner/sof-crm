import React, { useState, useEffect } from "react";
import * as UI from "@/libs/ui";
import { useNavigate } from "react-router-dom";
import BaseForm from "@/components/BaseForm";
import { format } from "date-fns";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { FaSave } from "react-icons/fa";

import {
  useLazyGetTrangThaiListQuery,
  useGetTrangThaiListQuery,
} from "@/store/trangThai/service";
import {
  useLazyGetTienTrinhListQuery,
  useGetTienTrinhListQuery,
} from "@/store/tienTrinh/service";
import {
  useLazyGetSoLuongListQuery,
  useGetSoLuongListQuery,
} from "@/store/soLuong";
import { useCreateCoHoiMutation } from "@/store/coHoi/service";
import Loading from "@/components/Loading";

const CoHoiNewContainer = (props) => {
  const navigate = useNavigate();
  const { customerId } = props;

  const [createCoHoi, result] = useCreateCoHoiMutation();

  const theme = UI.useTheme();
  const [
    searchSoLuong,
    {
      data: soLuongData,
      isLoading: isLoadingSoLuong,
      isFetching: isFetchingSoLuong,
    },
  ] = useLazyGetSoLuongListQuery();
  const [
    searchTrangThai,
    {
      data: trangThaiData,
      isLoading: isLoadingTrangThai,
      isFetching: isFetchingTrangThai,
    },
  ] = useLazyGetTrangThaiListQuery();

  const [
    searchTienTrinh,
    {
      data: tienTrinhData,
      isLoading: isLoadingTienTrinh,
      isFetching: isFetchingTienTrinh,
    },
  ] = useLazyGetTienTrinhListQuery();

  const { data: defaultListSoLuongData, isLoading: isLoadingSoLuongDefault } =
    useGetSoLuongListQuery({ name: "" });
  const {
    data: defaultListTrangThaiData,
    isLoading: isLoadingTrangThaiDefault,
  } = useGetTrangThaiListQuery({ name: "" });
  const {
    data: defaultListTienTrinhData,
    isLoading: isLoadingTienTrinhDefault,
  } = useGetTienTrinhListQuery({
    name: "",
    parentKey: "tinh_trang_co_hoi",
    parentValue: "dang-lam-viec",
  });

  const elForm = React.useRef<any>();

  useEffect(() => {
    if (result?.status == "fulfilled") {
      if (result?.data?.message) {
        toast(result?.data?.message, {
          icon: "??????",
        });
      } else toast.success("Th??m c?? h???i th??nh c??ng");

      navigate(`/khach_hang/${customerId}/co_hoi`);
    }
  }, [result]);

  return (
    <>
      {isLoadingSoLuongDefault ||
      isLoadingTrangThaiDefault ||
      isLoadingTienTrinhDefault ? (
        <Loading />
      ) : (
        <>
          <BaseForm
            // width={"100%"}
            gap={theme.spacing(4)}
            templateColumns="repeat(6,1fr)"
            schema={{
              name: Yup.string().required("T??n c?? h???i kh??ng ???????c ????? tr???ng"),
            }}
            ref={elForm}
            //@ts-ignore
            fields={[
              {
                name: "name",
                type: "input",
                label: "T??n c?? h???i",
                defaultValues: "",
                colSpan: 3,
              },
              {
                name: "soluong",
                type: "autocomplete",
                label: "S??? l?????ng",
                isLoading: isLoadingSoLuong || isFetchingSoLuong,
                autocompleteOptions: soLuongData
                  ? Object.keys(soLuongData).map((key) => {
                      return { label: soLuongData[key], value: key };
                    })
                  : [],
                onSearchChange: (text) => {
                  searchSoLuong({ name: text });
                },
                colSpan: 3,
              },
              {
                name: "trang_thai_key",
                type: "autocomplete",
                label: "Tr???ng th??i",
                isLoading: isLoadingTrangThai || isFetchingTrangThai,
                autocompleteOptions: trangThaiData
                  ? Object.keys(trangThaiData).map((key) => {
                      return { label: trangThaiData[key], value: key };
                    })
                  : [],
                onSearchChange: (text) => {
                  searchTrangThai({ name: text });
                },
                colSpan: 3,
              },
              {
                name: "tien_trinh_key",
                type: "autocomplete",
                label: "Ti???n tr??nh",
                isLoading: isLoadingTienTrinh || isFetchingTienTrinh,
                autocompleteOptions: tienTrinhData
                  ? Object.keys(tienTrinhData).map((key) => {
                      return { label: tienTrinhData[key], value: key };
                    })
                  : [],
                onSearchChange: (text) => {
                  searchTienTrinh({ name: text });
                },
                colSpan: 3,
              },
              {
                name: "note",
                type: "text-editor",
                label: "Di???n gi???i",
                colSpan: 6,
              },
              {
                name: "files",
                label: "UPLOAD FILE",
                colSpan: 6,
                type: "upload-file-detail",
                templateColumns: "repeat(10, 1fr)",
                gap: "12px",
                fields: [
                  {
                    type: "input",
                    name: "type",
                    label: "Lo???i",
                    colSpan: 3,
                  },
                  {
                    type: "input",
                    name: "note",
                    label: "Di???n gi???i",
                    colSpan: 3,
                  },
                ],
              },
            ]}
            defaultValues={{
              soluong: {
                label:
                  defaultListSoLuongData?.[
                    Object.keys(defaultListSoLuongData)[0]
                  ],
                value: Object.keys(defaultListSoLuongData)[0],
              },
              trang_thai_key: {
                label:
                  defaultListTrangThaiData?.[
                    Object.keys(defaultListTrangThaiData)[0]
                  ],
                value: Object.keys(defaultListTrangThaiData)[0],
              },
              tien_trinh_key: {
                label:
                  defaultListTienTrinhData?.[
                    Object.keys(defaultListTienTrinhData)[0]
                  ],
                value: Object.keys(defaultListTienTrinhData)[0],
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
                  createCoHoi({
                    customer_id: customerId,
                    created_at: format(new Date(), "yyyy-MM-dd"),
                    ...data,
                    soluong: data?.soluong?.value,
                    trang_thai_key: data?.trang_thai_key?.value,
                    tien_trinh_key: data?.tien_trinh_key?.value,
                  });
                })()
              }
            >
              Save
            </UI.LoadingButton>
          </UI.HStack>
        </>
      )}
    </>
  );
};

export default CoHoiNewContainer;
