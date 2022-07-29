import React from "react";
import * as UI from "@/libs/ui";
import {
  AiOutlineClose,
  AiOutlineMinus,
  AiOutlineExpand,
} from "react-icons/ai";
import { useBoolean } from "ahooks";

interface IWindowPopup {
  id: number | string;
  title: string;
  onClose?: (data: any) => any;
  children?: React.ReactNode;
  width?: string | number;
  height?: string | number;
}

function WindowPopup(props: IWindowPopup) {
  const { title, onClose, children, id, width, height } = props;
  const { palette } = UI.useTheme();
  const [isOpen, setOpen] = useBoolean(true);
  const handleMinimize = () => {
    setOpen.toggle();
  };
  return (
    <UI.VStack
      borderRadius="4px"
      border="1px solid #e9e9e9"
      background="white"
      maxW={isOpen ? width : "300px"}
      maxH={height}
      overflow="hidden"
    >
      <UI.HStack
        px="14px"
        py="4px"
        justifyContent="space-between"
        bg={palette?.grey[100]}
        w="100%"
      >
        <UI.Typography sx={{ fontWeight: 600, color: "text.secondary" }}>
          {title}
        </UI.Typography>
        <UI.Box sx={{ display: "flex", alignItems: "center" }}>
          <UI.IconButton onClick={handleMinimize}>
            {!isOpen ? (
              <AiOutlineExpand size="16px" />
            ) : (
              <AiOutlineMinus size="16px" />
            )}
          </UI.IconButton>
          <UI.IconButton onClick={() => onClose?.(id)}>
            <AiOutlineClose size="16px" />
          </UI.IconButton>
        </UI.Box>
      </UI.HStack>
      <UI.Collapse sx={{ margin: "0 !important" }} in={isOpen}>
        <UI.Box>{children}</UI.Box>
      </UI.Collapse>
    </UI.VStack>
  );
}

export default WindowPopup;
