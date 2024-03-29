import React from "react";
import * as UI from "@/libs/ui";
import {
  AiOutlineClose,
  AiOutlineMinus,
  AiOutlineExpand,
} from "react-icons/ai";
import { useBoolean } from "ahooks";
import CoHoiNew from "@/container/CoHoiForm";
import SendEmailForm from "@/container/SendEmailForm";
import SendSmsForm from "@/container/SendSmsForm";
import BaoGiaNew from "@/container/BaoGiaNew";
import LichHenNew from "@/container/LichHenNew";

interface IWindowPopup {
  id: number | string;
  title: string;
  onClose?: (data: any) => any;
  children?: React.ReactNode;
  width?: string | number;
  height?: string | number;
  [type: string]: any;
}

function WindowPopup(props: IWindowPopup) {
  const {
    title,
    onClose,
    children,
    id,
    width,
    height,
    type,
    onAfterCreate,
    ...other
  } = props;
  const { palette } = UI.useTheme();
  const [isOpen, setOpen] = useBoolean(true);
  const handleMinimize = () => {
    setOpen.toggle();
  };
  const CONTENT = {
    "co-hoi-new": (
      <CoHoiNew
        gap="14px"
        size="small"
        modalId={id}
        customerId={other?.customerId}
      />
    ),
    "bao-gia-new": (
      <BaoGiaNew
        gap="14px"
        size="small"
        modalId={id}
        customerId={other?.customerId}
      />
    ),
    "email-new": (
      <SendEmailForm
        gap="16px"
        size="small"
        recordId={other?.recordId}
        customerId={other?.customerId}
        objectId={other?.objectId}
        isUploadFile={other?.isUploadFile}
        modalId={id}
        file={other?.file}
      />
    ),
    "sms-new": (
      <SendSmsForm
        gap="16px"
        size="small"
        customerId={other?.customerId}
        recordId={other?.recordId}
        objectId={other?.objectId}
        modalId={id}
      />
    ),
    "event-new": (
      <LichHenNew
        object="customers"
        elevation={0}
        size="small"
        onAfterCreate={onAfterCreate}
      />
    ),
  };
  const COMPONENT = CONTENT?.[type] || <></>;

  return (
    <UI.VStack
      borderRadius="4px"
      border="1px solid #e9e9e9"
      background="white"
      maxW={isOpen ? width : "300px"}
      minW={isOpen ? width : "300px"}
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
        <UI.CKBox p="16px">{COMPONENT}</UI.CKBox>
      </UI.Collapse>
    </UI.VStack>
  );
}

export default WindowPopup;
