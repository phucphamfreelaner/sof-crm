import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HopDongState {
  data?: number;
}

const initialState: HopDongState = {
  data: 0,
};

export const hopDongSlice = createSlice({
  name: "hopDongSlide",
  initialState,
  reducers: {
    setData: (state: any, action: PayloadAction<string>) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = hopDongSlice.actions;
