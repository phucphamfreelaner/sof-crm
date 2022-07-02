import React from "react";
import { Link } from "react-router-dom";
import * as UI from "@/libs/ui";
import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { DashboardSidebarSection } from "./dashboard-sidebar-section";
import { HiUsers } from "react-icons/hi";
import { background } from "@chakra-ui/system";
import { red } from "@mui/material/colors";

interface ISidebar {
  width?: string | number;
}

const sections = [
  {
    title: "Management",
    icon: <HiUsers width={20} />,
    items: [
      {
        title: "Customers",
        path: "/customers",
        children: [
          {
            title: "DS Khách hàng",
            path: "/customers/",
          },
          {
            title: "Cơ hội",
            path: "/cohoi/list",
          },
          {
            title: "Báo giá",
            path: "/baogia/list",
          },
          {
            title: "Hợp đồng",
            path: "/hopdong/list",
          },
          {
            title: "Đánh giá",
            path: "/customers/review",
          },
        ],
      },
    ],
  },
];

function Sidebar(props: ISidebar) {
  const { width = "200px" } = props;
  return (
    // <UI.CKBox w={width}>
    //   <UI.VStack alignItems="flex-start">
    //     <Link to="customer">customer</Link>
    //     <Link to="customer/1">customer 1</Link>
    //   </UI.VStack>
    // </UI.CKBox>
    <Box sx={{ width, height: "100%", backgroundColor: "rgb(15 24 39)" }}>
      {sections.map((section) => (
        <DashboardSidebarSection key={section.title} path={""} {...section} />
      ))}
    </Box>
  );
}

export default Sidebar;
