import React from "react";
import * as UI from "@/libs/ui";

interface IDetailInfo {
  id?: string;
  title?: string;
  editContent?: React.ReactNode;
  detailContent?: React.ReactNode;
  onSave?: () => any;
  isOpen?: boolean;
}
function DetailInfo(props: IDetailInfo) {
  const { editContent, detailContent, isOpen } = props;
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
