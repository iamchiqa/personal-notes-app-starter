import React, { useEffect, useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import NoteNavigation from './components/NoteNavigation';
import LoadingIndicator from './components/LoadingIndicator';
import HomePage from './pages/HomePage';
import ArsipPage from './pages/ArsipPage';
import AddPage from './pages/AddPage';
import DetailPage from './pages/DetailPage';
import PageNotFound from './pages/PageNotFound';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ThemeContext from './contexts/ThemeContext';
import LocaleContext from './contexts/LocaleContext';
import { applyTheme, getNextTheme, getSavedTheme, saveTheme } from './utils/themes';
import { getNextLocale, getSavedLocale, getText, saveLocale } from './utils/locale';
import { getAccessToken, getUserLogged, putAccessToken, removeAccessToken } from './utils/network-data';

// Layout bersarang (nested route): header + main dipakai bersama oleh semua halaman lewat <Outlet />.
function Layout({ authedUser, onLogout }) {
  return (
    <div className='app-container'>
      <header>
        {/* Logo, judul, sidebar, tombol bahasa/tema, dan logout */}
        <NoteNavigation authedUser={authedUser} onLogout={onLogout} />
      </header>
      <main>
        {/* Halaman sesuai URL tampil di sini */}
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  // State tema aktif. Fungsi agar getSavedTheme hanya run 1x di awal.
  const [theme, setTheme] = useState(getSavedTheme);
  // State bahasa aktif (id / en), diambil dari localStorage.
  const [locale, setLocale] = useState(getSavedLocale);
  // State user yang sedang login (null = belum login).
  const [authedUser, setAuthedUser] = useState(null);
  // State penanda sedang cek token saat aplikasi pertama dibuka.
  const [initializing, setInitializing] = useState(true);

  // Tiap tema berubah: pasang ke tag <html> dan save.
  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  // Tiap bahasa berubah: simpan ke localStorage.
  useEffect(() => {
    saveLocale(locale);
    document.documentElement.lang = locale;
  }, [locale]);

  // Saat pertama dibuka: kalau ada token, minta data user ke API.
  useEffect(() => {
    if (!getAccessToken()) {
      setInitializing(false);
      return;
    }

    getUserLogged().then(({ error, data }) => {
      setAuthedUser(error ? null : data);
      setInitializing(false);
    });
  }, []);

  // Ganti themes saat logo matahari-bulan diklik
  function handleToggleTheme() {
    setTheme((prevTheme) => getNextTheme(prevTheme));
  }

  // Ganti bahasa saat logo translate diklik.
  function handleToggleLocale() {
    setLocale((prevLocale) => getNextLocale(prevLocale));
  }

  // Login sukses: simpan token, lalu ambil data user.
  async function handleLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  // Logout: hapus token dan data user.
  function handleLogout() {
    removeAccessToken();
    setAuthedUser(null);
  }

  // Nilai yang dibagikan ke seluruh komponen lewat Context.
  const themeValue = { theme, toggleTheme: handleToggleTheme };
  const localeValue = {
    locale,
    toggleLocale: handleToggleLocale,
    t: (key) => getText(locale, key)
  };

  // Tentukan isi halaman: loading -> halaman login/registrasi -> halaman catatan (terproteksi).
  let content;

  if (initializing) {
    content = (
      <div className='app-container'>
        <LoadingIndicator />
      </div>
    );
  } else if (authedUser === null) {
    // Belum login: hanya login & registrasi yang bisa diakses.
    content = (
      <Routes>
        <Route element={<Layout authedUser={null} onLogout={handleLogout} />}>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/*' element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
        </Route>
      </Routes>
    );
  } else {
    // Sudah login: semua halaman catatan.
    content = (
      <Routes>
        <Route element={<Layout authedUser={authedUser} onLogout={handleLogout} />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/archives' element={<ArsipPage />} />
          <Route path='/notes/new' element={<AddPage />} />
          <Route path='/notes/:id' element={<DetailPage />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    );
  }

  return (
    <ThemeContext.Provider value={themeValue}>
      <LocaleContext.Provider value={localeValue}>{content}</LocaleContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
