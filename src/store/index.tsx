import React from "react";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  Provider,
} from "react-redux";

import { customerService, customerSlice } from "./customer";
import { coHoiService, coHoiSlice } from "./coHoi";
import { congTyService } from "./congTy";
import { authService } from "./auth";
import { loaiBaoGiaService } from "./loaiBaoGia";
import { ngonNguService } from "./ngonNgu";
import { quocGiaService } from "./quocGia";
import { thanhPhoService } from "./thanhPho";
import { loaiTienGiaService } from "./loaiTien";
import { danhXungService } from "./danhXung";
import { khachHangService } from "./khachHang";
import { nhanVienService } from "./nhanVien";
import { sanPhamService } from "./sanPham";
import { chatLieuService } from "./chatLieu";
import { donViTinhService, useLazySearchDonViTinhQuery } from "./donViTinh";
import { testService } from "./test";
import { soLuongService } from "./soLuong";
import { trangThaiService } from "./trangThai";
import { tienTrinhService } from "./tienTrinh";

// @ts-ignore
const store: any = configureStore({
  reducer: combineReducers({
    customer: customerSlice.reducer,
    coHoi: coHoiSlice.reducer,
    [customerService.reducerPath]: customerService.reducer,
    [coHoiService.reducerPath]: coHoiService.reducer,
    [authService.reducerPath]: authService.reducer,
    [congTyService.reducerPath]: congTyService.reducer,
    [loaiBaoGiaService.reducerPath]: loaiBaoGiaService.reducer,
    [ngonNguService.reducerPath]: ngonNguService.reducer,
    [quocGiaService.reducerPath]: quocGiaService.reducer,
    [thanhPhoService.reducerPath]: thanhPhoService.reducer,
    [loaiTienGiaService.reducerPath]: loaiTienGiaService.reducer,
    [danhXungService.reducerPath]: danhXungService.reducer,
    [khachHangService.reducerPath]: khachHangService.reducer,
    [nhanVienService.reducerPath]: nhanVienService.reducer,
    [testService.reducerPath]: testService.reducer,
    [sanPhamService.reducerPath]: sanPhamService.reducer,
    [chatLieuService.reducerPath]: chatLieuService.reducer,
    [donViTinhService.reducerPath]: donViTinhService.reducer,
    [soLuongService.reducerPath]: soLuongService.reducer,
    [trangThaiService.reducerPath]: trangThaiService.reducer,
    [tienTrinhService.reducerPath]: tienTrinhService.reducer,
  }),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useAppDispatch = () => useReduxDispatch<AppDispatch>();

export const ReduxProvider = ({ children }: any) => (
  <Provider store={store}>{children}</Provider>
);
