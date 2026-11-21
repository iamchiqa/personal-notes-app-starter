import React from 'react';
import { Link } from 'react-router-dom';
import parser from 'html-react-parser';
import { showFormattedDate } from '../utils';

function NoteItem({ id, title, body, createdAt, locale }) {
  return (
    <article className='note-item'>
      <h3 className='note-item__title'>
        {/* Link for pindah halaman tanpa reload */}
        <Link to={`/notes/${id}`}>{title}</Link>
      </h3>
      <p className='note-item__createdAt'>{showFormattedDate(createdAt, locale)}</p>
      <div className='note-item__body'>{parser(body)}</div>
    </article>
  );
}

export default NoteItem;
