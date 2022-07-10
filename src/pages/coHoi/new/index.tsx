import React from "react";
import CoHoiNewContainer from "@/container/CoHoiNew";
import * as UI from "@/libs/ui";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

function CoHoiNew() {
  const navigate = useNavigate();

  return (
    <>
      <UI.Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <UI.Container maxWidth="md">
          <UI.Box mb={4}>
            <UI.Box sx={{ mb: 4 }}>
              <UI.Button
                onClick={() => navigate(-1)}
                startIcon={<AiOutlineArrowLeft />}
              >
                Quay lại
              </UI.Button>
              <UI.Typography variant="h4">Thêm mới cơ hội</UI.Typography>
            </UI.Box>
          </UI.Box>
          <UI.Divider />
          <UI.Box sx={{ mt: 3 }}>
            <UI.Grid container spacing={3}>
              <UI.Grid item xs={12}>
                <CoHoiNewContainer />
              </UI.Grid>
            </UI.Grid>
          </UI.Box>
        </UI.Container>
      </UI.Box>
    </>
  );
}

export default CoHoiNew;
