import React from "react";
import * as UI from "@/libs/ui";

function AddBaoGia() {
  return (
    <UI.Box sx={{ mb: 4 }}>
      <UI.Grid container justifyContent="space-between" spacing={3}>
        <UI.Grid item>
          <UI.Typography variant="h4">Thêm mới báo giá</UI.Typography>
        </UI.Grid>
      </UI.Grid>
    </UI.Box>
  );
}

export default AddBaoGia;
