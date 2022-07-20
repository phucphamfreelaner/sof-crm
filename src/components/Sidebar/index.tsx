import * as UI from "@/libs/ui";
import { BiTask } from "react-icons/bi";
import { AiOutlineAppstore } from "react-icons/ai";
import { HiChevronDoubleLeft } from "react-icons/hi";

import { DashboardSidebarSection } from "./SidebarSection";
import { Link } from "react-router-dom";
import Logo from "@/assets/images/logo-capa-group.png";

interface ISidebar {
  width?: string | number;
  onBackToAppLibs?: () => any;
  onCollapse?: () => any;
}

const sections = [
  {
    title: "Quản lý Nghiệp vụ",
    items: [
      {
        title: "CRM",
        icon: <BiTask width={20} />,
        path: "/",
      },
    ],
  },
];

function Sidebar(props: ISidebar) {
  const { width, onBackToAppLibs, onCollapse } = props;
  const { spacing } = UI.useTheme();
  return (
    <UI.VStack
      w="100%"
      alignItems="flex-start"
      justifyContent="space-between"
      sx={{ width, height: "100%", backgroundColor: "rgb(15 24 39)" }}
    >
      <UI.VStack w="100%" spacing={0}>
        <UI.Box>
          <Link
            to="/"
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img width="90%" src={Logo} />
          </Link>
        </UI.Box>
        <UI.HStack
          onClick={onCollapse}
          cursor="pointer"
          justifyContent="flex-end"
          sx={{ width: "100%", opacity: 0.4, py: "14px", px: "20px" }}
          _hover={{ opacity: 1 }}
        >
          <HiChevronDoubleLeft fontSize="22px" color="white" />
          <UI.Typography variant="body2" color="white">
            Thu gọn menu
          </UI.Typography>
        </UI.HStack>
        {sections.map((section) => (
          <DashboardSidebarSection
            key={section.title}
            path={"/app/crm"}
            {...section}
          />
        ))}
      </UI.VStack>

      <UI.HStack p={spacing(2)} w="100%">
        <UI.Button
          onClick={onBackToAppLibs}
          startIcon={<AiOutlineAppstore />}
          variant="contained"
          fullWidth
        >
          App Library
        </UI.Button>
      </UI.HStack>
    </UI.VStack>
  );
}

export default Sidebar;
