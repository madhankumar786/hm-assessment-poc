import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "components";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import  store  from './store/store';

const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        retry: 1,        
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: false,    
      },
    },
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 <Provider store={store}>
  <QueryClientProvider client={queryClient}>
    <Router>
      <App />
    </Router>
  </QueryClientProvider>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
