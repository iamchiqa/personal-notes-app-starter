// Tombol untuk mengisi catatan contoh saat daftar masih kosong.
import React, { useContext } from 'react';
import LocaleContext from '../contexts/LocaleContext';

function NoteSampleButton({ onClick, disabled }) {
  const { t } = useContext(LocaleContext);

  return (
    <button type='button' className='sample-button' onClick={onClick} disabled={disabled}>
      {disabled ? t('loading') : t('seedSamples')}
    </button>
  );
}

export default NoteSampleButton;