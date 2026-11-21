// File ini mengurus logika BAHASA (Indonesia & Inggris): kamus teks + simpan ke localStorage.
const LOCALES = ['id', 'en'];

// Kunci untuk menyimpan bahasa di localStorage.
const LOCALE_STORAGE_KEY = 'notes-app-locale';

// Kamus teks. Tiap bahasa punya key yang sama.
const TEXTS = {
  id: {
    appName: 'Catatan',
    menu: 'Menu',
    navHome: 'Catatan',
    navArchive: 'Arsip',
    navAdd: 'Tambah Catatan',
    theme: 'Tema',
    themeHint: 'klik untuk ganti tema',
    language: 'Bahasa',
    logout: 'Keluar',
    loading: 'Memuat data...',
    homeTitle: 'Catatan Aktif',
    archiveTitle: 'Catatan Arsip',
    emptyNotes: 'Tidak ada catatan',
    emptyArchive: 'Arsip kosong',
    searchPlaceholder: 'Cari berdasarkan judul ...',
    searchLabel: 'Cari catatan berdasarkan judul',
    titlePlaceholder: 'Judul catatan',
    bodyPlaceholder: 'Tulis catatanmu di sini ...',
    bodyLabel: 'Isi catatan',
    addNote: 'Tambah catatan',
    saveNote: 'Simpan catatan',
    errorEmptyNote: 'Isi judul atau isi catatan dulu sebelum menyimpan.',
    archiveNote: 'Arsipkan catatan',
    unarchiveNote: 'Batal arsip',
    deleteNote: 'Hapus catatan',
    archivedBadge: 'Diarsipkan',
    noteNotFound: 'Catatan tidak ditemukan',
    noteNotFoundDesc: 'Tidak ada catatan dengan ID',
    backHome: 'Kembali ke beranda',
    notFoundText: 'Halaman yang kamu cari tidak ditemukan.',
    loginTitle: 'Masuk',
    registerTitle: 'Daftar',
    name: 'Nama',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Konfirmasi Password',
    noAccount: 'Belum punya akun?',
    haveAccount: 'Sudah punya akun?',
    passwordMismatch: 'Password dan konfirmasi password tidak sama.',
    seedSamples: 'Tambah catatan contoh'
  },

  en: {
    appName: 'Notes',
    menu: 'Menu',
    navHome: 'Notes',
    navArchive: 'Archive',
    navAdd: 'Add Note',
    theme: 'Theme',
    themeHint: 'click to change theme',
    language: 'Language',
    logout: 'Logout',
    loading: 'Loading data...',
    homeTitle: 'Active Notes',
    archiveTitle: 'Archived Notes',
    emptyNotes: 'No notes yet',
    emptyArchive: 'Archive is empty',
    searchPlaceholder: 'Search by title ...',
    searchLabel: 'Search notes by title',
    titlePlaceholder: 'Note title',
    bodyPlaceholder: 'Write your note here ...',
    bodyLabel: 'Note body',
    addNote: 'Add note',
    saveNote: 'Save note',
    errorEmptyNote: 'Fill in the title or the body before saving.',
    archiveNote: 'Archive note',
    unarchiveNote: 'Unarchive',
    deleteNote: 'Delete note',
    archivedBadge: 'Archived',
    noteNotFound: 'Note not found',
    noteNotFoundDesc: 'There is no note with ID',
    backHome: 'Back to home',
    notFoundText: 'The page you are looking for was not found.',
    loginTitle: 'Login',
    registerTitle: 'Register',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    passwordMismatch: 'Password and confirm password do not match.',
    seedSamples: 'Add sample notes'
  }
};

// Ambil bahasa tersimpan; kalau belum ada / rusak, pakai 'id'.
function getSavedLocale() {
  try {
    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
    return LOCALES.includes(savedLocale) ? savedLocale : 'id';
  } catch (error) {
    return 'id';
  }
}

// Simpan bahasa pilihan user.
function saveLocale(locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch (error) {
    // Abaikan: bahasa tetap jalan, hanya tidak tersimpan setelah refresh.
  }
}

// Bahasa berikutnya: id <-> en.
function getNextLocale(currentLocale) {
  return currentLocale === 'id' ? 'en' : 'id';
}

// Ambil teks sesuai bahasa dan key.
function getText(locale, key) {
  return TEXTS[locale][key];
}

export { getSavedLocale, saveLocale, getNextLocale, getText };
