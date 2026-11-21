// Custom hook: keyword pencarian disimpan di URL (?keyword=...) agar bisa dishare.
// Sebelumnya logika ini ditulis dobel di HomePage dan ArsipPage.
import { useSearchParams } from 'react-router-dom';

function useKeyword() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Baca keyword dari URL, default string kosong.
  const keyword = searchParams.get('keyword') ?? '';

  // Simpan keyword baru ke URL; kalau kosong, hapus parameternya.
  function onKeywordChange(newKeyword) {
    setSearchParams(newKeyword ? { keyword: newKeyword } : {}, { replace: true });
  }

  return [keyword, onKeywordChange];
}

export default useKeyword;
