import React from "react";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  Provider,
} from "react-redux";

import { customerService, customerSlice } from "./customer";
import { cohoiService, cohoiSlice } from "./cohoi";
import { congTyService } from "./congTy";
import { authService } from "./auth";
import { loaiBaoGiaService } from "./loaiBaoGia";
import { ngonNguService } from "./ngonNgu";
import { quocGiaService } from "./quocGia";
import { thanhPhoService } from "./thanhPho";
import { loaiTienGiaService } from "./loaiTien";
import { danhXungService } from "./danhXung";

// @ts-ignore
const store: any = configureStore({
  reducer: combineReducers({
    customer: customerSlice.reducer,
    cohoi: cohoiSlice.reducer,
    [customerService.reducerPath]: customerService.reducer,
    [cohoiService.reducerPath]: cohoiService.reducer,
    [authService.reducerPath]: authService.reducer,
    [congTyService.reducerPath]: congTyService.reducer,
    [loaiBaoGiaService.reducerPath]: loaiBaoGiaService.reducer,
    [ngonNguService.reducerPath]: ngonNguService.reducer,
    [quocGiaService.reducerPath]: quocGiaService.reducer,
    [thanhPhoService.reducerPath]: thanhPhoService.reducer,
    [loaiTienGiaService.reducerPath]: loaiTienGiaService.reducer,
    [danhXungService.reducerPath]: danhXungService.reducer,
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
