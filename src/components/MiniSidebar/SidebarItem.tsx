import React from "react";
import * as UI from "@/libs/ui";

interface ISidebarItem {
  icon?: React.ReactNode;
  subMenu?: ISubMenu[];
  onClickItem?: () => any;
}

interface ISubMenu {
  label?: string;
  to?: string;
}

function SidebarItem(props: ISidebarItem) {
  const { icon, onClickItem } = props;
  const [anchorEl, setAnchorEl] = React.useState<any>(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    onClickItem?.();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <UI.IconButton
        sx={{ width: "60px" }}
        aria-describedby={id}
        onClick={handleClick}
        // onMouseEnter={handleClick}
      >
        {icon}
      </UI.IconButton>
    </>
  );
}

export default SidebarItem;
