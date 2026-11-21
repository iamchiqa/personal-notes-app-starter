// CEK apakah sudah sesuai Kriteria Pengerjaan di SOAL, dan silakan EDIT hanya jika diperlukan 
import React, { useContext, useState } from 'react';
import NoteSampleButton from '../components/NoteSampleButton';
import { getAllNotes } from '../utils/local-data';
import { addNote, getActiveNotes } from '../utils/network-data';
import { useNavigate } from 'react-router-dom';
import NotesList from '../components/NotesList';
import NoteSearch from '../components/NoteSearch';
import NoteButtonAction from '../components/NoteButtonAction';
import LoadingIndicator from '../components/LoadingIndicator';
import { PlusIcon } from '../components/NoteIcons';
import { filterNotesByTitle } from '../utils/note-helper';
import useKeyword from '../hooks/useKeyword';
import useNotes from '../hooks/useNotes';
import LocaleContext from '../contexts/LocaleContext';

function HomePage() {
  const { t, locale } = useContext(LocaleContext);
  // useNavigate dipakai untuk pindah halaman lewat navigasi.
  const navigate = useNavigate();

  // Keyword pencarian tersimpan di URL (custom hook), contoh: /?keyword=babel (bisa dishare).
  const [keyword, handleKeywordChange] = useKeyword();

  // Ambil catatan aktif dari API + status loading (custom hook).
  const [activeNotes, loading, reload] = useNotes(getActiveNotes);
  // State penanda sedang mengirim catatan contoh ke API.
  const [seeding, setSeeding] = useState(false);

  // Filter judul sesuai keyword.
  const notes = filterNotesByTitle(activeNotes, keyword);

  // Kirim tiap catatan dari local-data ke API, berurutan agar urutannya tetap.
  async function handleSeedSamples() {
    setSeeding(true);
    for (const { title, body } of getAllNotes()) {
      await addNote({ title, body });
    }
    setSeeding(false);
    reload();
  }

  // Tombol hanya tampil kalau tidak sedang loading, daftar kosong, dan tidak sedang mencari.
  const showSampleButton = !loading && activeNotes.length === 0 && keyword === '';
  
  return (
    <section className='homepage'>
      <h2 className='page-title'>{t('homeTitle')}</h2>
      {/* Kolom pencarian (controlled component, nilainya dari URL) */}
      <NoteSearch keyword={keyword} onKeywordChange={handleKeywordChange} />
      {/* Saat loading tampil spinner; setelah itu daftar catatan atau pesan kosong */}
      {loading ? <LoadingIndicator /> : <NotesList notes={notes} emptyMessage={t('emptyNotes')} locale={locale} />}
      
      {showSampleButton && <NoteSampleButton onClick={handleSeedSamples} disabled={seeding} />}
      <div className='homepage__action'>
        <NoteButtonAction title={t('addNote')} onClick={() => navigate('/notes/new')}>
          <PlusIcon size={28} />
        </NoteButtonAction>
      </div>
    </section>
  );
}

export default HomePage;
