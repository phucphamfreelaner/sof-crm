import React from "react";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

function CoHoiPage() {
  return (
    <>
      <Helmet>
        <title>Báo giá | CRM APP</title>
      </Helmet>
      <Outlet />
    </>
  );
}

export default CoHoiPage;
