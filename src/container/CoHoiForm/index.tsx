import { useEffect } from "react";
import * as UI from "@/libs/ui";
import { AiOutlineSave } from "react-icons/ai";
import toast from "react-hot-toast";

import BaseForm from "@/components/BaseForm";

import { useLazyGetTrangThaiListQuery } from "@/store/trangThai/service";
import { useLazyGetTienTrinhListQuery } from "@/store/tienTrinh/service";
import { useLazyGetSoLuongListQuery } from "@/store/soLuong";
import { useUpdateCoHoiByIDMutation } from "@/store/coHoi/service";
import { useBoolean } from "ahooks";

interface ICoHoiForm {
  coHoiData?: any;
  reloadCoHoi?: any;
  onSaveDone?: any;
}

const CoHoiDetailsContainer = (props: ICoHoiForm) => {
  const { coHoiData, reloadCoHoi, onSaveDone } = props;
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

  const [updateCoHoiByID, { isLoading, isSuccess }] =
    useUpdateCoHoiByIDMutation();

  useEffect(() => {
    if (isSuccess) {
      reloadCoHoi?.();
      onSaveDone?.();
      toast.success("Update successfully!");
      setDirty.setFalse();
    }
  }, [isSuccess]);

  const [isDirty, setDirty] = useBoolean(false);

  return (
    <BaseForm
      id="co-hoi-details"
      gap={theme.spacing(4)}
      templateColumns="repeat(6,1fr)"
      defaultValues={coHoiData}
      onDirty={setDirty.setTrue}
      onSubmit={(value) => {
        updateCoHoiByID({
          ...coHoiData,
          ...value,
          soluong: value.soluong.value,
          trang_thai_key: value.trang_thai_key.value,
          tien_trinh_key: value.tien_trinh_key.value,
        });
      }}
      childrenColSpan={6}
      fields={[
        {
          name: "name",
          type: "input",
          label: "Tên",
          colSpan: 3,
        },
        {
          name: "soluong",
          type: "autocomplete",
          label: "Số lượng",
          isLoading: isLoadingSoLuong || isFetchingSoLuong,
          colSpan: 3,
          autocompleteOptions: soLuongData
            ? Object.keys(soLuongData).map((key) => {
                return { label: soLuongData[key], value: key };
              })
            : [],
          onSearchChange: (text) => {
            searchSoLuong({ name: text });
          },
        },
        {
          name: "trang_thai_key",
          type: "autocomplete",
          label: "Trạng thái",
          isLoading: isLoadingTrangThai || isFetchingTrangThai,
          autocompleteOptions: trangThaiData
            ? Object.keys(trangThaiData).map((key) => {
                return {
                  label: trangThaiData[key],
                  value: key,
                };
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
          label: "Tiến trình",
          isLoading: isLoadingTienTrinh || isFetchingTienTrinh,
          autocompleteOptions: tienTrinhData
            ? Object.keys(tienTrinhData).map((key) => {
                return {
                  label: tienTrinhData[key],
                  value: key,
                };
              })
            : [],
          onSearchChange: (text) => {
            searchTienTrinh({ name: text });
          },
          colSpan: 3,
        },
        // {
        //   name: "note",
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
    >
      <UI.HStack w="100%" justifyContent="flex-end">
        <UI.LoadingButton
          loading={isLoading}
          startIcon={<AiOutlineSave />}
          variant="outlined"
          color="success"
          size="small"
          type="submit"
          disabled={!isDirty}
        >
          Update
        </UI.LoadingButton>
      </UI.HStack>
    </BaseForm>
  );
};

export default CoHoiDetailsContainer;
