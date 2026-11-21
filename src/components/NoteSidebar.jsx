// Sidebar navigasi (geser buka/tutup). Dibuka lewat logo buku "Notes" di header.
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { BookIcon, PlusIcon, ArchiveInIcon } from './NoteIcons';
import LocaleContext from '../contexts/LocaleContext';

function NoteSidebar({ isOpen, onClose }) {
  const { t } = useContext(LocaleContext);

  return (
    <>
      {/* Lapisan gelap di belakang sidebar; klik = tutup sidebar */}
      {isOpen && <div className='sidebar-overlay' onClick={onClose} />}
      <aside className={isOpen ? 'sidebar sidebar--open' : 'sidebar'}>
        <nav className='navigation'>
          <ul>
            <li>
              {/* NavLink otomatis menambah class "active" di link yang cocok dengan URL; "end" agar '/' tidak aktif di halaman lain */}
              <NavLink to='/' end className='navigation__link' onClick={onClose}>
                <BookIcon size={22} />
                {t('navHome')}
              </NavLink>
            </li>
            <li>
              <NavLink to='/notes/new' className='navigation__link' onClick={onClose}>
                <PlusIcon size={22} />
                {t('navAdd')}
              </NavLink>
            </li>
            <li>
              <NavLink to='/archives' className='navigation__link' onClick={onClose}>
                <ArchiveInIcon size={22} />
                {t('navArchive')}
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default NoteSidebar;
