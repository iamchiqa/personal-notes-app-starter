// Navigasi use <Link>/<NavLink> dari react-router-dom, jadi pindah halaman TANPA reload (SPA).
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton';
import LocaleToggleButton from './LocaleToggleButton';
import NoteSidebar from './NoteSidebar';
import { BookIcon, LogoutIcon } from './NoteIcons';
import LocaleContext from '../contexts/LocaleContext';

// authedUser = data user login (null kalau belum login); onLogout = fungsi keluar.
function NoteNavigation({ authedUser, onLogout }) {
  const { t } = useContext(LocaleContext);
  // State buka/tutup sidebar.
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function handleToggleSidebar() {
    setIsSidebarOpen((prevOpen) => !prevOpen);
  }

  function handleCloseSidebar() {
    setIsSidebarOpen(false);
  }

  return (
    <>
      {/* Judul aplikasi: logo buku (tombol buka sidebar, hanya jika sudah login) + teks "Notes" yang menuju beranda */}
      <h1 className='brand'>
        {authedUser && (
          <button
            type='button'
            className='sidebar-toggle'
            onClick={handleToggleSidebar}
            title={t('menu')}
            aria-label={t('menu')}
            aria-expanded={isSidebarOpen}
          >
            <BookIcon size={28} />
          </button>
        )}
        <Link to='/'>{t('appName')}</Link>
      </h1>

      {/* Tombol bahasa + tema selalu tampil; tombol logout hanya jika sudah login */}
      <div className='header-actions'>
        <LocaleToggleButton />
        <ThemeToggleButton />
        {authedUser && (
          <button
            type='button'
            className='button-logout'
            onClick={onLogout}
            title={t('logout')}
            aria-label={t('logout')}
          >
            <LogoutIcon size={28} />
            {/* Nama user terautentikasi ditampilkan di sini */}
            <span>{authedUser.name}</span>
          </button>
        )}
      </div>

      {/* Sidebar navigasi: Catatan, Tambah, Arsip */}
      {authedUser && <NoteSidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />}
    </>
  );
}

export default NoteNavigation;
