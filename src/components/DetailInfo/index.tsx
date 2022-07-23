import React from "react";
import * as UI from "@/libs/ui";
import {
  AiOutlineEdit,
  AiOutlineSave,
  AiOutlineDownCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { useBoolean } from "ahooks";

interface IDetailInfo {
  id?: string;
  title?: string;
  editContent?: React.ReactNode;
  detailContent?: React.ReactNode;
  onSave?: () => any;
  isOpen?: boolean;
}
function DetailInfo(props: IDetailInfo) {
  const { editContent, detailContent, onSave, isOpen } = props;
  return (
    <UI.Box>
      <UI.Grid container spacing={3}>
        <UI.Grid item xs={12}>
          <UI.Collapse in={!isOpen}>{detailContent}</UI.Collapse>
          <UI.Collapse in={isOpen}>{editContent}</UI.Collapse>
        </UI.Grid>
      </UI.Grid>
    </UI.Box>
  );
}

export default DetailInfo;
