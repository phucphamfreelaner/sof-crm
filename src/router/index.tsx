import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootPage from "@/pages";
import Customer from "@/pages/customer";
import CustomerList from "@/pages/customer/list";
import CustomerItem from "@/pages/customer/id";
import Cohoi from "@/pages/cohoi";
import CohoiList from "@/pages/cohoi/list";

function Router() {
  return (
    <BrowserRouter basename="/app/crm">
      <Routes>
        <Route path="/" element={<RootPage />}>
          <Route path="customer" element={<Customer />}>
            <Route index element={<CustomerList />} />
            <Route path=":customerId" element={<CustomerItem />} />
            <Route path="customerNew" element={<CustomerItem />} />
          </Route>
          <Route path="cohoi" element={<Cohoi />}>
            <Route path="list" element={<CohoiList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
