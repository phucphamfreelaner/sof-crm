import React, { useState, useEffect } from "react";
import * as UI from "@/libs/ui";
import BaseForm from "@/components/BaseForm";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { FaSave } from "react-icons/fa";

import {
  useLazyGetTrangThaiOptionsQuery,
  useLazyGetTrangThaiByKeyQuery,
} from "@/store/trangThai";
import {
  useLazyGetTienTrinhOptionQuery,
  useLazyGetTienTrinhByKeyQuery,
} from "@/store/tienTrinh";
import {
  useLazyGetSoLuongOptionsQuery,
  useLazyGetSoLuongByNameQuery,
} from "@/store/soLuong";
import { useCreateCoHoiMutation } from "@/store/coHoi";

interface ICoHoiNewContainer {
  customerId?: string | number;
  onAfterUpdated?: (data: any) => any;
  defaultValues?: any;
}

const CoHoiNewContainer = (props: ICoHoiNewContainer) => {
  const { customerId, onAfterUpdated, defaultValues } = props;

  const [createCoHoi, { data, isSuccess, isLoading: isLoadingCreate }] =
    useCreateCoHoiMutation();

  const theme = UI.useTheme();
  const [
    searchSoLuong,
    {
      data: soLuongData,
      isLoading: isLoadingSoLuong,
      isFetching: isFetchingSoLuong,
      isSuccess: isSuccessSoLuong,
    },
  ] = useLazyGetSoLuongOptionsQuery();
  const [
    searchTrangThai,
    {
      data: trangThaiData,
      isLoading: isLoadingTrangThai,
      isFetching: isFetchingTrangThai,
      isSuccess: isSuccessTrangThai,
    },
  ] = useLazyGetTrangThaiOptionsQuery();

  const [
    searchTienTrinh,
    {
      data: tienTrinhData,
      isLoading: isLoadingTienTrinh,
      isFetching: isFetchingTienTrinh,
      isSuccess: isSuccessTienTrinh,
    },
  ] = useLazyGetTienTrinhOptionQuery();

  const [getSoLuongByName] = useLazyGetSoLuongByNameQuery();
  const [getTrangThaiByKey] = useLazyGetTrangThaiByKeyQuery();
  const [getTienTrinhByKey] = useLazyGetTienTrinhByKeyQuery();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Thêm cơ hội thành công");
      onAfterUpdated?.(data);
    }
  }, [isSuccess]);

  React.useEffect(() => {
    searchSoLuong({ name: "" });
    searchTrangThai({ name: "" });
    searchTienTrinh({ name: "" });
  }, []);

  const isLoading =
    isSuccessTienTrinh && isSuccessSoLuong && isSuccessTrangThai;

  return !isLoading ? (
    <UI.CircularProgress />
  ) : (
    <BaseForm
      gap={theme.spacing(4)}
      templateColumns="repeat(6,1fr)"
      schema={{
        name: Yup.string().required("Tên cơ hội không được để trống"),
      }}
      onSubmit={(data) =>
        createCoHoi({
          customer_id: customerId,
          ...data,
          soluong: data?.soluong?.value,
          trang_thai_key: data?.trang_thai_key?.value,
          tien_trinh_key: data?.tien_trinh_key?.value,
        })
      }
      fields={[
        {
          name: "name",
          type: "input",
          label: "Tên cơ hội",
          defaultValues: "",
          colSpan: 3,
        },
        {
          name: "soluong",
          type: "autocomplete",
          label: "Số lượng",
          isLoading: isLoadingSoLuong || isFetchingSoLuong,
          autocompleteOptions: soLuongData || [],
          onGetDataByValue: (name) =>
            name &&
            getSoLuongByName({ name })
              .unwrap()
              .then((res) => {
                return res?.name || name;
              }),
          onSearchChange: (text) => {
            searchSoLuong({ name: text });
          },
          colSpan: 3,
        },
        {
          name: "trang_thai_key",
          type: "autocomplete",
          label: "Trạng thái",
          isLoading: isLoadingTrangThai || isFetchingTrangThai,
          autocompleteOptions: trangThaiData || [],
          onGetDataByValue: (key) =>
            key &&
            getTrangThaiByKey({ key })
              .unwrap()
              .then((res) => res.name),
          onSearchChange: (text) => {
            searchTrangThai({ name: text });
          },
          colSpan: 3,
        },
        {
          name: "tien_trinh_key",
          type: "autocomplete",
          label: "Tiến trình",
          isLoading: isLoadingTienTrinh || isFetchingTienTrinh,
          autocompleteOptions: tienTrinhData || [],
          onGetDataByValue: (key) =>
            key &&
            getTienTrinhByKey({ key })
              .unwrap()
              .then((res) => res.name),
          onSearchChange: (text) => searchTienTrinh({ name: text }),
          colSpan: 3,
        },
        // {
        //   name: "note",
        //   id: "note-modal-co-hoi-new",
        //   type: "text-editor",
        //   label: "Diễn giải",
        //   colSpan: 6,
        // },
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
              label: "Loại",
              colSpan: 3,
            },
            {
              type: "input",
              name: "note",
              label: "Diễn giải",
              colSpan: 3,
            },
          ],
        },
      ]}
      childrenColSpan={6}
      childrenSx={{ justifyContent: "flex-end", display: "flex" }}
      defaultValues={{
        note: defaultValues?.note || "",
        soluong: defaultValues?.soluong || soLuongData?.[0],
        trang_thai_key: defaultValues?.trang_thai_key || trangThaiData?.[0],
        tien_trinh_key: defaultValues?.tien_trinh_key || tienTrinhData?.[0],
        files: defaultValues?.files,
      }}
    >
      <UI.LoadingButton
        loading={isLoadingCreate}
        loadingPosition="end"
        endIcon={<FaSave />}
        variant="outlined"
        size="small"
        type="submit"
      >
        Save
      </UI.LoadingButton>
    </BaseForm>
  );
};

export default CoHoiNewContainer;
