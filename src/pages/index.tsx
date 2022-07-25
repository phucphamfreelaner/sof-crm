import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useBoolean } from "ahooks";
import { isNull } from "lodash-es";
import { Helmet } from "react-helmet";

import { LOCAL_KEY } from "@/constants";
import { navigateOutside } from "@/helper";

import * as UI from "@/libs/ui";
import Sidebar from "@/components/Sidebar";
import MiniSidebar from "@/components/MiniSidebar";
import TopTab from "@/components/TopTab";
import ModalProvider from "@/modal";

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
    <>
      <Helmet>
        <link
          href="https://cdn.jsdelivr.net/npm/suneditor@latest/dist/css/suneditor.min.css"
          rel="stylesheet"
        />
      </Helmet>
      <UI.HStack
        spacing={0}
        w="100vw"
        h="100vh"
        overflow="hidden"
        alignItems="flex-start"
      >
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
        <ModalProvider>
          <UI.CKBox h="100%" bg="#f6f7fa" overflow="auto" flexGrow={1}>
            <TopTab />
            <Outlet />
          </UI.CKBox>
        </ModalProvider>
      </UI.HStack>
    </>
  );
}

export default Root;
