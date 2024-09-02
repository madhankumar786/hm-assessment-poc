// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import chartsReducer from './chartsSlice';

const store = configureStore({
  reducer: {
    dashboard:chartsReducer,
  },
});

export default store;
