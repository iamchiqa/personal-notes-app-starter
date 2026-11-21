// Custom hook untuk logika controlled input (dipakai di login, register, tambah catatan).
import { useState } from 'react';

function useInput(defaultValue = '') {
  // State nilai input.
  const [value, setValue] = useState(defaultValue);

  // Update state tiap user mengetik.
  function onValueChangeHandler(event) {
    setValue(event.target.value);
  }

  return [value, onValueChangeHandler];
}

export default useInput;
