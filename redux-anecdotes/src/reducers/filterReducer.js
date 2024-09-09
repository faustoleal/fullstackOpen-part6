import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterChange(state, action) {
      const setFilter = action.payload.toLowerCase();
      return setFilter;
    },
  },
});

export const { filterChange } = filterSlice.actions;
export default filterSlice.reducer;
