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
import HopDong from "@/pages/hopDong";
import HopDongDetail from "@/pages/hopDong/id";
import HopDongDetailView from "@/pages/hopDong/id/view";
import HopDongNew from "@/pages/hopDong/new";
import HopDongDetailInfo from "@/pages/hopDong/id/info";
import CoHoiNew from "@/pages/coHoi/new";

import ThongTinCoban from "@/pages/customer/id/thongTinCoban";
import ThongTinCongTy from "@/pages/customer/id/thongTinCongTy";
import KhachHangCoHoi from "@/pages/customer/id/coHoi";
import KhachHangBaoGia from "@/pages/customer/id/baoGia";
import KhachHangHopDong from "@/pages/customer/id/hopDong";

import KhachHangLichHen from "@/pages/customer/id/lichHen";
import LichHen from "@/pages/lichHen";
import LichHenlist from "@/pages/lichHen/list";
import LichHenNew from "@/pages/lichHen/new";

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
              <Route path="lich_hen" element={<KhachHangLichHen />} />
            </Route>
            <Route path="list" element={<Customer />} />
            <Route path="new" element={<CustomerNew />} />
          </Route>
          <Route path="hop_dong" element={<HopDong />}>
            <Route index element={<HopDongList />} />
            <Route path="new" element={<HopDongNew />} />
            <Route path=":id" element={<HopDongDetail />}>
              <Route index element={<HopDongDetailInfo />} />
              <Route path="view" element={<HopDongDetailView />} />
            </Route>
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
          <Route path="lich_hen" element={<LichHen />}>
            <Route index element={<LichHenlist />} />
            <Route path="new" element={<LichHenNew />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
