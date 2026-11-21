// CEK apakah sudah sesuai Kriteria Pengerjaan di SOAL, dan silakan EDIT hanya jika diperlukan 
import React, { useContext, useEffect, useRef } from 'react';
import NoteFormatToolbar from './NoteFormatToolbar';
import LocaleContext from '../contexts/LocaleContext';

function NoteInput({ title, onTitleChange, onBodyInput, initialBody = '' }) {
  const { t } = useContext(LocaleContext);
  const bodyRef = useRef(null);

  useEffect(() => {
    bodyRef.current.innerHTML = initialBody;
    // Array kosong [] artinya efek ini hanya run 1x saat pertama tampil.
  }, []);

  // Dipanggil tiap user typing / format di editor.
  function handleBodyInput(event) {
    const editor = event.currentTarget;

    // Cleaning '<br>' saat editor empty, agar placeholder muncul lagi.
    if (editor.innerHTML === '<br>') {
      editor.innerHTML = '';
    }

    // Kirim isi in HTML (innerHTML) format, BUKAN value, ke parent page.
    onBodyInput(editor.innerHTML);
  }

  return (
    <div className='add-new-page__input'>
      <input
        id='note-title'
        name='title'
        className='add-new-page__input__title'
        type='text'
        placeholder={t('titlePlaceholder')}
        aria-label={t('titlePlaceholder')}
        value={title}
        onChange={onTitleChange}
        spellCheck='false'
      />

      {/* Toolbar tebal/miring/garis bawah */}
      <NoteFormatToolbar />

      {/* Editor isi catatan */}
      <div
        ref={bodyRef}
        id='note-body' 
        className='add-new-page__input__body'
        data-placeholder={t('bodyPlaceholder')} 
        contentEditable 
        role='textbox' 
        aria-multiline='true' 
        aria-label={t('bodyLabel')}
        onInput={handleBodyInput} 
        suppressContentEditableWarning 
      />
    </div>
  );
}

export default NoteInput;
