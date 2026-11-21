import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteInput from '../components/NoteInput';
import NoteButtonAction from '../components/NoteButtonAction';
import { CheckIcon } from '../components/NoteIcons';
import { addNote } from '../utils/network-data';
import { isHtmlEmpty } from '../utils/note-helper';
import useInput from '../hooks/useInput';
import LocaleContext from '../contexts/LocaleContext';

function AddPage() {
  const { t } = useContext(LocaleContext);
  const navigate = useNavigate();

  // State judul (custom hook useInput) dan isi (string HTML dari contentEditable).
  const [title, handleTitleChange] = useInput('');
  const [body, setBody] = useState('');
  // State pesan error validasi; string kosong = no error.
  const [error, setError] = useState('');

  // Save new note ke API lewat addNote dari network-data.js.
  async function handleSave() {
    // Tolak kalau judul dan isi sama-sama kosong.
    if (title.trim() === '' && isHtmlEmpty(body)) {
      setError(t('errorEmptyNote'));
      return;
    }

    const { error: apiError, message } = await addNote({ title: title || '(untitled)', body });

    // Kalau API menolak, tampilkan pesannya.
    if (apiError) {
      setError(message);
      return;
    }

    // Setelah tersimpan, kembali ke beranda tanpa reload.
    navigate('/');
  }

  return (
    <section className='add-new-page'>
      <NoteInput title={title} onTitleChange={handleTitleChange} onBodyInput={setBody} />
      {/* Pesan error tampil hanya kalau state error terisi */}
      {error && (
        <p className='form-error' role='alert'>
          {error}
        </p>
      )}
      <div className='add-new-page__action'>
        <NoteButtonAction title={t('saveNote')} onClick={handleSave}>
          <CheckIcon size={28} />
        </NoteButtonAction>
      </div>
    </section>
  );
}

export default AddPage;
