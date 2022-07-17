import React from "react";
import * as UI from "@/libs/ui";
import { useNavigate } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";

function TopTab() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = React.useState("");
  const tabs = [
    { label: "DS khách hàng", value: "khach_hang", icon: AiFillPlusCircle },
    { label: "Cơ hội", value: "co_hoi", icon: AiFillPlusCircle },
    { label: "Báo giá", value: "bao_gia", icon: AiFillPlusCircle },
    { label: "Hợp đồng", value: "hop_dong", icon: AiFillPlusCircle },
    { label: "Đánh giá", value: "danh_gia", icon: AiFillPlusCircle },
  ];

  const handleTabsChange = (__, value: any) => {
    setCurrentTab(value);
    if (value === "thong_tin_co_ban") navigate("");
    else navigate(value);
  };

  return (
    <UI.Tabs
      indicatorColor="primary"
      onChange={handleTabsChange}
      scrollButtons="auto"
      sx={{ mt: 1, ml: 3 }}
      textColor="primary"
      value={currentTab}
      variant="scrollable"
    >
      {tabs.map((tab) => (
        <UI.Tab key={tab.value} label={tab.label} value={tab.value} />
      ))}
    </UI.Tabs>
  );
}

export default TopTab;
