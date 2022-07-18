import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Box, Container } from "@mui/material";

function CoHoiPage() {
  return (
    <>
      <Helmet>
        <title>Báo giá | CRM APP</title>
      </Helmet>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 3,
        }}
      >
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </>
  );
}

export default CoHoiPage;
