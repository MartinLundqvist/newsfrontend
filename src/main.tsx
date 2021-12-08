import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { NewsProvider } from './contexts/NewsProvider';

ReactDOM.render(
  <React.StrictMode>
    <NewsProvider>
      <App />
    </NewsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
