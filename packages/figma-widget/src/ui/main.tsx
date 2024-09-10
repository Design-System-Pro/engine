import React from 'react';
import './globals.css';
import { Providers } from './modules/providers';
import { createRoot } from 'react-dom/client';
import { App } from './app';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
