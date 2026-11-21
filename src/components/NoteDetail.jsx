// CEK apakah sudah sesuai Kriteria Pengerjaan di SOAL, dan silakan EDIT hanya jika diperlukan
import React, { useContext } from 'react';
import parser from 'html-react-parser';
import { showFormattedDate } from '../utils';
import LocaleContext from '../contexts/LocaleContext';

// title, body, createdAt = data catatan; archived = penanda catatan sedang diarsipkan atau tidak.
function NoteDetail({ title, body, createdAt, archived }) {
  const { t, locale } = useContext(LocaleContext);

  return (
    <>
      <h2 className='detail-page__title'>{title}</h2>
      <p className='detail-page__createdAt'>
        {showFormattedDate(createdAt, locale)}
        {/* Tampilkan lencana kecil only if note sedang diarsipkan */}
        {archived && <span className='detail-page__badge'>{t('archivedBadge')}</span>}
      </p>
      {/* Isi note dirender as HTML (bold, italic, underline, baris baru, dst) */}
      <div className='detail-page__body'>{parser(body)}</div>
    </>
  );
}

export default NoteDetail;
