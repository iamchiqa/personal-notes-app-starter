// Context tema. Nilainya ({ theme, toggleTheme }) diisi oleh App.jsx lewat Provider.
import { createContext } from 'react';

const ThemeContext = createContext({ theme: 'default', toggleTheme: () => {} });

export default ThemeContext;
