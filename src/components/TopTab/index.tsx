import React from "react";
import * as UI from "@/libs/ui";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AiFillPlusCircle,
  AiOutlineUser,
  AiOutlineFileDone,
  AiOutlineFileSync,
} from "react-icons/ai";
import { FaRegLightbulb } from "react-icons/fa";

function TopTab() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [currentTab, setCurrentTab] = React.useState("");

  const tabs = [
    {
      label: ({ currentTab }) => (
        <UI.HStack>
          <AiOutlineUser size="16px" />
          {currentTab !== "/khach_hang" && (
            <UI.Typography variant="body2">Khách hàng</UI.Typography>
          )}
        </UI.HStack>
      ),
      value: "/khach_hang",
      icon: AiFillPlusCircle,
    },
    {
      label: ({ currentTab }) => {
        return (
          <UI.HStack>
            <FaRegLightbulb size="16px" />
            {currentTab !== "/co_hoi" && (
              <UI.Typography variant="body2">Cơ hội</UI.Typography>
            )}
          </UI.HStack>
        );
      },
      value: "/co_hoi",
      icon: AiFillPlusCircle,
    },
    {
      label: ({ currentTab }) => (
        <UI.HStack>
          <AiOutlineFileSync size="16px" />
          {currentTab !== "/bao_gia" && (
            <UI.Typography variant="body2">Báo giá</UI.Typography>
          )}
        </UI.HStack>
      ),
      value: "/bao_gia",
      icon: AiFillPlusCircle,
    },
    {
      label: ({ currentTab }) => (
        <UI.HStack>
          <AiOutlineFileDone size="16px" />
          {currentTab !== "/hop_dong" && (
            <UI.Typography variant="body2">Hợp đồng</UI.Typography>
          )}
        </UI.HStack>
      ),
      value: "/hop_dong",
      icon: AiFillPlusCircle,
    },
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
    <UI.CKBox bg="white">
      <UI.Tabs
        indicatorColor="primary"
        onChange={handleTabsChange}
        scrollButtons="auto"
        sx={{ ml: 2, minHeight: "36px" }}
        textColor="primary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <UI.Tab
            key={tab.value}
            label={tab.label({ currentTab })}
            value={tab.value}
            sx={{ p: 0, minHeight: "36px" }}
          />
        ))}
      </UI.Tabs>
      <UI.Divider />
    </UI.CKBox>
  );
}

export default TopTab;
