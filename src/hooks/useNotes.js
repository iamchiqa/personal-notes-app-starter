// Custom hook: ambil daftar catatan dari API + status loading.
// fetchNotes = fungsi dari network-data.js (getActiveNotes atau getArchivedNotes).
import { useEffect, useState } from 'react';

function useNotes(fetchNotes) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Angka pemicu muat ulang: tiap berubah, useEffect jalan lagi.
  const [refreshKey, setRefreshKey] = useState(0);
  
  useEffect(() => {
    // Penanda supaya tidak set state kalau komponen sudah ditutup.
    let active = true;
    setLoading(true);

    fetchNotes().then(({ error, data }) => {
      if (active) {
        setNotes(error ? [] : data);
        setLoading(false);
      }
    });

    // Cleanup saat komponen hilang.
    return () => {
      active = false;
    };
  }, [fetchNotes, refreshKey]);

  // Dipanggil dari luar untuk memuat ulang daftar.
  function reload() {
    setRefreshKey((prevKey) => prevKey + 1);
  }

  return [notes, loading, reload];
}

export default useNotes;
