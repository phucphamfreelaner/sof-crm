import { useState, useEffect } from "react";
import * as UI from "@/libs/ui";
import { BsChevronDown } from "react-icons/bs";
import { FaPencilAlt, FaSave } from "react-icons/fa";
import { CustomerBasicDetails } from "@/components/CustomerBasicDetails";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useGetCustomerByIdQuery } from "@/store/customer/service";
import { useParams } from "react-router-dom";
import Loading from "@/components/Loading";
import BaseForm from "@/components/BaseForm";
import { Collapse } from "@mui/material";
import { useLazyGetQuocGiaListQuery } from "@/store/quocGia/service";
import { useLazyGetThanhPhoListQuery } from "@/store/thanhPho/service";

const getInitials = (name = "") =>
  name
    .replace(/\s+/, " ")
    .split(" ")
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join("");

const CustomerDetailsContainer = () => {
  const params = useParams();
  const theme = UI.useTheme();
  const [isNotEdit, setNotEdit] = useState(true);
  const [defaultCompletionValue, setDefaultCompletionValue] =
    useState<any>(null);
  const { data: customer, isFetching } = useGetCustomerByIdQuery({
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

  const [
    searchThanhPho,
    {
      data: thanhPhoData,
      isLoading: isLoadingThanhPho,
      isFetching: isFetchingThanhPho,
    },
  ] = useLazyGetThanhPhoListQuery();

  useEffect(() => {
    searchQuocGia({ name: "" });
    searchThanhPho({ name: "" });
  }, []);

  useEffect(() => {
    if (quocGiaData && thanhPhoData) {
      setDefaultCompletionValue((value) => ({
        ...value,
        quocGia: quocGiaData,
        thanhPho: thanhPhoData,
      }));
    }
  }, [quocGiaData, thanhPhoData]);

  let rowsData = [
    {
      name: "danh_xung",
      type: "input",
      label: "Danh Xưng",
      defaultValues: customer?.danh_xung?.name,
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
      defaultValues: defaultCompletionValue?.thanhPho?.[customer?.thanhpho_key],
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
      defaultValues: defaultCompletionValue?.quocGia?.[customer?.quocgia_key],
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

  return (
    <>
      {isFetching ? (
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
                <Link
                  color="textPrimary"
                  style={{
                    alignItems: "center",
                    display: "flex",
                  }}
                  to={"/khach_hang"}
                >
                  <IoMdArrowRoundBack fontSize="md" />
                  <UI.Typography
                    variant="subtitle2"
                    ml={1}
                    sx={{ cursor: "pointer" }}
                  >
                    Quay lại
                  </UI.Typography>
                </Link>
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
                    {getInitials(customer?.contact)}
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
                  <UI.Button
                    component="a"
                    endIcon={
                      isNotEdit ? (
                        <FaPencilAlt fontSize="small" />
                      ) : (
                        <FaSave fontSize="small" />
                      )
                    }
                    sx={{ m: 1 }}
                    variant="outlined"
                    onClick={() => {
                      setNotEdit(!isNotEdit);
                    }}
                  >
                    {isNotEdit ? "Edit" : "Save"}
                  </UI.Button>
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
                  <Collapse in={isNotEdit}>
                    <CustomerBasicDetails rows={rowsData} />
                  </Collapse>
                  <Collapse in={!isNotEdit}>
                    <BaseForm
                      gap={theme.spacing(4)}
                      templateColumns="repeat(2,1fr)"
                      defaultValues={defaultValues}
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

export default CustomerDetailsContainer;
