import React from "react";
import { Outlet } from "react-router-dom";
import * as UI from "@/libs/ui";

import Sidebar from "@/components/Sidebar";

function Root() {
  return (
    <UI.HStack w="100vw" h="100vh" overflow="hidden" alignItems="flex-start">
      <UI.CKBox h="100%" bg="#e6e6e6">
        <Sidebar width="300px" />
      </UI.CKBox>
      <UI.CKBox h="100%" bg="white" flexGrow={1}>
        <Outlet />
      </UI.CKBox>
    </UI.HStack>
  );
}

export default Root;
