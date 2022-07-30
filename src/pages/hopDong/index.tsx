import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Box, Container } from "@mui/material";

function HopDongPage() {
  return (
    <>
      <Helmet>
        <title>Khách hàng | CRM APP</title>
      </Helmet>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: 3,
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}

export default HopDongPage;
