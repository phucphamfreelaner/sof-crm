import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootPage from "@/pages";
import Product from "@/pages/product";
import ProductList from "@/pages/product/list";
import ProductsItem from "@/pages/product/id";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />}>
          <Route path="product" element={<Product />}>
            <Route index element={<ProductList />} />
            <Route path=":productId" element={<ProductsItem />} />
            <Route path="productNew" element={<ProductsItem />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
