import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CustomerState {
  data?: number;
}

const initialState: CustomerState = {
  data: 0,
};

export const demoSlice = createSlice({
  name: "customerSlide",
  initialState,
  reducers: {
    setData: (state: any, action: PayloadAction<string>) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = demoSlice.actions;
