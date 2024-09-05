// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import chartsReducer from './chartsSlice';
import  setWidgetDetaildTable  from './widgetDetailsTableSlice';

const store = configureStore({
  reducer: {
    dashboard:chartsReducer,
    WidgetDetails: setWidgetDetaildTable,
  },
});

export default store;
