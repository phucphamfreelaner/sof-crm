import { useState } from "react";
import * as UI from "@/libs/ui";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import CustomerCoHoiTableListContainer from "./customer-co-hoi";
import { useGetCustomerByIdQuery } from "@/store/customer";

import ThongTinCoBanTab from "./thong-tin-co-ban.tab";

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

  const handleTabsChange = (__, value: any) => setCurrentTab(value);

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
                src=""
              />

              <div>
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
              </div>
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
          {currentTab === "thong_tin_co_ban" && <ThongTinCoBanTab />}
          {currentTab === "co_hoi" && (
            <CustomerCoHoiTableListContainer customerId={params?.customerId} />
          )}
        </UI.Box>
      </UI.Container>
    </UI.Box>
  );
};

export default CustomerDetailsContainer;
