// filtersSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormValues } from "../dashboard/layout";

const initialState: FormValues = {
  startDate: undefined,
  endDate: undefined,
  account: "",
  industry: "",
  state: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FormValues>) => {
      state.account = action.payload.account;
      state.endDate = action.payload.endDate;
      state.industry = action.payload.industry;
      state.startDate = action.payload.startDate;
      state.state = action.payload.state;
    },
  },
});

export const { setFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
