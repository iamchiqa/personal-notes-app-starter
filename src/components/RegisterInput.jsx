// Form registrasi: nama, email, password, confirm password.
import React, { useContext } from 'react';
import useInput from '../hooks/useInput';
import LocaleContext from '../contexts/LocaleContext';

// onRegister = fungsi dari RegisterPage; dipanggil dengan semua isi form.
function RegisterInput({ onRegister }) {
  const { t } = useContext(LocaleContext);
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');

  function handleSubmit(event) {
    event.preventDefault();
    onRegister({ name, email, password, confirmPassword });
  }

  return (
    <form className='input-register' onSubmit={handleSubmit}>
      <label htmlFor='name'>{t('name')}</label>
      <input type='text' id='name' name='name' autoComplete='name' value={name} onChange={onNameChange} required />
      <label htmlFor='email'>{t('email')}</label>
      <input type='email' id='email' name='email' autoComplete='email' value={email} onChange={onEmailChange} required />
      <label htmlFor='password'>{t('password')}</label>
      <input
        type='password'
        id='password'
        name='password'
        value={password}
        onChange={onPasswordChange}
        autoComplete='new-password'
        minLength={6}
        required
      />
      <label htmlFor='confirmPassword'>{t('confirmPassword')}</label>
      <input
        type='password'
        id='confirmPassword'
        name='confirmPassword'
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
        autoComplete='new-password'
        required
      />
      <button type='submit'>{t('registerTitle')}</button>
    </form>
  );
}

export default RegisterInput;
