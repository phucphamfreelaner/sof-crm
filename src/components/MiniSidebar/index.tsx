import * as UI from "@/libs/ui";
import { HiChevronDoubleRight, HiUsers } from "react-icons/hi";
import { AiOutlineAppstore } from "react-icons/ai";

import SidebarItem from "./SidebarItem";

function Minibar({
  onClickItem,
  onExpand,
}: {
  onClickItem?: (path: string) => any;
  onExpand?: () => any;
}) {
  const { spacing } = UI.useTheme();
  return (
    <UI.VStack
      justifyContent="space-between"
      sx={{
        width: "70px",
        height: "100%",
        backgroundColor: "rgb(15 24 39)",
        py: "6px",
      }}
    >
      <UI.VStack spacing="20px">
        <UI.IconButton onClick={onExpand}>
          <HiChevronDoubleRight fontSize="22px" />
        </UI.IconButton>
        <SidebarItem
          onClickItem={onClickItem}
          icon={<HiUsers fontSize="22px" />}
        />
      </UI.VStack>
      <UI.Box p={spacing(2)}>
        <UI.IconButton sx={{ background: "#5048e5" }} onClick={onExpand}>
          <AiOutlineAppstore color="white" fontSize="22px" />
        </UI.IconButton>
      </UI.Box>
    </UI.VStack>
  );
}

export default Minibar;
