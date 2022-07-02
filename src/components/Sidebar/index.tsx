import * as UI from "@/libs/ui";
import { DashboardSidebarSection } from "./SidebarSection";
import { HiUsers } from "react-icons/hi";
import { AiOutlineAppstore } from "react-icons/ai";

interface ISidebar {
  width?: string | number;
  onBackToAppLibs?: () => any;
}

const sections = [
  {
    title: "Quản lý Nghiệp vụ",
    items: [
      {
        title: "Khách hàng",
        icon: <HiUsers width={20} />,
        path: "/",
        children: [
          {
            title: "DS Khách hàng",
            path: "/customers",
          },
          {
            title: "Cơ hội",
            path: "/cohoi/list",
          },
          {
            title: "Báo giá",
            path: "/bao_gia",
          },
          {
            title: "Hợp đồng",
            path: "/hop_dong",
          },
          {
            title: "Đánh giá",
            path: "/danh_gia",
          },
        ],
      },
    ],
  },
];

function Sidebar(props: ISidebar) {
  const { width, onBackToAppLibs } = props;
  const { spacing } = UI.useTheme();
  return (
    <UI.VStack
      alignItems="flex-start"
      justifyContent="space-between"
      sx={{ width, height: "100%", backgroundColor: "rgb(15 24 39)" }}
    >
      {sections.map((section) => (
        <DashboardSidebarSection
          key={section.title}
          path={"/app/crm"}
          {...section}
        />
      ))}
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
