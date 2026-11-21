// Form login: input email + password (controlled component lewat custom hook useInput).
import React, { useContext } from 'react';
import useInput from '../hooks/useInput';
import LocaleContext from '../contexts/LocaleContext';

// onLogin = fungsi dari LoginPage; dipanggil dengan { email, password }.
function LoginInput({ onLogin }) {
  const { t } = useContext(LocaleContext);
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  // Cegah reload halaman bawaan form, lalu kirim data ke parent.
  function handleSubmit(event) {
    event.preventDefault();
    onLogin({ email, password });
  }

  return (
    <form className='input-login' onSubmit={handleSubmit}>
      <label htmlFor='email'>{t('email')}</label>
      <input type='email' id='email' name='email' autoComplete='username' placeholder='your@mail.com' value={email} onChange={onEmailChange} required />
      <label htmlFor='password'>{t('password')}</label>
      <input
        type='password'
        id='password'
        name='password'
        value={password}
        onChange={onPasswordChange}
        autoComplete='current-password'
        required
      />
      <button type='submit'>{t('loginTitle')}</button>
    </form>
  );
}

export default LoginInput;
