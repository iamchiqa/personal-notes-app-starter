// Toolbar format teks (tebal, miring, garis bawah) for editor contentEditable.
import React from 'react';

// Daftar tombol format.
const FORMAT_BUTTONS = [
  { command: 'bold', label: 'Tebal', text: 'B', className: 'note-toolbar__bold' },
  { command: 'italic', label: 'Miring', text: 'I', className: 'note-toolbar__italic' },
  { command: 'underline', label: 'Garis bawah', text: 'U', className: 'note-toolbar__underline' }
];

function NoteFormatToolbar() {
  // onMouseDown dicegah supaya editor tidak lost fokus.
  function handleMouseDown(event) {
    event.preventDefault();
  }

  // Format ke teks yang lagi diblok di editor.
  function handleFormat(command) {
    document.execCommand(command);
  }

  return (
    <div className='note-toolbar' role='toolbar' aria-label='Format teks'>
      {FORMAT_BUTTONS.map((button) => (
        <button
          key={button.command} 
          type='button'
          className={`note-toolbar__button ${button.className}`} 
          title={button.label}
          aria-label={button.label} 
          onMouseDown={handleMouseDown} 
          onClick={() => handleFormat(button.command)} 
        >
          {button.text}
        </button>
      ))}
    </div>
  );
}

export default NoteFormatToolbar;
