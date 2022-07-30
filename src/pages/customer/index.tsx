import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

function ProductRoot() {
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

export default ProductRoot;
