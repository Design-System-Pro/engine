import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './globals.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- TODO: review
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
