// Fungsi bantu untuk bertransaksi dengan RESTful API Dicoding Notes (https://notes-api.dicoding.dev/v1).
// Semua fungsi mengembalikan objek { error, message, data } agar mudah dipakai di komponen.

// Alamat dasar API.
const BASE_URL = 'https://notes-api.dicoding.dev/v1';
// Kunci untuk menyimpan access token di localStorage.
const TOKEN_KEY = 'accessToken';

// Ambil access token dari localStorage.
function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// Simpan access token ke localStorage (dipanggil setelah login berhasil).
function putAccessToken(accessToken) {
  localStorage.setItem(TOKEN_KEY, accessToken);
}

// Hapus access token (dipanggil saat logout).
function removeAccessToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// Fungsi inti: semua request lewat sini supaya tidak ada kode fetch yang berulang.
async function request(path, options = {}, withToken = false) {
  const headers = {};

  // Kalau ada body, kirim sebagai JSON.
  if (options.body) {
    headers['Content-Type'] = 'application/json';
  }

  // Endpoint yang butuh login wajib membawa header Authorization.
  if (withToken) {
    headers.Authorization = `Bearer ${getAccessToken()}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${path}`, { ...options, headers });
    const responseJson = await response.json();

    // Status selain 'success' dianggap error (misal: email sudah dipakai).
    if (responseJson.status !== 'success') {
      return { error: true, message: responseJson.message, data: null };
    }

    return { error: false, message: responseJson.message, data: responseJson.data };
  } catch (error) {
    // Gagal koneksi (offline, dll).
    return { error: true, message: 'Network error', data: null };
  }
}

// Daftar akun baru.
function register({ name, email, password }) {
  return request('/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password })
  });
}

// Login: data berisi { accessToken }.
function login({ email, password }) {
  return request('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

// Ambil data user yang sedang login (id, name, email).
function getUserLogged() {
  return request('/users/me', {}, true);
}

// Tambah catatan baru.
function addNote({ title, body }) {
  return request('/notes', {
    method: 'POST',
    body: JSON.stringify({ title, body })
  }, true);
}

// Ambil catatan aktif (belum diarsipkan).
function getActiveNotes() {
  return request('/notes', {}, true);
}

// Ambil catatan yang diarsipkan.
function getArchivedNotes() {
  return request('/notes/archived', {}, true);
}

// Ambil satu catatan berdasarkan id.
function getNote(id) {
  return request(`/notes/${id}`, {}, true);
}

// Arsipkan catatan.
function archiveNote(id) {
  return request(`/notes/${id}/archive`, { method: 'POST' }, true);
}

// Batalkan arsip catatan.
function unarchiveNote(id) {
  return request(`/notes/${id}/unarchive`, { method: 'POST' }, true);
}

// Hapus catatan.
function deleteNote(id) {
  return request(`/notes/${id}`, { method: 'DELETE' }, true);
}

export {
  getAccessToken,
  putAccessToken,
  removeAccessToken,
  register,
  login,
  getUserLogged,
  addNote,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote
};
