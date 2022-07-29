import React from "react";
import * as UI from "@/libs/ui";
import { MdClose } from "react-icons/md";

interface IDrawerBottom {
  composeOpen?: boolean;
  toggleComposeOpen?: () => any;
  handleMinimize?: () => any;
  handlePopupClose?: () => any;
  title?: string;
  children?: React.ReactNode;
}

function DrawerBottom(props: IDrawerBottom) {
  const {
    composeOpen,
    toggleComposeOpen,
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
        zIndex: (theme) => `${theme.zIndex.drawer} + 1`,
        "& .MuiDrawer-paper": {
          borderRadius: 1,
          position: "static",
          width: "auto",
        },
      }}
    >
      <UI.Box
        sx={{
          px: 4,
          py: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          //   backgroundColor: (theme) =>
          //     `rgba(${theme.palette.customColors.main}, 0.08)`,
        }}
      >
        <UI.Typography sx={{ fontWeight: 600, color: "text.secondary" }}>
          {title}
        </UI.Typography>
        <UI.Box sx={{ display: "flex", alignItems: "center" }}>
          <UI.IconButton
            sx={{ p: 1, mr: 2, color: "action.active" }}
            onClick={handleMinimize}
          >
            <MdClose fontSize="small" />
          </UI.IconButton>
          <UI.IconButton
            sx={{ p: 1, color: "action.active" }}
            onClick={handlePopupClose}
          >
            <MdClose fontSize="small" />
          </UI.IconButton>
        </UI.Box>
      </UI.Box>
      <UI.Box
        sx={{
          py: 1,
          px: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        {children}
      </UI.Box>
    </UI.Drawer>
  );
}

export default DrawerBottom;
