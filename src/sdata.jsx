import React, { useState, useEffect, useDebugValue } from "react";

// Custom hook
function useLocalStorage(key, initialValue) {
const [value, setValue] = useState(() => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  } catch {
    return initialValue;
  }
});


  // Update localStorage setiap kali value berubah
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Debug info di React DevTools
  useDebugValue(`localStorage key: ${key}`);

  return [value, setValue];
}

// Contoh penggunaan hook
export default function App() {
  const [name, setName] = useLocalStorage("username", "");

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>useLocalStorage dengan useDebugValue</h2>
      <input
        type="text"
        placeholder="Ketik nama..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Nama tersimpan: {name}</p>
    </div>
  );
}
