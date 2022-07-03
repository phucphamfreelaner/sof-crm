import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CohoiState {
  data?: number;
}

const initialState: CohoiState = {
  data: 0,
};

export const cohoiSlice = createSlice({
  name: "cohoiSlide",
  initialState,
  reducers: {
    setData: (state: any, action: PayloadAction<string>) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = cohoiSlice.actions;
