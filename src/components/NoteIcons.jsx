// File ini berisi kumpulan ikon SVG kecil.
import React from 'react';

function IconBase({ size = 24, children }) {
  return (
    <svg
      viewBox='0 0 24 24' 
      width={size} 
      height={size} 
      fill='none' 
      stroke='currentColor' 
      strokeWidth='2' 
      strokeLinecap='round' 
      strokeLinejoin='round' 
      aria-hidden='true' 
    >
      {children}
    </svg>
  );
}

// Ikon buku (logo Notes) - sekarang diklik untuk buka/tutup sidebar navigasi.
function BookIcon({ size }) {
  return (
    <IconBase size={size}>
      {/* Badan buku */}
      <path d='M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20' />
      {/* Dua garis kecil di sampul as tanda tulisan */}
      <path d='M9 7h7M9 11h5' />
    </IconBase>
  );
}

// Ikon tambah (+) untuk tombol tambah catatan.
function PlusIcon({ size }) {
  return (
    <IconBase size={size}>
      <line x1='12' y1='5' x2='12' y2='19' />
      <line x1='5' y1='12' x2='19' y2='12' />
    </IconBase>
  );
}

// Ikon centang untuk tombol simpan.
function CheckIcon({ size }) {
  return (
    <IconBase size={size}>
      <polyline points='20 6 9 17 4 12' />
    </IconBase>
  );
}

// Ikon pensil untuk tombol edit.
function EditIcon({ size }) {
  return (
    <IconBase size={size}>
      <path d='M12 20h9' />
      <path d='M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z' />
    </IconBase>
  );
}

// Ikon tong sampah untuk tombol hapus.
function TrashIcon({ size }) {
  return (
    <IconBase size={size}>
      <polyline points='3 6 5 6 21 6' />
      <path d='M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6' />
      <path d='M10 11v6M14 11v6' />
      <path d='M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2' />
    </IconBase>
  );
}

// Ikon kotak arsip with panah masuk (arsipkan catatan).
function ArchiveInIcon({ size }) {
  return (
    <IconBase size={size}>
      <polyline points='21 8 21 21 3 21 3 8' />
      <rect x='1' y='3' width='22' height='5' />
      <line x1='12' y1='11' x2='12' y2='17' />
      <polyline points='9 14 12 17 15 14' />
    </IconBase>
  );
}

// Ikon kotak arsip with panah keluar (batal arsip).
function ArchiveOutIcon({ size }) {
  return (
    <IconBase size={size}>
      <polyline points='21 8 21 21 3 21 3 8' />
      <rect x='1' y='3' width='22' height='5' />
      <line x1='12' y1='11' x2='12' y2='17' />
      <polyline points='9 14 12 11 15 14' />
    </IconBase>
  );
}

// Ikon matahari + bulan (logo ganti tema), gaya umum seperti tombol tema biasa.
function SunMoonIcon({ size }) {
  return (
    <IconBase size={size}>
      {/* Bulan sabit */}
      <path d='M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z' />
      {/* Matahari kecil di kanan atas */}
      <circle cx='17' cy='6' r='2' />
      <path d='M17 1.5v1M17 9.5v1M12.5 6h1M20.5 6h1' />
    </IconBase>
  );
}

// Ikon terjemah (aksara + huruf A) seperti logo translate umum.
function TranslateIcon({ size }) {
  return (
    <IconBase size={size}>
      <path d='m5 8 6 6' />
      <path d='m4 14 6-6 2-3' />
      <path d='M2 5h12' />
      <path d='M7 2h1' />
      <path d='m22 22-5-10-5 10' />
      <path d='M14 18h6' />
    </IconBase>
  );
}

// Ikon pintu keluar untuk tombol logout.
function LogoutIcon({ size }) {
  return (
    <IconBase size={size}>
      <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
      <polyline points='16 17 21 12 16 7' />
      <line x1='21' y1='12' x2='9' y2='12' />
    </IconBase>
  );
}

export {
  BookIcon,
  PlusIcon,
  CheckIcon,
  EditIcon,
  TrashIcon,
  ArchiveInIcon,
  ArchiveOutIcon,
  SunMoonIcon,
  TranslateIcon,
  LogoutIcon
};
