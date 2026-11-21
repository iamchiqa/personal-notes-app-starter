import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';

function PageNotFound() {
  const { t } = useContext(LocaleContext);

  return (
    <section className='page-message'>
      <h2>404</h2>
      <p>{t('notFoundText')}</p>
      {/* Link kembali ke beranda tanpa reload halaman */}
      <Link to='/'>{t('backHome')}</Link>
    </section>
  );
}

export default PageNotFound;
