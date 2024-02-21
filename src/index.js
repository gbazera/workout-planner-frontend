import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bulma/css/bulma.min.css'
import './index.css';
import App from './App';

import { RoutinesContextProvider } from './context/RoutinesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RoutinesContextProvider>
      <App />
    </RoutinesContextProvider>
  </React.StrictMode>
);