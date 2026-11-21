// Tombol aksi reusable (tambah, simpan, edit, arsip, hapus).
import React from 'react';

function NoteButtonAction({ title, onClick, children }) {
  return (
    <button
      className='action'
      type='button'
      title={title}
      aria-label={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default NoteButtonAction;
