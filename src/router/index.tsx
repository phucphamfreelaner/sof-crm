import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootPage from "@/pages";
import Customer from "@/pages/customer";
import CustomerList from "@/pages/customer/list";
import CustomerItem from "@/pages/customer/id";
import CoHoi from "@/pages/coHoi";
import CoHoiList from "@/pages/coHoi/list";
import CoHoiItem from "@/pages/coHoi/id";
import BaoGia from "@/pages/baoGia";
import BaoGiaList from "@/pages/baoGia/list";
import BaoGiaNew from "@/pages/baoGia/new";

function Router() {
  return (
    <BrowserRouter basename="/app/crm">
      <Routes>
        <Route path="/" element={<RootPage />}>
          <Route path="khach_hang" element={<Customer />}>
            <Route index element={<CustomerList />} />
            <Route path=":customerId" element={<CustomerItem />} />
            <Route path="list" element={<Customer />} />
          </Route>
          <Route path="co_hoi" element={<CoHoi />}>
            <Route index element={<CoHoiList />} />
            <Route path=":coHoiId" element={<CoHoiItem />} />
          </Route>
          <Route path="bao_gia" element={<BaoGia />}>
            <Route index element={<BaoGiaList />} />
            <Route path="new" element={<BaoGiaNew />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
