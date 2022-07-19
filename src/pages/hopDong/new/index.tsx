import React from "react";
import * as UI from "@/libs/ui";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import HopDongFormContainer from "@/container/HopDongNew";
import TextEditor from "@/components/TextEditor";

function AddHopDong() {
  const navigate = useNavigate();
  return (
    <UI.Box sx={{ mb: 4, width: "100%" }}>
      <UI.Grid container justifyContent="space-between" spacing={3}>
        <UI.Grid item>
          <UI.Button
            onClick={() => navigate(-1)}
            startIcon={<AiOutlineArrowLeft />}
          >
            Quay lại
          </UI.Button>
          <UI.Typography variant="h4">Thêm mới hợp đồng</UI.Typography>
        </UI.Grid>
      </UI.Grid>
      <UI.Box sx={{ mt: 5, width: "100%" }}>
        <TextEditor value="<h1>This is data</h1>" id="text-01" />
        <HopDongFormContainer />
      </UI.Box>
    </UI.Box>
  );
}

export default AddHopDong;
