import { useState, useEffect } from "react";
import * as UI from "@/libs/ui";
import { BsChevronDown } from "react-icons/bs";
import { FaPencilAlt, FaSave } from "react-icons/fa";
import { CustomerBasicDetails } from "@/components/CustomerBasicDetails";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
  useGetCustomerByIdQuery,
  useUpdateCustomerByIDMutation,
} from "@/store/customer/service";
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
import CustomerCohoiTableListContainer from "./customer-co-hoi";

const getInitials = (name = "") =>
  name
    .replace(/\s+/, " ")
    .split(" ")
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join("");

const tabs = [
  { label: "Thông tin cơ bản", value: "thong_tin_co_ban" },
  { label: "Cơ hội", value: "co_hoi" },
  { label: "Báo giá", value: "bao_gia" },
  { label: "Hợp đồng", value: "hop_dong" },
  { label: "Tiến độ sản xuất", value: "tien_do" },
  { label: "Phiếu thu", value: "phieu_thu" },
  { label: "Phiếu giao hàng", value: "phieu_giao_hang" },
  { label: "Ecommercial Invoice", value: "invoice" },
  { label: "Thông tin chi tiết công ty", value: "thong_tin_cong_ty" },
  { label: "Logs", value: "logs" },
];

const CustomerDetailsContainer = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("thong_tin_co_ban");
  const theme = UI.useTheme();
  const [isView, setView] = useState(true);
  const {
    data: customer,
    isLoading: isLoadingCustomer,
    refetch,
  } = useGetCustomerByIdQuery({
    id: params?.customerId,
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

  let defaultValues = rowsData.reduce(
    (o, item) => ({ ...o, [item.name]: item.defaultValues }),
    {}
  );

  const [updateCustomerByID, result] = useUpdateCustomerByIDMutation();

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  useEffect(() => {
    if (result?.status == "fulfilled") {
      setView(!isView);
      refetch();
    }
  }, [result]);

  return (
    <>
      {isLoadingCustomer ||
      isLoadingThanhPhoDefault ||
      isLoadingQuocGiaDefault ? (
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
                  <UI.Avatar
                    sx={{
                      height: 64,
                      mr: 2,
                      width: 64,
                    }}
                  >
                    {getInitials(customer?.contact ? customer?.contact : "UK")}
                  </UI.Avatar>
                  <div>
                    <UI.Typography variant="h5">
                      {customer?.contact}
                    </UI.Typography>
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
                        label={customer?.code}
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
              <UI.Tabs
                indicatorColor="primary"
                onChange={handleTabsChange}
                scrollButtons="auto"
                sx={{ mt: 3 }}
                textColor="primary"
                value={currentTab}
                variant="scrollable"
              >
                {tabs.map((tab) => (
                  <UI.Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
              </UI.Tabs>
            </UI.Box>
            <UI.Divider />
            <UI.Box sx={{ mt: 3 }}>
              {currentTab === "thong_tin_co_ban" && (
                <UI.Grid container spacing={3}>
                  <UI.Grid item xs={12}>
                    <Collapse in={isView}>
                      <CustomerBasicDetails rows={rowsData} />
                    </Collapse>
                    <Collapse in={!isView}>
                      <BaseForm
                        id="vinhnd"
                        gap={theme.spacing(4)}
                        templateColumns="repeat(2,1fr)"
                        defaultValues={defaultValues}
                        onSubmit={(value) => {
                          updateCustomerByID({
                            ...customer,
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
              )}
              {currentTab === "co_hoi" && (
                <CustomerCohoiTableListContainer
                  customerId={params?.customerId}
                />
              )}
            </UI.Box>
          </UI.Container>
        </UI.Box>
      )}
    </>
  );
};

export default CustomerDetailsContainer;
