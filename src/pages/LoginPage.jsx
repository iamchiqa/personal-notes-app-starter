// Halaman login. Sukses -> token disimpan, App.jsx memuat data user, lalu otomatis masuk ke beranda.
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { login } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';

// onLoginSuccess = fungsi dari App.jsx; dipanggil dengan { accessToken }.
function LoginPage({ onLoginSuccess }) {
  const { t } = useContext(LocaleContext);
  const [error, setError] = useState('');

  async function handleLogin({ email, password }) {
    const { error: apiError, message, data } = await login({ email, password });

    // Gagal (email/password salah, dll): tampilkan pesan dari API.
    if (apiError) {
      setError(message);
      return;
    }

    setError('');
    onLoginSuccess(data);
  }

  return (
    <section className='auth-page'>
      <h2>{t('loginTitle')}</h2>
      <LoginInput onLogin={handleLogin} />
      {error && (
        <p className='form-error' role='alert'>
          {error}
        </p>
      )}
      <p className='auth-page__link'>
        {t('noAccount')} <Link to='/register'>{t('registerTitle')}</Link>
      </p>
    </section>
  );
}

export default LoginPage;
