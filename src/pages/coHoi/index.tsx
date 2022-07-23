import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as UI from "@/libs/ui";

function CoHoiPage() {
  return (
    <>
      <Helmet>
        <title>Cơ Hội | CRM APP</title>
      </Helmet>
      <UI.CKBox
        sx={{
          flexGrow: 1,
          pt: 3,
        }}
      >
        <Outlet />
      </UI.CKBox>
    </>
  );
}

export default CoHoiPage;
