import React from "react";
import * as UI from "@/libs/ui";
import { MdClose } from "react-icons/md";
import WindowPopup from "@/components/WindowPopup";
interface IDrawerBottom {
  composeOpen?: boolean;
  toggleComposeOpen?: () => any;
  handleMinimize?: () => any;
  handlePopupClose?: () => any;
  title?: string;
  children?: React.ReactNode;
  modalsBottom?: any[];
  onCloseWindow?: (id: any) => any;
}

function DrawerBottom(props: IDrawerBottom) {
  const {
    composeOpen,
    toggleComposeOpen,
    modalsBottom,
    handleMinimize,
    handlePopupClose,
    title,
    children,
  } = props;
  return (
    <UI.Drawer
      hideBackdrop
      anchor="bottom"
      open={composeOpen}
      variant="temporary"
      onClose={toggleComposeOpen}
      sx={{
        top: "auto",
        left: "auto",
        right: "1rem",
        bottom: "1.5rem",
        display: "block",
        background: "transparent",
        ".MuiDrawer-paper": {
          background: "transparent",
          boxShadow: "none",
        },
        zIndex: (theme) => `${theme.zIndex.drawer} + 1`,
        "& .MuiDrawer-paper": {
          borderRadius: 1,
          position: "static",
          width: "auto",
        },
      }}
    >
      <UI.HStack
        alignItems="flex-end"
        spacing={0}
        gap="18px"
        background="transparent"
      >
        {modalsBottom?.map?.((modal) => (
          <WindowPopup
            id={modal?.id}
            width={modal?.width}
            height={modal?.height}
            key={modal?.id}
            title={modal?.title}
            onClose={modal?.onClose}
          >
            {modal?.content}
          </WindowPopup>
        ))}
      </UI.HStack>
    </UI.Drawer>
  );
}

export default DrawerBottom;
