// filtersSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormValues } from "../dashboard/layout";

type TransactionsSlice = {
  data: any[];
};
const initialState: TransactionsSlice = {
  data: [],
};

const transactionsSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setTransactions } = transactionsSlice.actions;

export default transactionsSlice.reducer;
