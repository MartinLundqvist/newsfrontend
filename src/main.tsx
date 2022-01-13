import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { NewsProvider } from './contexts/NewsProvider';
import { FilterProvider } from './contexts/FilterProvider';
import { ToastProvider } from './contexts/ToastProvider';
import { Toasts } from './components/Toasts';
// import { AlertProvider } from './contexts/AlertProvider';

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider>
      <FilterProvider>
        <NewsProvider>
          <App />
          <Toasts />
        </NewsProvider>
      </FilterProvider>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
