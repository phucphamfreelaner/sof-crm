import React from "react";
import { Outlet } from "react-router-dom";

function ProductRoot() {
  return (
    <div>
      This is ProductRoot
      <Outlet />
    </div>
  );
}

export default ProductRoot;
