// filtersSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterState } from "./types";

const initialState: FilterState = {
  startDate: null,
  endDate: null,
  account: "",
  industry: "",
  state: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<string | null>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string | null>) => {
      state.endDate = action.payload;
    },
    setAccount: (state, action: PayloadAction<string>) => {
      state.account = action.payload;
    },
    setIndustry: (state, action: PayloadAction<string>) => {
      state.industry = action.payload;
    },
    setState: (state, action: PayloadAction<string>) => {
      state.state = action.payload;
    },
  },
});

export const { setStartDate, setEndDate, setAccount, setIndustry, setState } =
  filtersSlice.actions;

export const selectedFilters = (state: FilterState) => state;

export default filtersSlice.reducer;
