import React from "react";
import { Outlet } from "react-router-dom";

function ProductRoot() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default ProductRoot;
