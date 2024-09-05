// src/store/chartsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const widgetDetailsTableSlice = createSlice({
  name: 'widgetTable',
  initialState: {
    tableData: [], 
    loading: false,
    error: null,
  },
  reducers: {
    setWidgetDetaildTable: (state, action) => {
      state.widgetTable = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setWidgetDetaildTable, setLoading, setError } = widgetDetailsTableSlice.actions;
export default widgetDetailsTableSlice.reducer;
