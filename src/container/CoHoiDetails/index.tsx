import { useState, useEffect } from "react";
import * as UI from "@/libs/ui";
import { BsChevronDown } from "react-icons/bs";
import { FaPencilAlt, FaSave } from "react-icons/fa";
import { CoHoiBasicDetails } from "@/components/CoHoiBasicDetails";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
  useGetCoHoiByIdQuery,
  useUpdateCoHoiByIDMutation,
} from "@/store/coHoi/service";
import { useParams } from "react-router-dom";
import Loading from "@/components/Loading";
import BaseForm from "@/components/BaseForm";
import { Collapse } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  useLazyGetTrangThaiListQuery,
  useGetTrangThaiListQuery,
} from "@/store/trangThai/service";
import {
  useLazyGetTienTrinhListQuery,
  useGetTienTrinhListQuery,
} from "@/store/tienTrinh/service";
import {
  useGetSoLuongListQuery,
  useLazyGetSoLuongListQuery,
} from "@/store/soLuong";

const CoHoiDetailsContainer = () => {
  const params = useParams();
  const navigate = useNavigate();
  const theme = UI.useTheme();
  const [isView, setView] = useState(true);
  const {
    data: coHoi,
    isLoading: isLoadingCoHoi,
    refetch,
  } = useGetCoHoiByIdQuery({
    id: params?.coHoiId,
  });
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
  } = useGetTienTrinhListQuery({ name: "" });

  let rowsData = [
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
      defaultValues: defaultListSoLuongData?.[coHoi?.soluong],
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
      defaultValues: defaultListTrangThaiData?.[coHoi?.trang_thai_key],
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
      label: "Tiến trình",
      defaultValues: defaultListTienTrinhData?.[coHoi?.tien_trinh_key],
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
      label: "Diễn giải",
      defaultValues: coHoi?.note,
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
  ];

  const [updateCoHoiByID, result] = useUpdateCoHoiByIDMutation();

  useEffect(() => {
    if (result?.status == "fulfilled") {
      setView(!isView);
      refetch();
    }
  }, [result]);

  return (
    <>
      {isLoadingCoHoi ||
      isLoadingSoLuongDefault ||
      isLoadingTrangThaiDefault ||
      isLoadingTienTrinhDefault ? (
        <Loading />
      ) : (
        <UI.Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <UI.Container maxWidth="md">
            <UI.Box mb={4}>
              <UI.Box sx={{ mb: 4 }}>
                <UI.Button
                  onClick={() => navigate(-1)}
                  startIcon={<AiOutlineArrowLeft />}
                >
                  Quay lại
                </UI.Button>
              </UI.Box>
              <UI.Grid container justifyContent="space-between" spacing={3}>
                <UI.Grid
                  item
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    overflow: "hidden",
                  }}
                >
                  <div>
                    <UI.Typography variant="h5">{coHoi?.name}</UI.Typography>
                    <UI.Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <UI.Typography variant="subtitle2">
                        Mã cơ hội:
                      </UI.Typography>
                      <UI.Chip
                        label={coHoi?.code}
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </UI.Box>
                  </div>
                </UI.Grid>
                <UI.Grid item sx={{ m: -1 }}>
                  {isView ? (
                    <UI.Button
                      component="a"
                      endIcon={<FaPencilAlt fontSize="small" />}
                      sx={{ m: 1 }}
                      variant="outlined"
                      onClick={() => {
                        setView(!isView);
                      }}
                    >
                      {"Edit"}
                    </UI.Button>
                  ) : (
                    <LoadingButton
                      loading={result?.status == "pending"}
                      loadingPosition="end"
                      form="co-hoi-details"
                      type="submit"
                      endIcon={<FaSave fontSize="small" />}
                      sx={{ m: 1 }}
                      variant="outlined"
                    >
                      {"Save"}
                    </LoadingButton>
                  )}
                  <UI.Button
                    endIcon={<BsChevronDown fontSize="small" />}
                    sx={{ m: 1 }}
                    variant="contained"
                  >
                    Actions
                  </UI.Button>
                </UI.Grid>
              </UI.Grid>
            </UI.Box>
            <UI.Divider />
            <UI.Box sx={{ mt: 3 }}>
              <UI.Grid container spacing={3}>
                <UI.Grid item xs={12}>
                  <Collapse in={isView}>
                    <CoHoiBasicDetails
                      title="Chi tiết cơ hội"
                      rows={rowsData}
                    />
                  </Collapse>
                  <Collapse in={!isView}>
                    <BaseForm
                      id="co-hoi-details"
                      gap={theme.spacing(4)}
                      templateColumns="repeat(6,1fr)"
                      defaultValues={coHoi}
                      onSubmit={(value) => {
                        console.log("submit co hoi details");
                        updateCoHoiByID({
                          ...coHoi,
                          ...value,
                          soluong: value.soluong.value,
                          trang_thai_key: value.trang_thai_key.value,
                          tien_trinh_key: value.tien_trinh_key.value,
                        });
                      }}
                      //@ts-ignore
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
                        {
                          name: "note",
                          type: "text-editor",
                          label: "Diễn giải",
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
                    ></BaseForm>
                  </Collapse>
                </UI.Grid>
              </UI.Grid>
            </UI.Box>
          </UI.Container>
        </UI.Box>
      )}
    </>
  );
};

export default CoHoiDetailsContainer;
