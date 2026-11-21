// EDIT & Kerjakan file index.jsx sesuai Kriteria Pengerjaan di SOAL
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { applyTheme, getSavedTheme } from './utils/themes';

import './styles/style.css';

// Pasang saved tema SEBELUM render ke-1
applyTheme(getSavedTheme());

const root = createRoot(document.getElementById('root'));

// BrowserRouter mengaktifkan routing SPA (navigasi tanpa reload) untuk all App.
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
