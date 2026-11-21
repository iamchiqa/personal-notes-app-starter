// Filter daftar note sesuai keyword di JUDUL catatan.
function filterNotesByTitle(notes, keyword) {
  // Hapus spasi di awal/akhir lalu ubah ke huruf kecil
  const lowerKeyword = keyword.trim().toLowerCase();

  if (lowerKeyword === '') {
    return notes;
  }

  return notes.filter((note) => note.title.toLowerCase().includes(lowerKeyword));
}

// Cek is isi note (berupa string HTML) itu kosong.
// Contoh: '<br>' atau '<div></div>' kelihatannya ada isi, padahal tidak ada teksnya.
function isHtmlEmpty(html) {
  // Buang semua tag HTML (<...>) dan ubah &nbsp; jadi spasi biasa, lalu hapus spasi pinggir.
  const plainText = html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
  // Kosong if setelah dibersihkan tidak ada teks sama sekali.
  return plainText === '';
}

export { filterNotesByTitle, isHtmlEmpty };
