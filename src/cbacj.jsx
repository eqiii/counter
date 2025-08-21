import React, { useState, useCallback } from "react";

export default function DaftarItem() {
  const [items, setItems] = useState([]);


  // Fungsi tambahItem tidak akan dibuat ulang di setiap render
  const tambahItem = useCallback(() => {
    setItems((prev) => [...prev, `Item ${prev.length + 1}`]);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Daftar Item</h2>
      <button onClick={tambahItem}>Tambah Item</button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item, index) => (
          <li key={index} style={{ margin: "5px 0" }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
