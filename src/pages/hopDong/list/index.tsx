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
        py: 8,
        px: 3,
      }}
    >
      <UI.Grid container justifyContent="space-between" spacing={3}>
        <UI.Grid item>
          <UI.Typography variant="h4">Danh Sách Hợp Đồng</UI.Typography>
        </UI.Grid>
        <UI.Grid item>
          <UI.Button
            onClick={() => navigate("/bao_gia/new")}
            size="small"
            startIcon={<AiFillPlusCircle fontSize="small" />}
            variant="contained"
          >
            Thêm mới
          </UI.Button>
        </UI.Grid>
      </UI.Grid>
      <UI.Box
        sx={{
          m: -1,
          mt: 3,
          mb: 4,
        }}
      >
        <UI.Button
          startIcon={<AiOutlineUpload fontSize="small" />}
          sx={{ m: 1 }}
        >
          Import
        </UI.Button>
        <UI.Button
          startIcon={<AiOutlineDownload fontSize="small" />}
          sx={{ m: 1 }}
        >
          Export
        </UI.Button>
      </UI.Box>
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
