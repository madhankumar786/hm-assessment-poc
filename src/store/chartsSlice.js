// src/store/chartsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const chartsSlice = createSlice({
  name: 'charts',
  initialState: {
    charts: [], // Initial state for charts
    loading: false,
    error: null,
  },
  reducers: {
    setCharts: (state, action) => {
      state.charts = action.payload;
    },
    addChart:(state, action) => {
      state.charts = [...state.charts,action.payload];
    },
    updateChart: (state, action) => {
      const updatedChart = action.payload;
      const index = state.charts.findIndex(chart => chart.id === updatedChart.id);
      if (index !== -1) {
        state.charts[index] = updatedChart;
      }
    },
    removeChart: (state, action) => {
      state.charts = state.charts.filter((chart) => chart.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCharts,addChart, updateChart, removeChart, setLoading, setError } = chartsSlice.actions;
export default chartsSlice.reducer;
