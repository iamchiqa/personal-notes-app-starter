// CEK apakah sudah sesuai Kriteria Pengerjaan di SOAL, dan silakan EDIT hanya jika diperlukan 
// File ini khusus mengurus logika TEMA (default, terang, universe).
const THEMES = ['default', 'light', 'universe'];

const THEME_LABELS = {
  default: 'Default',
  light: 'Terang',
  universe: 'Universe'
};

// Kunci (key) untuk save pilihan tema di localStorage browser.
const THEME_STORAGE_KEY = 'notes-app-theme';

// Ambil tema yang pernah dipilih user agar tidak reset saat halaman di-refresh.
function getSavedTheme() {
  try {
    // Baca nilai tema dari localStorage.
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    // Pakai nilai hanya jika ada di daftar THEMES, if tidak pakai 'default'.
    return THEMES.includes(savedTheme) ? savedTheme : 'default';
  } catch (error) {
    // If localStorage gagal diakses, aman kembali ke tema default.
    return 'default';
  }
}

// Save tema pilihan user ke localStorage.
function saveTheme(theme) {
  try {
    // Simpan nama tema (string) with key yang sudah ditentukan.
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    // If gagal simpan, abaikan saja. Tema tetap jalan, hanya tidak dicache setelah refresh.
  }
}

// Cari tema berikutnya: default -> light -> universe -> kembali ke default.
function getNextTheme(currentTheme) {
  const currentIndex = THEMES.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % THEMES.length;
  return THEMES[nextIndex];
}

// Atur atribut data-theme di tag <html> agar CSS bisa read tema yang aktif.
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

export { THEMES, THEME_LABELS, getSavedTheme, saveTheme, getNextTheme, applyTheme };
