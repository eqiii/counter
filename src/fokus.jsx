import React, { useRef, useEffect } from 'react';


export default function FocusInput() {
  const inputRef = useRef(null); // Membuat referensi

  const fokusKeInput = () => {
    inputRef.current.focus(); // Mengakses elemen DOM dan memberi fokus
  };

useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <input
        ref={inputRef} // Menghubungkan ref ke elemen input
        type="text"
        placeholder="Klik tombol untuk fokus"
      />
      <br /><br />
      <button onClick={fokusKeInput}>Fokus ke Input</button>
    </div>
  );
}