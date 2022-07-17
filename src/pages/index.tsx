import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import * as UI from "@/libs/ui";
import { useBoolean } from "ahooks";
import { navigateOutside } from "@/helper";
import { isNull } from "lodash-es";

import Sidebar from "@/components/Sidebar";
import MiniSidebar from "@/components/MiniSidebar";
import { LOCAL_KEY } from "@/constants";
import TopTab from "@/components/TopTab";

function Root() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useBoolean(
    Boolean(+localStorage.getItem(LOCAL_KEY.CUSTOMER_MENU_EXPAND))
  );

  React.useEffect(() => {
    const isExpand = localStorage.getItem(LOCAL_KEY.CUSTOMER_MENU_EXPAND);
    if (isNull(isExpand))
      localStorage.setItem(LOCAL_KEY.CUSTOMER_MENU_EXPAND, "1");
  }, []);

  React.useEffect(() => {
    if (pathname === "/") {
      navigate("/khach_hang", { replace: true });
    }
  }, [pathname]);

  return (
    <UI.HStack w="100vw" h="100vh" overflow="hidden" alignItems="flex-start">
      <UI.CKBox h="100%" bg="#e6e6e6">
        {open ? (
          <Sidebar
            onBackToAppLibs={() => navigateOutside("/app")}
            width="250px"
            onCollapse={() => {
              setOpen.setFalse();
              localStorage.setItem(LOCAL_KEY.CUSTOMER_MENU_EXPAND, "0");
            }}
          />
        ) : (
          <MiniSidebar
            onBackToAppLibs={() => navigateOutside("/app")}
            onExpand={() => {
              setOpen.setTrue();
              localStorage.setItem(LOCAL_KEY.CUSTOMER_MENU_EXPAND, "1");
            }}
            onClickItem={(path) => navigate(path)}
          />
        )}
      </UI.CKBox>
      <UI.CKBox h="100%" bg="white" overflow="auto" flexGrow={1}>
        <TopTab />
        <Outlet />
      </UI.CKBox>
    </UI.HStack>
  );
}

export default Root;
