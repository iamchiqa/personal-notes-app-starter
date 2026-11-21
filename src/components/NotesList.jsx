// Daftar catatan. If data kosong, tampil pesan kosong (conditional rendering).
import React from 'react';
import NoteItem from './NoteItem';

function NotesList({ notes, emptyMessage, locale }) {
  // Kondisi 1: tidak ada catatan -> show pesan kosong lalu stop di sini.
  if (notes.length === 0) {
    return (
      <section className='notes-list-empty'>
        <p>{emptyMessage}</p>
      </section>
    );
  }

  // Kondisi 2: ada catatan -> show 1 NoteItem untuk tiap notes.
  return (
    <section className='notes-list'>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          id={note.id}
          title={note.title}
          body={note.body}
          createdAt={note.createdAt}
          locale={locale}
        />
      ))}
    </section>
  );
}

export default NotesList;
