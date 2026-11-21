// Kolom pencarian catatan (controlled component).
import React, { useContext } from 'react';
import LocaleContext from '../contexts/LocaleContext';

function NoteSearch({ keyword, onKeywordChange }) {
  const { t } = useContext(LocaleContext);

  // Take teks dari event input lalu send ke parent.
  function handleChange(event) {
    onKeywordChange(event.target.value);
  }

  return (
    <section className='search-bar'>
      <input
        type='text'
        id='note-search'
        name='keyword' 
        placeholder={t('searchPlaceholder')} 
        aria-label={t('searchLabel')} 
        value={keyword} 
        onChange={handleChange} 
      />
    </section>
  );
}

export default NoteSearch;
