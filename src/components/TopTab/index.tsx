import React from "react";
import * as UI from "@/libs/ui";
import { useNavigate, useLocation } from "react-router-dom";
import { AiFillPlusCircle, AiOutlineUser } from "react-icons/ai";
import { FaRegLightbulb } from "react-icons/fa";
import { MdOutlineNoteAdd } from "react-icons/md";

function TopTab() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [currentTab, setCurrentTab] = React.useState("");

  const tabs = [
    {
      label: (
        <UI.HStack>
          <AiOutlineUser size="20px" />
          <UI.Typography variant="subtitle1">DS khách hàng</UI.Typography>
        </UI.HStack>
      ),
      value: "/khach_hang",
      icon: AiFillPlusCircle,
    },
    {
      label: (
        <UI.HStack>
          <FaRegLightbulb size="20px" />
          <UI.Typography variant="subtitle1">Cơ hội</UI.Typography>
        </UI.HStack>
      ),
      value: "/co_hoi",
      icon: AiFillPlusCircle,
    },
    {
      label: (
        <UI.HStack>
          <MdOutlineNoteAdd size="20px" />
          <UI.Typography variant="subtitle1">Báo giá</UI.Typography>
        </UI.HStack>
      ),
      value: "/bao_gia",
      icon: AiFillPlusCircle,
    },
    {
      label: (
        <UI.HStack>
          <MdOutlineNoteAdd size="20px" />
          <UI.Typography variant="subtitle1">Hợp đồng</UI.Typography>
        </UI.HStack>
      ),
      value: "/hop_dong",
      icon: AiFillPlusCircle,
    },
    // { label: "Đánh giá", value: "danh_gia", icon: AiFillPlusCircle },
  ];

  const handleTabsChange = (__, value: any) => {
    setCurrentTab(value);
    if (value === "thong_tin_co_ban") navigate("");
    else navigate(value);
  };

  React.useEffect(() => {
    setCurrentTab(pathname);
  }, [pathname]);

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
