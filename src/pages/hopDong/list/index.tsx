import React from "react";
import { useNavigate } from "react-router-dom";
import * as UI from "@/libs/ui";
import {
  AiFillPlusCircle,
  AiOutlineUpload,
  AiOutlineDownload,
} from "react-icons/ai";
import HopDongListContainer from "@/container/HopDongList";

function HopDongList() {
  const navigate = useNavigate();
  return (
    <UI.Box>
      <UI.Grid sx={{ py: 1 }} container justifyContent="space-between">
        <UI.Grid item>
          <UI.Typography variant="h4">Hợp Đồng</UI.Typography>
        </UI.Grid>
      </UI.Grid>

      <UI.Card>
        <UI.CKBox>
          <HopDongListContainer />
        </UI.CKBox>
      </UI.Card>
    </UI.Box>
  );
}

export default HopDongList;
