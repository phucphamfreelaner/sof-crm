import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";

function ProductRoot() {
  return (
    <>
      <Helmet>
        <title>Khách hàng | CRM APP</title>
      </Helmet>
      <Outlet />
    </>
  );
}

export default ProductRoot;
