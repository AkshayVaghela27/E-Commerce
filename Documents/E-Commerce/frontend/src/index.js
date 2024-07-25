import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppState from './context/AppState.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppState>
    <App />
  </AppState>
);

