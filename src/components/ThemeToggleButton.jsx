// CEK apakah sudah sesuai Kriteria Pengerjaan di SOAL, dan silakan EDIT hanya jika diperlukan 
// Tombol logo matahari-bulan untuk ganti tema.
// Tiap diklik, tema app change: default -> terang -> universe -> default ...
import React, { useContext } from 'react';
import { SunMoonIcon } from './NoteIcons';
import { THEME_LABELS } from '../utils/themes';
import ThemeContext from '../contexts/ThemeContext';
import LocaleContext from '../contexts/LocaleContext';

function ThemeToggleButton() {
  // Ambil tema aktif + fungsi ganti tema dari ThemeContext (tidak perlu props lagi).
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t } = useContext(LocaleContext);
  const description = `${t('theme')}: ${THEME_LABELS[theme]} (${t('themeHint')})`;

  return (
    <button
      type='button'
      className='toggle-theme'
      onClick={toggleTheme}
      title={description}
      aria-label={description}
    >
      <SunMoonIcon size={30} />
    </button>
  );
}

export default ThemeToggleButton;
