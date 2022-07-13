import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootPage from "@/pages";
import Customer from "@/pages/customer";
import CustomerList from "@/pages/customer/list";
import CustomerItem from "@/pages/customer/id";
import CustomerNew from "@/pages/customer/new";
import CoHoi from "@/pages/coHoi";
import CoHoiList from "@/pages/coHoi/list";
import CoHoiItem from "@/pages/coHoi/id";
import BaoGia from "@/pages/baoGia";
import BaoGiaList from "@/pages/baoGia/list";
import BaoGiaNew from "@/pages/baoGia/new";
import BaoGiaDetail from "@/pages/baoGia/id";
import BaoGiaDetailInfo from "@/pages/baoGia/id/info";
import BaoGiaDetailView from "@/pages/baoGia/id/view";

import HopDongList from "@/pages/hopDong/list";
import CoHoiNew from "@/pages/coHoi/new";

import ThongTinCoban from "@/pages/customer/id/thongTinCoban";
import ThongTinCongTy from "@/pages/customer/id/thongTinCongTy";
import KhachHangCoHoi from "@/pages/customer/id/coHoi";
import KhachHangBaoGia from "@/pages/customer/id/baoGia";
import KhachHangHopDong from "@/pages/customer/id/hopDong";

function Router() {
  return (
    <BrowserRouter basename="/app/crm">
      <Routes>
        <Route path="/" element={<RootPage />}>
          <Route path="khach_hang" element={<Customer />}>
            <Route index element={<CustomerList />} />
            <Route path=":customerId" element={<CustomerItem />}>
              <Route index element={<ThongTinCoban />} />
              <Route
                key="thong_tin_cong_ty"
                path="thong_tin_cong_ty"
                element={<ThongTinCongTy />}
              />
              <Route path="co_hoi" element={<KhachHangCoHoi />} />
              <Route path="bao_gia" element={<KhachHangBaoGia />} />
              <Route path="hop_dong" element={<KhachHangHopDong />} />
            </Route>
            <Route path="list" element={<Customer />} />
            <Route path="new" element={<CustomerNew />} />
          </Route>
          <Route path="hop_dong" element={<HopDongList />}>
            <Route index element={<CustomerList />} />
            <Route path=":hopDongId" element={<CustomerItem />} />
            <Route path="list" element={<HopDongList />} />
            <Route path="new" element={<CustomerNew />} />
          </Route>
          <Route path="co_hoi" element={<CoHoi />}>
            <Route index element={<CoHoiList />} />
            <Route path=":coHoiId" element={<CoHoiItem />} />
            <Route path="new" element={<CoHoiNew />} />
          </Route>
          <Route path="bao_gia" element={<BaoGia />}>
            <Route index element={<BaoGiaList />} />
            <Route path="new" element={<BaoGiaNew />} />
            <Route path=":id" element={<BaoGiaDetail />}>
              <Route index element={<BaoGiaDetailInfo />} />
              <Route path="view" element={<BaoGiaDetailView />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
