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
    <UI.Box
      sx={{
        flexGrow: 1,
      }}
    >
      <UI.Grid
        sx={{ mb: 4 }}
        container
        justifyContent="space-between"
        spacing={3}
      >
        <UI.Grid item>
          <UI.Typography variant="h4">Danh Sách Hợp Đồng</UI.Typography>
        </UI.Grid>
      </UI.Grid>

      <UI.Card>
        <UI.Divider />
        <UI.CardContent>
          <HopDongListContainer />
        </UI.CardContent>
      </UI.Card>
    </UI.Box>
  );
}

export default HopDongList;
