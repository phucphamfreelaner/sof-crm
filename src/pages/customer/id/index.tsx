import React from "react";
import * as UI from "@/libs/ui";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { Outlet, useParams, useNavigate, useLocation } from "react-router-dom";
import { useGetCustomerByIdQuery } from "@/store/customer";
import { values } from "lodash-es";

const tabs = [
  { label: "Thông tin", value: "thong_tin_co_ban" },
  //{ label: "Thông tin chi tiết công ty", value: "thong_tin_cong_ty" },
  { label: "Cơ hội", value: "co_hoi" },
  { label: "Báo giá", value: "bao_gia" },
  { label: "Hợp đồng", value: "hop_dong" },
  //{ label: "Lịch hẹn", value: "lich_hen" },

  // { label: "Tiến độ sản xuất", value: "tien_do" },
  // { label: "Phiếu thu", value: "phieu_thu" },
  // { label: "Phiếu giao hàng", value: "phieu_giao_hang" },
  // { label: "Ecommercial Invoice", value: "invoice" },
  // { label: "Logs", value: "logs" },
];

const getInitials = (name = "") =>
  name
    .replace(/\s+/, " ")
    .split(" ")
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join("");

function CustomerDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const [currentTab, setCurrentTab] = React.useState("");

  const handleTabsChange = (__, value: any) => {
    setCurrentTab(value);
    if (value === "thong_tin_co_ban") navigate("");
    else navigate(value);
  };

  React.useEffect(() => {
    const tabName = pathArray?.[pathArray?.length - 1];
    const isTab = tabs.map((x) => x.value).includes(tabName);
    if (isTab) setCurrentTab(tabName);
    else setCurrentTab("thong_tin_co_ban");
  }, [pathArray]);

  const { data: customer, isLoading: isLoadingCustomer } =
    useGetCustomerByIdQuery({
      id: params?.customerId,
    });

  return (
    <UI.Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <UI.Container>
        <UI.Box mb={4}>
          <UI.Box sx={{ mb: 1 }}>
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
                src=""
              >
                {" "}
                {getInitials(customer?.contact ? customer?.contact : "UK")}
              </UI.Avatar>
              <UI.Box>
                <UI.Typography variant="h5">{customer?.contact}</UI.Typography>
                <UI.Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <UI.Typography variant="subtitle2">
                    Mã khách hàng:
                  </UI.Typography>
                  <UI.Chip label={customer?.code} size="small" sx={{ ml: 1 }} />
                </UI.Box>
              </UI.Box>
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
          <UI.Divider />
        </UI.Box>

        <UI.Box sx={{ mt: 3 }}>
          <Outlet />
        </UI.Box>
      </UI.Container>
    </UI.Box>
  );
}

export default CustomerDetails;
