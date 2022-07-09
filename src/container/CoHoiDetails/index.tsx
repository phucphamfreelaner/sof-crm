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
  useLazyGetQuocGiaListQuery,
  useGetQuocGiaListQuery,
} from "@/store/quocGia/service";
import {
  useLazyGetThanhPhoListQuery,
  useGetThanhPhoListQuery,
} from "@/store/thanhPho/service";
import { useLazyGetDanhXungListQuery } from "@/store/danhXung/service";
import * as Yup from "yup";

const getInitials = (name = "") =>
  name
    .replace(/\s+/, " ")
    .split(" ")
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join("");

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
      name: "first_name",
      type: "input",
      label: "Tên",
      defaultValues: coHoi?.name,
    },
    {
      name: "note",
      type: "input",
      label: "Diễn giải",
      defaultValues: coHoi?.note,
    },
  ];

  let defaultValues = rowsData.reduce(
    (o, item) => ({ ...o, [item.name]: item.defaultValues }),
    {}
  );

  const [updateCoHoiByID, result] = useUpdateCoHoiByIDMutation();

  useEffect(() => {
    if (result?.status == "fulfilled") {
      setView(!isView);
      refetch();
    }
  }, [result]);

  return (
    <>
      {isLoadingCoHoi || isLoadingThanhPhoDefault || isLoadingQuocGiaDefault ? (
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
                        Mã khách hàng:
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
                      form="vinhnd"
                      type="submit"
                      endIcon={<FaSave fontSize="small" />}
                      sx={{ m: 1 }}
                      variant="outlined"
                    >
                      {"Save"}
                    </LoadingButton>
                  )}
                  {/* <UI.Button
                    id="base-form"
                    component="a"
                    type="submit"
                    endIcon={
                      isView ? (
                        <FaPencilAlt fontSize="small" />
                      ) : (
                        <FaSave fontSize="small" />
                      )
                    }
                    sx={{ m: 1 }}
                    variant="outlined"
                    onClick={() => {
                      setView(!isView);
                    }}
                  >
                    {isView ? "Edit" : "Save"}
                  </UI.Button> */}
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
                    <CoHoiBasicDetails rows={rowsData} />
                  </Collapse>
                  <Collapse in={!isView}>
                    <BaseForm
                      id="vinhnd"
                      gap={theme.spacing(4)}
                      templateColumns="repeat(2,1fr)"
                      defaultValues={defaultValues}
                      onSubmit={(value) => {
                        updateCoHoiByID({
                          ...coHoi,
                          ...value,
                          quocgia_key: value.quocgia_key.value,
                          thanhpho_key: value.thanhpho_key.value,
                          danh_xung_key: value.danh_xung.value,
                        });
                      }}
                      schema={{
                        contact: Yup.string().required(
                          "Cách gọi khách hàng không được để trống"
                        ),
                      }}
                      //@ts-ignore
                      fields={rowsData}
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
