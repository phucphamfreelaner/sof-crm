import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

function CoHoiPage() {
  return (
    <>
      <Helmet>
        <title>Cơ hội | CRM APP</title>
      </Helmet>
      <Outlet />
    </>
  );
}

export default CoHoiPage;
