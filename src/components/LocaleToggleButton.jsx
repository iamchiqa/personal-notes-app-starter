// Tombol logo translate untuk ganti bahasa Indonesia <-> Inggris.
import React, { useContext } from 'react';
import { TranslateIcon } from './NoteIcons';
import LocaleContext from '../contexts/LocaleContext';

function LocaleToggleButton() {
  // Ambil bahasa aktif + fungsi ganti bahasa dari LocaleContext.
  const { locale, toggleLocale, t } = useContext(LocaleContext);
  const description = `${t('language')}: ${locale.toUpperCase()}`;

  return (
    <button
      type='button'
      className='toggle-locale'
      onClick={toggleLocale}
      title={description}
      aria-label={description}
    >
      <TranslateIcon size={28} />
      {/* Kode bahasa aktif ditampilkan kecil di samping logo */}
      <span className='toggle-locale__code'>{locale.toUpperCase()}</span>
    </button>
  );
}

export default LocaleToggleButton;
