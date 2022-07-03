import React from "react";
import * as UI from "@/libs/ui";
import { CUSTOMER_SUBMENU } from "@/constants";

interface ISidebarItem {
  icon?: React.ReactNode;
  subMenu?: ISubMenu[];
  onClickItem?: (path: string) => any;
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
        onMouseEnter={handleClick}
      >
        {icon}
      </UI.IconButton>
      <UI.Popover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <UI.Paper>
          <UI.List sx={{ width: "200px" }}>
            {CUSTOMER_SUBMENU.map((x, index) => (
              <UI.ListItem
                onClick={() => onClickItem(x.path)}
                key={index}
                disablePadding
              >
                <UI.ListItemButton>
                  <UI.ListItemText primary={x.title} />
                </UI.ListItemButton>
              </UI.ListItem>
            ))}
          </UI.List>
        </UI.Paper>
      </UI.Popover>
    </>
  );
}

export default SidebarItem;
