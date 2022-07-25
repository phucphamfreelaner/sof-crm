import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface modalState {
  name?: string;
  data?: any;
  modalsBottom?: IBottomContent[];
}

export interface IBottomContent {
  id?: string;
  title?: string;
  content?: React.ReactNode;
  width?: string;
  height?: string;
  data?: any;
}

const initialState: modalState = {
  name: "",
  data: null,
  modalsBottom: [],
};

export const modalSlice = createSlice({
  name: "modalSlide",
  initialState,
  reducers: {
    closeModalBottom: (
      state: modalState,
      action: PayloadAction<{ id: string }>
    ) => {
      state.modalsBottom = state.modalsBottom.filter(
        (x) => x.id !== action.payload.id
      );
    },
    openModalBottom: (
      state: modalState,
      action: PayloadAction<{ data: IBottomContent }>
    ) => {
      state.modalsBottom = [action?.payload?.data, ...state.modalsBottom];
    },
  },
});

export const { closeModalBottom, openModalBottom } = modalSlice.actions;
