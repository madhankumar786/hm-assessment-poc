import { createSlice } from '@reduxjs/toolkit';

const addDashboardChart = createSlice({
  name: 'dashboard',
  initialState: {
    value: [],
  },
  reducers: {
    addDashboard: (state) => {
      state.value += 1;
    },
    deleteDashboard: (state) => {
      state.value -= 1;
    },
  },
});

export const { addDashboard, deleteDashboard } = addDashboardChart.actions;
export default addDashboardChart.reducer;
