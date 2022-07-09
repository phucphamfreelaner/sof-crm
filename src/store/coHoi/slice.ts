import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CoHoiState {
  data?: number;
}

const initialState: CoHoiState = {
  data: 0,
};

export const coHoiSlice = createSlice({
  name: "coHoiSlide",
  initialState,
  reducers: {
    setData: (state: any, action: PayloadAction<string>) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = coHoiSlice.actions;
