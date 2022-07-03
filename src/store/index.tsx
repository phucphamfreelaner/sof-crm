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
import { authService } from "./auth";

// import { demoService, demoSlice } from "./demo";

// @ts-ignore
const store: any = configureStore({
  reducer: combineReducers({
    customer: customerSlice.reducer,
    cohoi: cohoiSlice.reducer,
    [customerService.reducerPath]: customerService.reducer,
    [cohoiService.reducerPath]: cohoiService.reducer,
    [authService.reducerPath]: authService.reducer,
    // demo: demoSlice.reducer,
    // [demoService.reducerPath]: demoService.reducer,
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
