import React from "react";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  Provider,
} from "react-redux";

import { customerService, customerSlice } from "./customer";

// @ts-ignore
const store: any = configureStore({
  reducer: combineReducers({
    customer: customerSlice.reducer,
    [customerService.reducerPath]: customerService.reducer,
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
