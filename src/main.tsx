import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { NewsProvider } from './contexts/NewsProvider';
import { FilterProvider } from './contexts/FilterProvider';

ReactDOM.render(
  <React.StrictMode>
    <FilterProvider>
      <NewsProvider>
        <App />
      </NewsProvider>
    </FilterProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
