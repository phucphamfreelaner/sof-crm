import React from "react";
import { Link } from "react-router-dom";
import * as UI from "@/libs/ui";

interface ISidebar {
  width?: string | number;
}

function Sidebar(props: ISidebar) {
  const { width = "200px" } = props;
  return (
    <UI.CKBox w={width}>
      <UI.VStack alignItems="flex-start">
        <Link to="customer">customer</Link>
        <Link to="customer/1">customer 1</Link>
      </UI.VStack>
    </UI.CKBox>
  );
}

export default Sidebar;
