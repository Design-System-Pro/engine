import React from 'react';
import './globals.css';
import { Providers } from './modules/providers';
import { createRoot } from 'react-dom/client';
import { Router } from './router';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <Router />
    </Providers>
  </React.StrictMode>
);
