import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bulma/css/bulma.min.css'
import './index.css';
import App from './App';

import { RoutinesContextProvider } from './context/RoutinesContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RoutinesContextProvider>
        <App />
      </RoutinesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);