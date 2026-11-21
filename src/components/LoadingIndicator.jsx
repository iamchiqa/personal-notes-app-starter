// Indikator loading (spinner + teks) saat data dari API sedang dimuat.
import React, { useContext } from 'react';
import LocaleContext from '../contexts/LocaleContext';

function LoadingIndicator() {
  const { t } = useContext(LocaleContext);

  return (
    <div className='loading-indicator' role='status' aria-live='polite'>
      <div className='loading-indicator__spinner' />
      <p>{t('loading')}</p>
    </div>
  );
}

export default LoadingIndicator;
