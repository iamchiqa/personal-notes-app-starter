import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NoteDetail from '../components/NoteDetail';
import NoteButtonAction from '../components/NoteButtonAction';
import LoadingIndicator from '../components/LoadingIndicator';
import { TrashIcon, ArchiveInIcon, ArchiveOutIcon } from '../components/NoteIcons';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';

function DetailPage() {
  const { t } = useContext(LocaleContext);
  // Ambil id dari alamat, misal: /notes/notes-1 -> id = 'notes-1'.
  const { id } = useParams();
  const navigate = useNavigate();

  // State catatan (null = belum ada / tidak ditemukan) dan status loading.
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ambil catatan dari API tiap id berubah.
  useEffect(() => {
    let active = true;
    setLoading(true);

    getNote(id).then(({ error, data }) => {
      if (active) {
        setNote(error ? null : data);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [id]);

  // Selama data dimuat tampilkan indikator loading.
  if (loading) {
    return <LoadingIndicator />;
  }

  // If id tidak cocok dengan note manapun, show pesan dan link kembali.
  if (note === null) {
    return (
      <section className='page-message'>
        <h2>{t('noteNotFound')}</h2>
        <p>{t('noteNotFoundDesc')} &quot;{id}&quot;.</p>
        <Link to='/'>{t('backHome')}</Link>
      </section>
    );
  }

  // Hapus catatan, lalu kembali ke halaman sebelumnya (arsip atau beranda) dengan navigate(-1).
  async function handleDelete() {
    await deleteNote(id);
    navigate(-1);
  }

  // Arsipkan note lalu buka halaman arsip.
  async function handleArchive() {
    await archiveNote(id);
    navigate('/archives');
  }

  // Batal arsip: catatan return ke daftar aktif di beranda.
  async function handleUnarchive() {
    await unarchiveNote(id);
    navigate('/');
  }

  return (
    <section className='detail-page'>
      <NoteDetail
        title={note.title}
        body={note.body}
        createdAt={note.createdAt}
        archived={note.archived}
      />
      <div className='detail-page__action'>
        {/* Tombol arsip berganti fungsi: if sudah terarsip jadi "batal arsip" */}
        {note.archived ? (
          <NoteButtonAction title={t('unarchiveNote')} onClick={handleUnarchive}>
            <ArchiveOutIcon size={26} />
          </NoteButtonAction>
        ) : (
          <NoteButtonAction title={t('archiveNote')} onClick={handleArchive}>
            <ArchiveInIcon size={26} />
          </NoteButtonAction>
        )}
        <NoteButtonAction title={t('deleteNote')} onClick={handleDelete}>
          <TrashIcon size={26} />
        </NoteButtonAction>
      </div>
    </section>
  );
}

export default DetailPage;
