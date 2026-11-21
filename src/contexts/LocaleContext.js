// Context bahasa. Nilainya ({ locale, toggleLocale, t }) diisi oleh App.jsx lewat Provider.
// t(key) = fungsi untuk mengambil teks sesuai bahasa aktif.
import { createContext } from 'react';

const LocaleContext = createContext({ locale: 'id', toggleLocale: () => {}, t: (key) => key });

export default LocaleContext;
