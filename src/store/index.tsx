import React from "react";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  Provider,
} from "react-redux";

import { customerService, customerSlice } from "./customer";

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

export const store: any = configureStore({
  reducer: combineReducers({
    customer: customerSlice.reducer,
    [customerService.reducerPath]: customerService.reducer,
  }),
  devTools: true,
});

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<AppDispatch>();

export const ReduxProvider = ({ children }: any) => (
  <Provider store={store}>{children}</Provider>
);
