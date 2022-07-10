import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Box, Container } from "@mui/material";

function HopDongPage() {
  return (
    <>
      <Helmet>
        <title>Hợp Đồng | CRM APP</title>
      </Helmet>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </>
  );
}

export default HopDongPage;
