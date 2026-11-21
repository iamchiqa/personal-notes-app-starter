import React, { useContext } from 'react';
import NotesList from '../components/NotesList';
import NoteSearch from '../components/NoteSearch';
import LoadingIndicator from '../components/LoadingIndicator';
import { getArchivedNotes } from '../utils/network-data';
import { filterNotesByTitle } from '../utils/note-helper';
import useKeyword from '../hooks/useKeyword';
import useNotes from '../hooks/useNotes';
import LocaleContext from '../contexts/LocaleContext';

function ArsipPage() {
  const { t } = useContext(LocaleContext);

  // Keyword di URL (?keyword=...) agar hasil pencarian bisa dishare via link.
  const [keyword, handleKeywordChange] = useKeyword();

  // Ambil arsip note dari API + status loading.
  const [archivedNotes, loading] = useNotes(getArchivedNotes);

  // Filter sesuai judul.
  const notes = filterNotesByTitle(archivedNotes, keyword);

  return (
    <section className='archivepage'>
      <h2 className='page-title'>{t('archiveTitle')}</h2>
      <NoteSearch keyword={keyword} onKeywordChange={handleKeywordChange} />
      {loading ? <LoadingIndicator /> : <NotesList notes={notes} emptyMessage={t('emptyArchive')} />}
    </section>
  );
}

export default ArsipPage;
