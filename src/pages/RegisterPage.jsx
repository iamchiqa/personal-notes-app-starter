// Halaman registrasi. Sukses -> pindah ke halaman login.
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { register } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';

function RegisterPage() {
  const { t } = useContext(LocaleContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  async function handleRegister({ name, email, password, confirmPassword }) {
    // Validasi: password dan konfirmasi harus sama.
    if (password !== confirmPassword) {
      setError(t('passwordMismatch'));
      return;
    }

    const { error: apiError, message } = await register({ name, email, password });

    if (apiError) {
      setError(message);
      return;
    }

    // Berhasil: arahkan ke login.
    navigate('/');
  }

  return (
    <section className='auth-page'>
      <h2>{t('registerTitle')}</h2>
      <RegisterInput onRegister={handleRegister} />
      {error && (
        <p className='form-error' role='alert'>
          {error}
        </p>
      )}
      <p className='auth-page__link'>
        {t('haveAccount')} <Link to='/'>{t('loginTitle')}</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
