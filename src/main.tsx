import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { NewsProvider } from './contexts/NewsProvider';
import { FilterProvider } from './contexts/FilterProvider';
import { ToastProvider } from './contexts/ToastProvider';
import { Toasts } from './components/elements/Toasts';
import './index.css';

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
